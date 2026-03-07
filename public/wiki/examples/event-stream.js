/* NoMercy Video Player — Reusable Event Stream Panel */

/**
 * Creates an event stream panel that attaches to a player instance.
 *
 * Required HTML structure (IDs are configurable via opts):
 *   <div class="event-stream-filters" id="filters"></div>
 *   <div class="event-stream" id="stream"></div>
 *   <span class="event-stream-counter" id="total">0 events</span>
 *   <button id="btnPause">Pause Log</button>  (optional)
 *
 * @param {object} player - NMPlayer instance
 * @param {object} opts
 * @param {object} opts.categories - { name: { color: string, events: string[] } }
 * @param {string} [opts.streamEl='stream'] - ID of the stream container
 * @param {string} [opts.filtersEl='filters'] - ID of the filters container
 * @param {string} [opts.totalEl='total'] - ID of the total counter
 * @param {string} [opts.pauseBtnEl='btnPause'] - ID of the pause button (optional)
 * @returns {{ togglePause: () => void, clearLog: () => void, destroy: () => void }}
 */
function createEventStream(player, opts) {
	var categories = opts.categories;
	var streamEl = document.getElementById(opts.streamEl || 'stream');
	var filtersEl = document.getElementById(opts.filtersEl || 'filters');
	var totalEl = document.getElementById(opts.totalEl || 'total');
	var pauseBtnId = opts.pauseBtnEl || 'btnPause';

	// Build reverse lookup: event name → category
	var eventCategory = {};
	Object.keys(categories).forEach(function (cat) {
		categories[cat].events.forEach(function (evt) { eventCategory[evt] = cat; });
		categories[cat].count = 0;
		categories[cat].visible = true;
	});

	// Build filter chips
	if (filtersEl) {
		Object.keys(categories).forEach(function (cat) {
			var chip = document.createElement('span');
			chip.className = 'event-stream-chip';
			chip.dataset.cat = cat;
			chip.style.background = categories[cat].color + '18';
			chip.style.borderColor = categories[cat].color + '40';
			chip.innerHTML = '<span class="dot" style="background:' + categories[cat].color + '"></span>' +
				cat + '<span class="badge" id="badge-' + cat + '">0</span>';
			chip.onclick = function () {
				categories[cat].visible = !categories[cat].visible;
				chip.classList.toggle('off', !categories[cat].visible);
				refreshVisibility();
			};
			filtersEl.appendChild(chip);
		});
	}

	var paused = false;
	var totalCount = 0;
	var pendingEvents = [];
	var lastEvent = { name: '', dataJSON: '', row: null, dataRow: null, count: 0 };

	function refreshVisibility() {
		var rows = streamEl.querySelectorAll('[data-cat]');
		rows.forEach(function (row) {
			var cat = row.dataset.cat;
			var show = categories[cat] && categories[cat].visible;
			row.style.display = show ? '' : 'none';
			var next = row.nextElementSibling;
			if (next && next.classList.contains('evt-data')) {
				next.style.display = show && next.classList.contains('open') ? 'block' : 'none';
			}
		});
	}

	function formatTime(d) {
		return d.getHours().toString().padStart(2, '0') + ':' +
			d.getMinutes().toString().padStart(2, '0') + ':' +
			d.getSeconds().toString().padStart(2, '0') + '.' +
			d.getMilliseconds().toString().padStart(3, '0');
	}

	function appendEvent(name, data, cat, ts) {
		var color = categories[cat] ? categories[cat].color : '#a1a1aa';
		var dataJSON = '';
		try { dataJSON = data != null ? JSON.stringify(data) : ''; } catch (e) { dataJSON = String(data); }

		// Chrome-style dedup: if same event name + same data, increment counter
		if (name === lastEvent.name && dataJSON === lastEvent.dataJSON && lastEvent.row) {
			lastEvent.count++;
			var badge = lastEvent.row.querySelector('.repeat-badge');
			if (!badge) {
				badge = document.createElement('span');
				badge.className = 'repeat-badge';
				badge.style.cssText = 'background:#a78bfa33;color:#a78bfa;padding:1px 6px;border-radius:8px;font-size:10px;margin-left:auto;flex-shrink:0';
				lastEvent.row.appendChild(badge);
			}
			badge.textContent = lastEvent.count;
			lastEvent.row.querySelector('.time').textContent = formatTime(ts);
			streamEl.scrollTop = streamEl.scrollHeight;
			totalCount++;
			totalEl.textContent = totalCount + ' events';
			if (categories[cat]) {
				categories[cat].count++;
				document.getElementById('badge-' + cat).textContent = categories[cat].count;
			}
			return;
		}

		var preview = dataJSON;
		if (preview.length > 120) preview = preview.slice(0, 120) + '\u2026';

		var row = document.createElement('div');
		row.className = 'evt';
		row.dataset.cat = cat;
		row.innerHTML = '<span class="time">' + formatTime(ts) + '</span>' +
			'<span class="name" style="color:' + color + '">' + name + '</span>' +
			'<span class="preview">' + preview + '</span>';

		var dataRow = document.createElement('div');
		dataRow.className = 'evt-data';
		try {
			dataRow.textContent = data != null ? JSON.stringify(data, null, 2) : '(no data)';
		} catch (e) {
			dataRow.textContent = String(data);
		}

		row.onclick = function () {
			dataRow.classList.toggle('open');
			dataRow.style.display = dataRow.classList.contains('open') ? 'block' : 'none';
		};

		if (categories[cat] && !categories[cat].visible) {
			row.style.display = 'none';
		}

		streamEl.appendChild(row);
		streamEl.appendChild(dataRow);
		streamEl.scrollTop = streamEl.scrollHeight;

		lastEvent = { name: name, dataJSON: dataJSON, row: row, dataRow: dataRow, count: 1 };

		totalCount++;
		totalEl.textContent = totalCount + ' events';
		if (categories[cat]) {
			categories[cat].count++;
			document.getElementById('badge-' + cat).textContent = categories[cat].count;
		}
	}

	function logEvent(name, data) {
		var cat = eventCategory[name] || 'lifecycle';
		var ts = new Date();
		console.log('%c[' + cat + ']%c ' + name, 'color:' + (categories[cat] ? categories[cat].color : '#a1a1aa') + ';font-weight:bold', 'color:inherit', data);
		if (paused) {
			pendingEvents.push({ name: name, data: data, cat: cat, ts: ts });
		} else {
			appendEvent(name, data, cat, ts);
		}
	}

	// Subscribe to all events
	var allEvents = [];
	Object.keys(categories).forEach(function (cat) {
		allEvents = allEvents.concat(categories[cat].events);
	});

	var handlers = {};
	allEvents.forEach(function (evt) {
		handlers[evt] = function (data) { logEvent(evt, data); };
		player.on(evt, handlers[evt]);
	});

	// Public API
	function togglePause() {
		paused = !paused;
		var btn = document.getElementById(pauseBtnId);
		if (btn) btn.textContent = paused ? 'Resume Log' : 'Pause Log';
		if (!paused) {
			pendingEvents.forEach(function (e) { appendEvent(e.name, e.data, e.cat, e.ts); });
			pendingEvents = [];
		}
	}

	function clearLog() {
		streamEl.innerHTML = '';
		totalCount = 0;
		totalEl.textContent = '0 events';
		lastEvent = { name: '', dataJSON: '', row: null, dataRow: null, count: 0 };
		Object.keys(categories).forEach(function (cat) {
			categories[cat].count = 0;
			var badge = document.getElementById('badge-' + cat);
			if (badge) badge.textContent = '0';
		});
	}

	function destroy() {
		Object.keys(handlers).forEach(function (evt) {
			player.off(evt, handlers[evt]);
		});
		handlers = {};
	}

	return { togglePause: togglePause, clearLog: clearLog, destroy: destroy };
}
