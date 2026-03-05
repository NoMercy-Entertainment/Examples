import Plugin from '@nomercy-entertainment/nomercy-video-player/src/plugin';
import type { Icon, NMPlayer } from '@nomercy-entertainment/nomercy-video-player/src/types';

const icons: Icon = {
	play: {
		classes: [],
		title: 'Play',
		normal: 'M5.541 2.159C4.58 1.604 3.375 2.299 3.375 3.413v17.174c0 1.114 1.205 1.81 2.166 1.254l14.124-8.587a1.452 1.452 0 000-2.508L5.541 2.159zM4.875 3.413a.078.078 0 01.116-.068l14.124 8.587a.077.077 0 010 .136L4.99 20.655a.078.078 0 01-.116-.068V3.413z',
		hover: 'M5.541 2.159C4.58 1.604 3.375 2.299 3.375 3.413v17.174c0 1.114 1.205 1.81 2.166 1.254l14.124-8.587a1.452 1.452 0 000-2.508L5.541 2.159z',
	},
	pause: {
		classes: [],
		title: 'Pause',
		normal: 'M5.746 3a1.75 1.75 0 00-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h2.508a1.75 1.75 0 001.75-1.75V4.75a1.75 1.75 0 00-1.75-1.75H5.746zm0 1.5h2.508a.25.25 0 01.25.25v14.5a.25.25 0 01-.25.25H5.746a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25zm9.998-1.5a1.75 1.75 0 00-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h2.508a1.75 1.75 0 001.75-1.75V4.75a1.75 1.75 0 00-1.75-1.75h-2.508zm0 1.5h2.508a.25.25 0 01.25.25v14.5a.25.25 0 01-.25.25h-2.508a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25z',
		hover: 'M5.746 3a1.75 1.75 0 00-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h2.508a1.75 1.75 0 001.75-1.75V4.75a1.75 1.75 0 00-1.75-1.75H5.746zm10 0a1.75 1.75 0 00-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h2.508a1.75 1.75 0 001.75-1.75V4.75a1.75 1.75 0 00-1.75-1.75h-2.508z',
	},
	seekBack: {
		classes: [],
		title: 'Seek Back',
		normal: 'M9.026 2.202a.75.75 0 011.048.158l.663.893a9 9 0 11-6.812 2.26.75.75 0 01.99 1.128A7.5 7.5 0 1010.2 4.5l-.9-1.213a.75.75 0 01.159-1.049l-.433-.036zm-1.442 7.089a.75.75 0 111.37-.611l.025.057.543 1.339.044.127.028.104.011.066.003.041v.017l-.003.054-.003.029-.009.054-.006.026-.024.074-.024.055-.042.078-.04.056-.056.063-.072.063-1.497 1.122a.75.75 0 11-.9-1.2l.377-.283-.227-.56a3 3 0 10.394 2.613.75.75 0 011.454.37 4.5 4.5 0 11-.627-3.643l.206-.42z',
		hover: 'M9.026 2.202a.75.75 0 011.048.158l.663.893a9 9 0 11-6.812 2.26.75.75 0 01.99 1.128A7.5 7.5 0 1010.2 4.5l-.9-1.213a.75.75 0 01.159-1.049l-.433-.036zm-1.442 7.089a.75.75 0 111.37-.611l.025.057.543 1.339.044.127.028.104.011.066.003.041v.017l-.003.054-.003.029-.009.054-.006.026-.024.074-.024.055-.042.078-.04.056-.056.063-.072.063-1.497 1.122a.75.75 0 11-.9-1.2l.377-.283-.227-.56a3 3 0 10.394 2.613.75.75 0 011.454.37 4.5 4.5 0 11-.627-3.643l.206-.42z',
	},
	seekForward: {
		classes: [],
		title: 'Seek Forward',
		normal: 'M14.974 2.202a.75.75 0 00-1.048.158l-.663.893a9 9 0 116.812 2.26.75.75 0 00-.99 1.128A7.5 7.5 0 1113.8 4.5l.9-1.213a.75.75 0 00-.159-1.049l.433-.036zm1.442 7.089a.75.75 0 10-1.37-.611l-.025.057-.543 1.339-.044.127-.028.104-.011.066-.003.041v.017l.003.054.003.029.009.054.006.026.024.074.024.055.042.078.04.056.056.063.072.063 1.497 1.122a.75.75 0 10.9-1.2l-.377-.283.227-.56a3 3 0 11-.394 2.613.75.75 0 10-1.454.37 4.5 4.5 0 10.627-3.643l-.206-.42z',
		hover: 'M14.974 2.202a.75.75 0 00-1.048.158l-.663.893a9 9 0 116.812 2.26.75.75 0 00-.99 1.128A7.5 7.5 0 1113.8 4.5l.9-1.213a.75.75 0 00-.159-1.049l.433-.036zm1.442 7.089a.75.75 0 10-1.37-.611l-.025.057-.543 1.339-.044.127-.028.104-.011.066-.003.041v.017l.003.054.003.029.009.054.006.026.024.074.024.055.042.078.04.056.056.063.072.063 1.497 1.122a.75.75 0 10.9-1.2l-.377-.283.227-.56a3 3 0 11-.394 2.613.75.75 0 10-1.454.37 4.5 4.5 0 10.627-3.643l-.206-.42z',
	},
};

export class StepPlugin extends Plugin {
	declare player: NMPlayer<any>;

	private topBar!: HTMLDivElement;
	private bottomBar!: HTMLDivElement;
	private overlay!: HTMLDivElement;
	private centerButton!: HTMLButtonElement;
	private spinner!: HTMLDivElement;
	private bottomRow!: HTMLDivElement;
	private playbackButton!: HTMLButtonElement;
	private sliderBar!: HTMLDivElement;
	private isMouseDown = false;
	private currentTimeLabel!: HTMLSpanElement;
	private durationLabel!: HTMLSpanElement;

	initialize(player: NMPlayer<any>) {
		this.player = player;
	}

	use() {
		this.overlay = this.player.overlay;
		this.createTopBar();
		this.createCenterButton();
		this.createSpinner();
		this.createBottomBar();
		this.createProgressBar();
		this.createBottomRow();
		this.createPlaybackButton();
		this.createSkipButtons();
		this.createTimeDisplay();
	}

	dispose() {
		this.topBar?.remove();
		this.bottomBar?.remove();
		this.centerButton?.remove();
		this.spinner?.remove();
	}

	private createTopBar() {
		this.topBar = this.player
			.createElement('div', 'top-bar')
			.addClasses([
				'absolute', 'top-0', 'left-0', 'right-0',
				'flex', 'items-center', 'gap-2',
				'p-4', 'pb-12',
				'bg-gradient-to-b', 'from-black/80', 'to-transparent',
				'opacity-0', 'transition-opacity', 'duration-300', 'pointer-events-none',
				'group-[&.nomercyplayer.active]:opacity-100',
				'group-[&.nomercyplayer.active]:pointer-events-auto',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
	}

	private createBottomBar() {
		this.bottomBar = this.player
			.createElement('div', 'bottom-bar')
			.addClasses([
				'absolute', 'bottom-0', 'left-0', 'right-0',
				'flex', 'flex-col', 'gap-1',
				'px-4', 'pt-12', 'pb-2',
				'bg-gradient-to-t', 'from-black/80', 'to-transparent',
				'opacity-0', 'transition-opacity', 'duration-300', 'pointer-events-none',
				'group-[&.nomercyplayer.active]:opacity-100',
				'group-[&.nomercyplayer.active]:pointer-events-auto',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
	}

	private createCenterButton() {
		this.centerButton = this.player
			.createElement('button', 'center-play')
			.addClasses([
				'absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2',
				'w-16', 'h-16', 'rounded-full',
				'bg-black/50', 'text-white',
				'flex', 'items-center', 'justify-center',
				'opacity-0', 'transition-opacity', 'duration-300', 'pointer-events-none',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
				'hover:bg-black/70', 'hover:scale-110',
				'cursor-pointer', 'group/button',
			])
			.appendTo(this.overlay)
			.get();

		const pausedIcon = this.player.createSVGElement(this.centerButton, 'center-paused', icons.play, false, true);
		const playIcon = this.player.createSVGElement(this.centerButton, 'center-playing', icons.pause, true, true);

		this.centerButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.togglePlayback();
			this.player.emit('hide-tooltip');
		});

		this.player.on('pause', () => {
			playIcon.style.display = 'none';
			pausedIcon.style.display = 'flex';
		});
		this.player.on('play', () => {
			pausedIcon.style.display = 'none';
			playIcon.style.display = 'flex';
		});
	}

	private createSpinner() {
		this.spinner = this.player
			.createElement('div', 'spinner')
			.addClasses([
				'absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2',
				'w-12', 'h-12',
				'hidden',
				'group-[&.nomercyplayer.buffering]:block',
				'pointer-events-none',
			])
			.appendTo(this.overlay)
			.get();

		this.spinner.innerHTML = `
			<svg class="animate-spin text-white" viewBox="0 0 100 101" fill="none">
				<path d="M100 50.59C100 78.2 77.6 100.59 50 100.59S0 78.2 0 50.59 22.39.59 50 .59s50 22.39 50 50z" fill="currentColor" opacity="0.25"/>
				<path d="M93.97 39.04c2.42-.64 3.89-3.13 3.04-5.49A50 50 0 0041.73 1.28c-2.47.41-3.92 2.92-3.28 5.34.66 2.43 3.14 3.85 5.62 3.48a40 40 0 0146.62 22.32c.9 2.24 3.36 3.7 5.79 3.06z" fill="currentColor"/>
			</svg>
		`;
	}

	private createBottomRow() {
		this.bottomRow = this.player
			.createElement('div', 'bottom-row')
			.addClasses(['flex', 'items-center', 'gap-1', 'h-10'])
			.appendTo(this.bottomBar)
			.get();
	}

	private createPlaybackButton() {
		this.playbackButton = this.player
			.createUiButton(this.bottomRow, 'playback')
			.get();
		this.playbackButton.ariaLabel = icons.play.title;

		const pausedIcon = this.player.createSVGElement(this.playbackButton, 'paused', icons.play, false, true);
		const playIcon = this.player.createSVGElement(this.playbackButton, 'playing', icons.pause, true, true);

		this.playbackButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.player.togglePlayback();
			this.player.emit('hide-tooltip');
		});

		this.player.on('pause', () => {
			playIcon.style.display = 'none';
			pausedIcon.style.display = 'flex';
		});
		this.player.on('play', () => {
			pausedIcon.style.display = 'none';
			playIcon.style.display = 'flex';
		});
	}

	private createProgressBar() {
		this.sliderBar = this.player
			.createElement('div', 'slider-bar')
			.addClasses([
				'relative', 'w-full', 'h-1', 'mx-2',
				'bg-white/20', 'rounded-full',
				'cursor-pointer', 'group/slider',
				'hover:h-2', 'transition-all', 'duration-150',
			])
			.appendTo(this.bottomBar)
			.get();

		const sliderBuffer = this.player
			.createElement('div', 'slider-buffer')
			.addClasses([
				'absolute', 'top-0', 'left-0', 'h-full',
				'bg-white/30', 'rounded-full', 'pointer-events-none',
			])
			.appendTo(this.sliderBar)
			.get();

		const sliderProgress = this.player
			.createElement('div', 'slider-progress')
			.addClasses([
				'absolute', 'top-0', 'left-0', 'h-full',
				'bg-white', 'rounded-full', 'pointer-events-none',
			])
			.appendTo(this.sliderBar)
			.get();

		const sliderNipple = this.player
			.createElement('div', 'slider-nipple')
			.addClasses([
				'absolute', 'top-1/2', '-translate-y-1/2', '-translate-x-1/2',
				'w-3', 'h-3', 'rounded-full', 'bg-white',
				'hidden', 'group-hover/slider:flex',
				'pointer-events-none', 'left-0', 'z-20',
			])
			.appendTo(this.sliderBar)
			.get();

		const getPercentFromEvent = (e: MouseEvent | TouchEvent): number => {
			const rect = this.sliderBar.getBoundingClientRect();
			const clientX = ('clientX' in e ? e.clientX : undefined)
				?? ('touches' in e ? e.touches?.[0]?.clientX : undefined)
				?? ('changedTouches' in e ? e.changedTouches?.[0]?.clientX : undefined)
				?? 0;
			const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
			return (x / rect.width) * 100;
		};

		['mousedown', 'touchstart'].forEach((event) => {
			this.sliderBar.addEventListener(event, () => {
				this.isMouseDown = true;
			}, { passive: true });
		});

		this.sliderBar.addEventListener('click', (e: MouseEvent) => {
			this.isMouseDown = false;
			const percent = getPercentFromEvent(e);
			const duration = this.player.getDuration();
			this.player.seek(duration * (percent / 100));
			sliderNipple.style.left = `${percent}%`;
		});

		['mousemove', 'touchmove'].forEach((event) => {
			this.sliderBar.addEventListener(event, (e: any) => {
				const percent = getPercentFromEvent(e);
				if (!this.isMouseDown) return;
				sliderNipple.style.left = `${percent}%`;
				sliderProgress.style.width = `${percent}%`;
			}, { passive: true });
		});

		this.sliderBar.addEventListener('mouseleave', () => {
			this.isMouseDown = false;
		}, { passive: true });

		this.player.on('time', (data) => {
			if (this.isMouseDown) return;
			sliderProgress.style.width = `${data.percentage}%`;
			sliderNipple.style.left = `${data.percentage}%`;
			this.currentTimeLabel.textContent = data.currentTimeHuman;
			this.durationLabel.textContent = data.durationHuman;
		});

		this.player.on('item', () => {
			sliderBuffer.style.width = '0';
			sliderProgress.style.width = '0';
		});
	}

	private createSkipButtons() {
		const skipBack = this.player.createUiButton(this.bottomRow, 'skip-back').get();
		skipBack.ariaLabel = 'Skip back 10 seconds';
		this.player.createSVGElement(skipBack, 'skip-back-icon', icons.seekBack, false, true);
		skipBack.addEventListener('click', (e) => { e.stopPropagation(); this.player.rewindVideo(10); });

		const skipForward = this.player.createUiButton(this.bottomRow, 'skip-forward').get();
		skipForward.ariaLabel = 'Skip forward 10 seconds';
		this.player.createSVGElement(skipForward, 'skip-forward-icon', icons.seekForward, false, true);
		skipForward.addEventListener('click', (e) => { e.stopPropagation(); this.player.forwardVideo(10); });
	}

	private createTimeDisplay() {
		this.currentTimeLabel = this.player.createElement('span', 'current-time')
			.addClasses(['text-white', 'text-xs', 'tabular-nums', 'ml-2']).appendTo(this.bottomRow).get();
		this.currentTimeLabel.textContent = '0:00';

		const separator = this.player.createElement('span', 'time-separator')
			.addClasses(['text-white/50', 'text-xs', 'mx-1']).appendTo(this.bottomRow).get();
		separator.textContent = '/';

		this.durationLabel = this.player.createElement('span', 'duration')
			.addClasses(['text-white', 'text-xs', 'tabular-nums']).appendTo(this.bottomRow).get();
		this.durationLabel.textContent = '0:00';
	}
}

export default StepPlugin;
