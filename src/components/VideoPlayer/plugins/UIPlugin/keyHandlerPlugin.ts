import { Plugin, type NMPlayer } from '@nomercy-entertainment/nomercy-video-player';
import { textSizes } from './buttons';

export interface KeyHandlerPluginArgs {
}

interface LegendEntry {
	keys: string[];
	label: string;
}

interface LegendGroup {
	title: string;
	entries: LegendEntry[];
}

interface LegendSection {
	groups: LegendGroup[];
}

const keybindLegend: LegendSection[] = [
	// Row 1: Core controls
	{ groups: [{ title: 'Playback', entries: [
		{ keys: ['Space'], label: 'Play / Pause' },
		{ keys: ['S'], label: 'Stop' },
		{ keys: ['E'], label: 'Next frame (paused)' },
	] }] },
	{ groups: [{ title: 'Speed', entries: [
		{ keys: [']'], label: 'Speed up' },
		{ keys: ['['], label: 'Speed down' },
		{ keys: ['='], label: 'Normal speed' },
	] }] },
	{ groups: [{ title: 'Volume', entries: [
		{ keys: ['\u2191'], label: 'Volume up' },
		{ keys: ['\u2193'], label: 'Volume down' },
		{ keys: ['M'], label: 'Mute / Unmute' },
	] }] },
	// Row 2: Seeking & navigation
	{ groups: [{ title: 'Seeking', entries: [
		{ keys: ['\u2190'], label: 'Seek back' },
		{ keys: ['\u2192'], label: 'Seek forward' },
		{ keys: ['Shift', '\u2190 / \u2192'], label: 'Seek 3 seconds' },
		{ keys: ['Alt', '\u2190 / \u2192'], label: 'Seek 10 seconds' },
		{ keys: ['Ctrl', '\u2190 / \u2192'], label: 'Seek 1 minute' },
	] }] },
	{ groups: [{ title: 'Quick Seek', entries: [
		{ keys: ['3'], label: 'Seek 30 seconds' },
		{ keys: ['6'], label: 'Seek 60 seconds' },
		{ keys: ['9'], label: 'Seek 90 seconds' },
		{ keys: ['1'], label: 'Seek 120 seconds' },
	] }] },
	{ groups: [{ title: 'Navigation', entries: [
		{ keys: ['N'], label: 'Next item' },
		{ keys: ['P'], label: 'Previous item' },
		{ keys: ['Shift', 'N'], label: 'Next chapter' },
		{ keys: ['Shift', 'P'], label: 'Previous chapter' },
	] }] },
	// Row 3: Tracks & display
	{ groups: [{ title: 'Tracks & Subtitles', entries: [
		{ keys: ['V'], label: 'Cycle subtitles' },
		{ keys: ['B'], label: 'Cycle audio' },
		{ keys: ['A'], label: 'Cycle aspect ratio' },
		{ keys: ['+'], label: 'Subtitle size up' },
		{ keys: ['\u2013'], label: 'Subtitle size down' },
	] }] },
	{ groups: [{ title: 'Display', entries: [
		{ keys: ['F'], label: 'Toggle fullscreen' },
		{ keys: ['F11'], label: 'Toggle fullscreen' },
		{ keys: ['Esc'], label: 'Exit fullscreen' },
		{ keys: ['T'], label: 'Show time' },
		{ keys: ['?'], label: 'Keyboard shortcuts' },
	] }] },
];

export class KeyHandlerPlugin extends Plugin {
	player: NMPlayer<KeyHandlerPluginArgs> = <NMPlayer<KeyHandlerPluginArgs>>{};
	private boundKeyHandler: (event: KeyboardEvent) => void = () => { };
	private keybindsDialog: HTMLDialogElement | null = null;

	initialize(player: NMPlayer<KeyHandlerPluginArgs>) {
		this.player = player;
		this.boundKeyHandler = this.keyHandler.bind(this);
	}

	use() {
		if (this.player.options.disableControls)
			return;
		document.addEventListener('keyup', this.boundKeyHandler, false);

		this.keybindsDialog = this.createKeybindsDialog();

		if (!sessionStorage.getItem('nmplayer-keybinds-hint-shown')) {
			this.player.once('play', () => {
				(this.player.displayMessage as (msg: string, time?: number) => void)(this.player.localize('Press ? for keyboard shortcuts'), 12000);
				sessionStorage.setItem('nmplayer-keybinds-hint-shown', '1');
			});
		}
	}

	dispose() {
		document.removeEventListener('keyup', this.boundKeyHandler);
		this.keybindsDialog?.remove();
		this.keybindsDialog = null;
	}

	/**
	 * Handles keyboard events and executes the corresponding function based on the key binding.
	 * @param {KeyboardEvent} event - The keyboard event to handle.
	 */
	keyHandler(event: KeyboardEvent) {
		if (document.activeElement?.nodeName == 'INPUT')
			return;

		const keys = this.keyBindings();
		let keyTimeout = false;

		if (this.player.videoElement.getBoundingClientRect().width == 0)
			return;

		if (!keyTimeout && this.player) {
			keyTimeout = true;

			const match = keys.find(k =>
				k.key === event.key
				&& k.control === event.ctrlKey
				&& k.shift === event.shiftKey
				&& k.alt === event.altKey,
			);

			if (match) {
				event.preventDefault();
				match.function();
			}
		}
		setTimeout(() => {
			keyTimeout = false;
		}, 300);
	}

	createKeybindsDialog(): HTMLDialogElement {
		const dialog = document.createElement('dialog');
		dialog.id = 'nmplayer-keybinds-dialog';

		const style = document.createElement('style');
		style.textContent = `
			#nmplayer-keybinds-dialog::backdrop {
				background: rgba(0, 0, 0, 0.85);
			}
		`;
		dialog.appendChild(style);

		Object.assign(dialog.style, {
			background: 'transparent',
			border: 'none',
			outline: 'none',
			padding: '0',
			maxWidth: '960px',
			maxHeight: '90vh',
			width: '85vw',
			color: 'white',
		});

		const card = document.createElement('div');
		Object.assign(card.style, {
			background: 'rgba(25, 25, 25, 0.95)',
			borderRadius: '14px',
			padding: '24px 28px',
		});

		const title = document.createElement('h2');
		title.textContent = this.player.localize('Keyboard Shortcuts');
		Object.assign(title.style, {
			margin: '0 0 14px 0',
			fontSize: '19px',
			fontWeight: '600',
			textAlign: 'center',
		});
		card.appendChild(title);

		const grid = document.createElement('div');
		Object.assign(grid.style, {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: '28px 60px',
		});

		for (const section of keybindLegend) {
			const cell = document.createElement('div');
			Object.assign(cell.style, {
				display: 'flex',
				flexDirection: 'column',
				gap: '14px',
			});

			for (const group of section.groups) {
				const groupEl = document.createElement('div');

				const heading = document.createElement('h3');
				heading.textContent = this.player.localize(group.title);
				Object.assign(heading.style, {
					margin: '0 0 3px 0',
					fontSize: '14px',
					fontWeight: '600',
					color: 'rgba(255, 255, 255, 0.5)',
					textTransform: 'uppercase',
					letterSpacing: '0.05em',
				});
				groupEl.appendChild(heading);

				for (const entry of group.entries) {
					const row = document.createElement('div');
					Object.assign(row.style, {
						display: 'flex',
						flexDirection: 'row-reverse',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '3px 0',
						gap: '14px',
					});

					const keysContainer = document.createElement('span');
					Object.assign(keysContainer.style, {
						display: 'flex',
						alignItems: 'center',
						gap: '4px',
						whiteSpace: 'nowrap',
					});

					for (let i = 0; i < entry.keys.length; i++) {
						if (i > 0) {
							const plus = document.createElement('span');
							plus.textContent = '+';
							Object.assign(plus.style, {
								fontSize: '12px',
								color: 'rgba(255, 255, 255, 0.4)',
							});
							keysContainer.appendChild(plus);
						}
						const kbd = document.createElement('kbd');
						kbd.textContent = entry.keys[i];
						Object.assign(kbd.style, {
							background: 'rgba(255, 255, 255, 0.12)',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							borderRadius: '5px',
							padding: '2px 7px',
							fontSize: '13px',
							fontFamily: 'monospace',
							whiteSpace: 'nowrap',
						});
						keysContainer.appendChild(kbd);
					}

					const label = document.createElement('span');
					label.textContent = this.player.localize(entry.label);
					Object.assign(label.style, {
						fontSize: '14px',
						color: 'rgba(255, 255, 255, 0.85)',
						textAlign: 'left',
					});

					row.appendChild(keysContainer);
					row.appendChild(label);
					groupEl.appendChild(row);
				}

				cell.appendChild(groupEl);
			}

			grid.appendChild(cell);
		}

		card.appendChild(grid);

		// Background keyboard decoration
		const bgKeyboard = document.createElement('div');
		Object.assign(bgKeyboard.style, {
			position: 'absolute',
			bottom: '48px',
			right: '-114px',
			pointerEvents: 'none',
			transform: 'rotate(-8deg)',
			opacity: '0.04',
		});
		const highlight = new Set('NOMERCY'.split(''));
		const rows = [
			// Row 1: number row
			'1234567890-='.split(''),
			// Row 2: QWERTY
			'QWERTYUIOP'.split(''),
			// Row 3: home row
			'ASDFGHJKL'.split(''),
			// Row 4: bottom row
			'ZXCVBNM'.split(''),
		];
		const offsets = [0, 10, 22, 38];
		let bgSvgKeys = '';
		for (let r = 0; r < rows.length; r++) {
			for (let k = 0; k < rows[r].length; k++) {
				const x = k * 28 + offsets[r];
				const y = r * 30;
				const letter = rows[r][k];
				const isHighlighted = highlight.has(letter);
				const fill = 'white';
				const opacity = isHighlighted ? '1' : '0.35';
				bgSvgKeys += `<rect x="${x}" y="${y}" width="24" height="24" rx="4" fill="${fill}" opacity="${opacity}"/>`;
				if (isHighlighted) {
					bgSvgKeys += `<text x="${x + 12}" y="${y + 16}" text-anchor="middle" fill="black" font-size="11" font-family="monospace" font-weight="700" opacity="0.7">${letter}</text>`;
				}
			}
		}
		// Spacebar
		bgSvgKeys += '<rect x="110" y="120" width="160" height="24" rx="4" fill="white" opacity="0.35"/>';
		bgKeyboard.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 412 164" width="450" height="180">${bgSvgKeys}</svg>`;

		Object.assign(card.style, { position: 'relative', overflow: 'hidden' });
		card.appendChild(bgKeyboard);

		const hint = document.createElement('p');
		hint.textContent = this.player.localize('Press ? or Esc to close');
		Object.assign(hint.style, {
			margin: '12px 0 0 0',
			fontSize: '13px',
			color: 'rgba(255, 255, 255, 0.35)',
			textAlign: 'center',
		});
		card.appendChild(hint);

		dialog.appendChild(card);

		dialog.addEventListener('click', (e) => {
			if (e.target === dialog) {
				dialog.close();
			}
		});

		this.player.element().appendChild(dialog);
		return dialog;
	}

	toggleKeybindsDialog() {
		if (!this.keybindsDialog) return;
		if (this.keybindsDialog.open) {
			this.keybindsDialog.close();
		}
		else {
			this.keybindsDialog.showModal();
		}
	}

	hasNoMercyConnect(): boolean {
		return this.player.plugins.has('videoNoMercyConnect');
	}

	getNoMercyConnectSocket() {
		if (this.hasNoMercyConnect()) {
			return this.player.plugins.get('videoNoMercyConnect')?.socket;
		}
		return null;
	}

	sendNoMercyConnectCommand(
		command: string,
		value?: string | number | boolean | null,
	) {
		if (this.hasNoMercyConnect()) {
			try {
				const socket = this.getNoMercyConnectSocket();
				if (socket) {
					socket.invoke('PlaybackCommand', command, value !== null ? value : null);
				}
				else {
					console.error('No NoMercyConnect socket available');
				}
			}
			catch (error) {
				console.error('Error invoking PlaybackCommand:', error);
			}
		}
		else {
			console.warn('No NoMercyConnect plugin available');
		}
	}

	handleForward() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand('forward');
		}
		else {
			this.player.forward();
		}
	}

	handleBackward() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand('backward');
		}
		else {
			this.player.rewind();
		}
	}

	handlePlayback() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand(this.player.isPlaying ? 'pause' : 'play');
		}
		else {
			this.player.togglePlayback();
		}
	}

	handlePrevious() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand('previous');
		}
		else {
			this.player.previous();
		}
	}

	handleNext() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand('next');
		}
		else {
			this.player.next();
		}
	}

	handlePreviousChapter() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand('previousChapter');
		}
		else {
			this.player.previousChapter();
		}
	}

	handleNextChapter() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand('nextChapter');
		}
		else {
			this.player.nextChapter();
		}
	}

	handleCycleCaption() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand('cycleCaption');
		}
		else {
			this.player.cycleSubtitles();
		}
	}

	handleCycleAudio() {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand('cycleAudio');
		}
		else {
			this.player.cycleAudioTracks();
		}
	}

	handleSeek(seconds: number) {
		if (this.hasNoMercyConnect()) {
			this.sendNoMercyConnectCommand(seconds > 0 ? 'forward' : 'backward', Math.abs(seconds));
		}
		else if (seconds > 0) {
			this.player.forward(seconds);
		}
		else {
			this.player.rewind(Math.abs(seconds));
		}
	}

	handleSpeedUp() {
		const speeds = this.player.speeds();
		const current = this.player.speed();
		const idx = speeds.indexOf(current);
		if (idx < speeds.length - 1) {
			const speed = speeds[idx + 1];
			this.player.speed(speed);
			this.player.displayMessage(`${speed}x`);
		}
	}

	handleSpeedDown() {
		const speeds = this.player.speeds();
		const current = this.player.speed();
		const idx = speeds.indexOf(current);
		if (idx > 0) {
			const speed = speeds[idx - 1];
			this.player.speed(speed);
			this.player.displayMessage(`${speed}x`);
		}
	}

	handleNormalSpeed() {
		this.player.speed(1);
		this.player.displayMessage('1x');
	}

	handleFrameAdvance() {
		if (!this.player.isPlaying) {
			const current = this.player.currentTime();
			this.player.seek(current + (1 / 30));
		}
	}

	handleShowTime() {
		const current = this.player.currentTime();
		const duration = this.player.duration();
		const remaining = duration - current;

		const fmt = (s: number) => {
			const h = Math.floor(s / 3600);
			const m = Math.floor((s % 3600) / 60);
			const sec = Math.floor(s % 60);
			return h > 0
				? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
				: `${m}:${String(sec).padStart(2, '0')}`;
		};

		this.player.displayMessage(`${fmt(current)} / -${fmt(remaining)}`);
	}

	handleFontSizeUp() {
		const style = this.player.subtitleStyle();
		const sizes = textSizes.map(s => s.value).sort((a, b) => a - b);
		const nextSize = sizes.find(s => s > style.fontSize);
		if (nextSize) {
			this.player.subtitleStyle({ fontSize: nextSize });
			const label = textSizes.find(s => s.value === nextSize)?.label ?? `${nextSize}%`;
			this.player.displayMessage(`${this.player.localize('Subtitle size')}: ${label}`);
		}
	}

	handleFontSizeDown() {
		const style = this.player.subtitleStyle();
		const sizes = textSizes.map(s => s.value).sort((a, b) => b - a);
		const nextSize = sizes.find(s => s < style.fontSize);
		if (nextSize) {
			this.player.subtitleStyle({ fontSize: nextSize });
			const label = textSizes.find(s => s.value === nextSize)?.label ?? `${nextSize}%`;
			this.player.displayMessage(`${this.player.localize('Subtitle size')}: ${label}`);
		}
	}

	keyBindings() {
		return [
			{
				name: 'Play',
				key: 'MediaPlay',
				control: false,
				function: () => {
					if (this.player.options.disableMediaControls)
						return;
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('play');
					}
					else {
						this.player.play().then();
					}
				},
			},
			{
				name: 'Pause',
				key: 'MediaPause',
				control: false,
				function: () => {
					if (this.player.options.disableMediaControls)
						return;
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('pause');
					}
					else {
						this.player.pause();
					}
				},
			},
			{
				name: 'Toggle playback',
				key: ' ',
				control: false,
				function: () => {
					this.handlePlayback();
				},
			},
			{
				name: 'Toggle playback',
				key: 'MediaPlayPause',
				control: false,
				function: () => {
					if (this.player.options.disableMediaControls)
						return;
					this.handlePlayback();
				},
			},
			{
				name: 'Stop',
				key: 'MediaStop',
				control: false,
				function: () => {
					if (this.player.options.disableMediaControls)
						return;
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('stop');
					}
					else {
						this.player.stop();
					}
				},
			},
			{
				name: 'Rewind',
				key: 'ArrowLeft',
				control: false,
				function: () => !this.player.isTv() && this.handleBackward(),
			},
			{
				name: 'Rewind',
				key: 'MediaRewind',
				control: false,
				function: () => {
					if (!this.player.isTv() && this.player.options.disableMediaControls)
						return;
					this.handleBackward();
				},
			},
			{
				name: 'Fast forward',
				key: 'ArrowRight',
				control: false,
				function: () => !this.player.isTv() && this.handleForward(),
			},
			{
				name: 'Fast forward',
				key: 'MediaFastForward',
				control: false,
				function: () => {
					if (this.player.options.disableMediaControls)
						return;
					this.handleForward();
				},
			},
			{
				name: 'Previous item',
				key: 'MediaTrackPrevious',
				control: false,
				function: () => {
					if (this.player.options.disableMediaControls)
						return;
					this.handlePrevious();
				},
			},
			{
				name: 'Previous item',
				key: 'p',
				control: false,
				function: () => this.handlePrevious(),
			},
			{
				name: 'Next item',
				key: 'MediaTrackNext',
				control: false,
				function: () => {
					if (this.player.options.disableMediaControls)
						return;
					this.handleNext();
				},
			},
			{
				name: 'Next item',
				key: 'n',
				control: false,
				function: () => this.handleNext(),
			},
			{
				name: 'Previous chapter',
				key: 'P',
				control: false,
				shift: true,
				alt: false,
				function: () => this.handlePreviousChapter(),
			},
			{
				name: 'Next chapter',
				key: 'N',
				control: false,
				shift: true,
				alt: false,
				function: () => this.handleNextChapter(),
			},
			{
				name: 'Cycle subtitle tracks',
				key: 'Subtitle',
				control: false,
				function: () => this.handleCycleCaption(),
			},
			{
				name: 'Cycle subtitle tracks',
				key: '5',
				control: false,
				function: () => this.handleCycleCaption(),
			},
			{
				name: 'Cycle subtitle tracks',
				key: 'v',
				control: false,
				function: () => this.handleCycleCaption(),
			},
			{
				name: 'Cycle audio tracks',
				key: 'Audio',
				control: false,
				function: () => this.handleCycleAudio(),
			},
			{
				name: 'Cycle audio tracks',
				key: '2',
				control: false,
				function: () => this.handleCycleAudio(),
			},
			{
				name: 'Cycle audio',
				key: 'b',
				control: false,
				function: () => this.handleCycleAudio(),
			},
			{
				name: 'Forward 30 seconds',
				key: 'ColorF0Red',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('forward', 30);
					}
					else {
						this.player.forward(30);
					}
				},
			},
			{
				name: 'Forward 60 seconds',
				key: 'ColorF1Green',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('forward', 60);
					}
					else {
						this.player.forward(60);
					}
				},
			},
			{
				name: 'Forward 90 seconds',
				key: 'ColorF2Yellow',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('forward', 90);
					}
					else {
						this.player.forward(90);
					}
				},
			},
			{
				name: 'Forward 120 seconds',
				key: 'ColorF3Blue',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('forward', 120);
					}
					else {
						this.player.forward(120);
					}
				},
			},
			{
				name: 'Forward 30 seconds',
				key: '3',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('forward', 30);
					}
					else {
						this.player.forward(30);
					}
				},
			},
			{
				name: 'Forward 60 seconds',
				key: '6',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('forward', 60);
					}
					else {
						this.player.forward(60);
					}
				},
			},
			{
				name: 'Forward 90 seconds',
				key: '9',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('forward', 90);
					}
					else {
						this.player.forward(90);
					}
				},
			},
			{
				name: 'Forward 120 seconds',
				key: '1',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('forward', 120);
					}
					else {
						this.player.forward(120);
					}
				},
			},
			{
				name: 'Fullscreen',
				key: 'f',
				control: false,
				function: () => {
					this.player.toggleFullscreen();
				},
			},
			{
				name: 'Volume up',
				key: 'ArrowUp',
				control: false,
				function: () => {
					!this.player.isTv() && !this.player.isMobile() && this.player.volumeUp();
				},
			},
			{
				name: 'Volume down',
				key: 'ArrowDown',
				control: false,
				function: () => {
					!this.player.isTv() && !this.player.isMobile() && this.player.volumeDown();
				},
			},
			{
				name: 'Mute',
				key: 'm',
				control: false,
				function: () => {
					this.player.toggleMute();
				},
			},
			{
				name: 'Cycle aspect ratio',
				key: 'BrowserFavorites',
				control: false,
				function: () => {
					this.player.cycleAspectRatio();
				},
			},
			{
				name: 'Cycle aspect ratio',
				key: 'a',
				control: false,
				function: () => {
					this.player.cycleAspectRatio();
				},
			},
			{
				name: 'Show info',
				key: 'Info',
				control: false,
				function: () => {
					// player.showInfo();
				},
			},

			// VLC-style speed controls
			{
				name: 'Speed up',
				key: ']',
				control: false,
				function: () => this.handleSpeedUp(),
			},
			{
				name: 'Speed down',
				key: '[',
				control: false,
				function: () => this.handleSpeedDown(),
			},
			{
				name: 'Normal speed',
				key: '=',
				control: false,
				function: () => this.handleNormalSpeed(),
			},

			// VLC-style modifier seeking
			{
				name: 'Seek back 3s',
				key: 'ArrowLeft',
				control: false,
				shift: true,
				alt: false,
				function: () => this.handleSeek(-3),
			},
			{
				name: 'Seek forward 3s',
				key: 'ArrowRight',
				control: false,
				shift: true,
				alt: false,
				function: () => this.handleSeek(3),
			},
			{
				name: 'Seek back 10s',
				key: 'ArrowLeft',
				control: false,
				shift: false,
				alt: true,
				function: () => this.handleSeek(-10),
			},
			{
				name: 'Seek forward 10s',
				key: 'ArrowRight',
				control: false,
				shift: false,
				alt: true,
				function: () => this.handleSeek(10),
			},
			{
				name: 'Seek back 1 min',
				key: 'ArrowLeft',
				control: true,
				shift: false,
				alt: false,
				function: () => this.handleSeek(-60),
			},
			{
				name: 'Seek forward 1 min',
				key: 'ArrowRight',
				control: true,
				shift: false,
				alt: false,
				function: () => this.handleSeek(60),
			},

			// Frame advance & time display
			{
				name: 'Next frame',
				key: 'e',
				control: false,
				function: () => this.handleFrameAdvance(),
			},
			{
				name: 'Show time',
				key: 't',
				control: false,
				function: () => this.handleShowTime(),
			},

			// Stop & fullscreen aliases
			{
				name: 'Stop',
				key: 's',
				control: false,
				function: () => {
					if (this.hasNoMercyConnect()) {
						this.sendNoMercyConnectCommand('stop');
					}
					else {
						this.player.stop();
					}
				},
			},
			{
				name: 'Toggle fullscreen',
				key: 'F11',
				control: false,
				function: () => this.player.toggleFullscreen(),
			},
			{
				name: 'Exit fullscreen',
				key: 'Escape',
				control: false,
				function: () => {
					if (this.keybindsDialog?.open) {
						this.keybindsDialog.close();
					}
					else if (this.player.fullscreen()) {
						this.player.fullscreen(false);
					}
				},
			},

			// Subtitle font size
			{
				name: 'Subtitle size up',
				key: '+',
				control: false,
				shift: true,
				alt: false,
				function: () => this.handleFontSizeUp(),
			},
			{
				name: 'Subtitle size up (numpad)',
				key: '+',
				control: false,
				function: () => this.handleFontSizeUp(),
			},
			{
				name: 'Subtitle size down',
				key: '-',
				control: false,
				function: () => this.handleFontSizeDown(),
			},

			// Keybinds legend
			{
				name: 'Keyboard shortcuts',
				key: '?',
				control: false,
				shift: true,
				alt: false,
				function: () => this.toggleKeybindsDialog(),
			},
		].map((control, i) => ({
			shift: false,
			alt: false,
			...control,
			id: i,
		}));
	}
}

export default KeyHandlerPlugin;
