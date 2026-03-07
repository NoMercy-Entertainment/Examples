/* NoMercy Video Player — Shared Example Utilities */

/**
 * Creates a log helper that writes to a <pre id="log"> element.
 * @param {number} [maxLines=20] - Maximum lines to keep in the log.
 * @returns {{ log: (msg: string) => void }}
 */
function createLogger(maxLines) {
	maxLines = maxLines || 20;
	var el = document.getElementById('log');
	var lines = [];

	return {
		log: function (msg) {
			lines.push(msg);
			if (lines.length > maxLines) lines.shift();
			el.textContent = lines.join('\n');
			el.scrollTop = el.scrollHeight;
		},
	};
}
