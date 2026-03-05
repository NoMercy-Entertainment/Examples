import Plugin from '@nomercy-entertainment/nomercy-video-player/src/plugin';
import type { Icon, NMPlayer, VolumeState } from '@nomercy-entertainment/nomercy-video-player/src/types';

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
		title: 'Seek back',
		normal: 'M9.026 2.202a.75.75 0 011.048.158l.663.893a9 9 0 11-6.812 2.26.75.75 0 01.99 1.128A7.5 7.5 0 1010.2 4.5l-.9-1.213a.75.75 0 01.159-1.049l-.433-.036zm-1.442 7.089a.75.75 0 111.37-.611l.025.057.543 1.339.044.127.028.104.011.066.003.041v.017l-.003.054-.003.029-.009.054-.006.026-.024.074-.024.055-.042.078-.04.056-.056.063-.072.063-1.497 1.122a.75.75 0 11-.9-1.2l.377-.283-.227-.56a3 3 0 10.394 2.613.75.75 0 011.454.37 4.5 4.5 0 11-.627-3.643l.206-.42z',
		hover: 'M9.026 2.202a.75.75 0 011.048.158l.663.893a9 9 0 11-6.812 2.26.75.75 0 01.99 1.128A7.5 7.5 0 1010.2 4.5l-.9-1.213a.75.75 0 01.159-1.049l-.433-.036zm-1.442 7.089a.75.75 0 111.37-.611l.025.057.543 1.339.044.127.028.104.011.066.003.041v.017l-.003.054-.003.029-.009.054-.006.026-.024.074-.024.055-.042.078-.04.056-.056.063-.072.063-1.497 1.122a.75.75 0 11-.9-1.2l.377-.283-.227-.56a3 3 0 10.394 2.613.75.75 0 011.454.37 4.5 4.5 0 11-.627-3.643l.206-.42z',
	},
	seekForward: {
		classes: [],
		title: 'Seek forward',
		normal: 'M14.974 2.202a.75.75 0 00-1.048.158l-.663.893a9 9 0 116.812 2.26.75.75 0 00-.99 1.128A7.5 7.5 0 1113.8 4.5l.9-1.213a.75.75 0 00-.159-1.049l.433-.036zm1.442 7.089a.75.75 0 10-1.37-.611l-.025.057-.543 1.339-.044.127-.028.104-.011.066-.003.041v.017l.003.054.003.029.009.054.006.026.024.074.024.055.042.078.04.056.056.063.072.063 1.497 1.122a.75.75 0 10.9-1.2l-.377-.283.227-.56a3 3 0 11-.394 2.613.75.75 0 10-1.454.37 4.5 4.5 0 10.627-3.643l-.206-.42z',
		hover: 'M14.974 2.202a.75.75 0 00-1.048.158l-.663.893a9 9 0 116.812 2.26.75.75 0 00-.99 1.128A7.5 7.5 0 1113.8 4.5l.9-1.213a.75.75 0 00-.159-1.049l.433-.036zm1.442 7.089a.75.75 0 10-1.37-.611l-.025.057-.543 1.339-.044.127-.028.104-.011.066-.003.041v.017l.003.054.003.029.009.054.006.026.024.074.024.055.042.078.04.056.056.063.072.063 1.497 1.122a.75.75 0 10.9-1.2l-.377-.283.227-.56a3 3 0 11-.394 2.613.75.75 0 10-1.454.37 4.5 4.5 0 10.627-3.643l-.206-.42z',
	},
	volumeHigh: {
		classes: [],
		title: 'Volume',
		normal: 'M15 4.25049C15 3.17187 13.7255 2.59964 12.9195 3.31631L8.42794 7.30958C8.29065 7.43165 8.11333 7.49907 7.92961 7.49907H4.25C3.00736 7.49907 2 8.50643 2 9.74907V14.247C2 15.4896 3.00736 16.497 4.25 16.497H7.92956C8.11329 16.497 8.29063 16.5644 8.42793 16.6865L12.9194 20.6802C13.7255 21.397 15 20.8247 15 19.7461V4.25049ZM9.4246 8.43059L13.5 4.80728V19.1893L9.42465 15.5655C9.01275 15.1993 8.48074 14.997 7.92956 14.997H4.25C3.83579 14.997 3.5 14.6612 3.5 14.247V9.74907C3.5 9.33486 3.83579 8.99907 4.25 8.99907H7.92961C8.48075 8.99907 9.01272 8.79679 9.4246 8.43059ZM18.9916 5.89782C19.3244 5.65128 19.7941 5.72126 20.0407 6.05411C21.2717 7.71619 22 9.77439 22 12.0005C22 14.2266 21.2717 16.2848 20.0407 17.9469C19.7941 18.2798 19.3244 18.3497 18.9916 18.1032C18.6587 17.8567 18.5888 17.387 18.8353 17.0541C19.8815 15.6416 20.5 13.8943 20.5 12.0005C20.5 10.1067 19.8815 8.35945 18.8353 6.9469C18.5888 6.61404 18.6587 6.14435 18.9916 5.89782ZM17.143 8.36982C17.5072 8.17262 17.9624 8.30806 18.1596 8.67233C18.6958 9.66294 19 10.7973 19 12.0005C19 13.2037 18.6958 14.338 18.1596 15.3287C17.9624 15.6929 17.5072 15.8284 17.143 15.6312C16.7787 15.434 16.6432 14.9788 16.8404 14.6146C17.2609 13.8378 17.5 12.9482 17.5 12.0005C17.5 11.0528 17.2609 10.1632 16.8404 9.38642C16.6432 9.02216 16.7787 8.56701 17.143 8.36982Z',
		hover: 'M15 4.25049V19.7461C15 20.8247 13.7255 21.397 12.9194 20.6802L8.42793 16.6865C8.29063 16.5644 8.11329 16.497 7.92956 16.497H4.25C3.00736 16.497 2 15.4896 2 14.247V9.74907C2 8.50643 3.00736 7.49907 4.25 7.49907H7.92961C8.11333 7.49907 8.29065 7.43165 8.42794 7.30958L12.9195 3.31631C13.7255 2.59964 15 3.17187 15 4.25049ZM18.9916 5.89782C19.3244 5.65128 19.7941 5.72126 20.0407 6.05411C21.2717 7.71619 22 9.77439 22 12.0005C22 14.2266 21.2717 16.2848 20.0407 17.9469C19.7941 18.2798 19.3244 18.3497 18.9916 18.1032C18.6587 17.8567 18.5888 17.387 18.8353 17.0541C19.8815 15.6416 20.5 13.8943 20.5 12.0005C20.5 10.1067 19.8815 8.35945 18.8353 6.9469C18.5888 6.61404 18.6587 6.14435 18.9916 5.89782ZM17.143 8.36982C17.5072 8.17262 17.9624 8.30806 18.1596 8.67233C18.6958 9.66294 19 10.7973 19 12.0005C19 13.2037 18.6958 14.338 18.1596 15.3287C17.9624 15.6929 17.5072 15.8284 17.143 15.6312C16.7787 15.434 16.6432 14.9788 16.8404 14.6146C17.2609 13.8378 17.5 12.9482 17.5 12.0005C17.5 11.0528 17.2609 10.1632 16.8404 9.38642C16.6432 9.02216 16.7787 8.56701 17.143 8.36982Z',
	},
	volumeLow: {
		classes: [],
		title: 'Volume',
		normal: 'M14.7041 3.44054C14.8952 3.66625 15 3.95238 15 4.24807V19.7497C15 20.4401 14.4404 20.9997 13.75 20.9997C13.4542 20.9997 13.168 20.8948 12.9423 20.7037L7.97513 16.4979H4.25C3.00736 16.4979 2 15.4905 2 14.2479V9.7479C2 8.50526 3.00736 7.4979 4.25 7.4979H7.97522L12.9425 3.29393C13.4694 2.84794 14.2582 2.91358 14.7041 3.44054ZM13.5 4.78718L8.52478 8.9979H4.25C3.83579 8.9979 3.5 9.33369 3.5 9.7479V14.2479C3.5 14.6621 3.83579 14.9979 4.25 14.9979H8.52487L13.5 19.2104V4.78718Z',
		hover: 'M14.7041 3.44054C14.8952 3.66625 15 3.95238 15 4.24807V19.7497C15 20.4401 14.4404 20.9997 13.75 20.9997C13.4542 20.9997 13.168 20.8948 12.9423 20.7037L7.97513 16.4979H4.25C3.00736 16.4979 2 15.4905 2 14.2479V9.7479C2 8.50526 3.00736 7.4979 4.25 7.4979H7.97522L12.9425 3.29393C13.4694 2.84794 14.2582 2.91358 14.7041 3.44054Z',
	},
	volumeMuted: {
		classes: [],
		title: 'Muted',
		normal: 'M12.9195 3.31631C13.7255 2.59964 15 3.17187 15 4.25049V19.7461C15 20.8247 13.7255 21.397 12.9194 20.6802L8.42793 16.6865C8.29063 16.5644 8.11329 16.497 7.92956 16.497H4.25C3.00736 16.497 2 15.4896 2 14.247V9.74907C2 8.50643 3.00736 7.49907 4.25 7.49907H7.92961C8.11333 7.49907 8.29065 7.43165 8.42794 7.30958L12.9195 3.31631ZM13.5 4.80728L9.4246 8.43059C9.01272 8.79679 8.48075 8.99907 7.92961 8.99907H4.25C3.83579 8.99907 3.5 9.33486 3.5 9.74907V14.247C3.5 14.6612 3.83579 14.997 4.25 14.997H7.92956C8.48074 14.997 9.01275 15.1993 9.42465 15.5655L13.5 19.1893V4.80728ZM16.2197 9.22017C16.5126 8.92728 16.9874 8.92728 17.2803 9.22017L19 10.9398L20.7197 9.22017C21.0126 8.92728 21.4874 8.92728 21.7803 9.22017C22.0732 9.51307 22.0732 9.98794 21.7803 10.2808L20.0607 12.0005L21.7803 13.7202C22.0732 14.0131 22.0732 14.4879 21.7803 14.7808C21.4874 15.0737 21.0126 15.0737 20.7197 14.7808L19 13.0612L17.2803 14.7808C16.9874 15.0737 16.5126 15.0737 16.2197 14.7808C15.9268 14.4879 15.9268 14.0131 16.2197 13.7202L17.9393 12.0005L16.2197 10.2808C15.9268 9.98794 15.9268 9.51307 16.2197 9.22017Z',
		hover: 'M15 4.25049C15 3.17187 13.7255 2.59964 12.9195 3.31631L8.42794 7.30958C8.29065 7.43165 8.11333 7.49907 7.92961 7.49907H4.25C3.00736 7.49907 2 8.50643 2 9.74907V14.247C2 15.4896 3.00736 16.497 4.25 16.497H7.92956C8.11329 16.497 8.29063 16.5644 8.42793 16.6865L12.9194 20.6802C13.7255 21.397 15 20.8247 15 19.7461V4.25049ZM16.2197 9.22016C16.5126 8.92727 16.9874 8.92727 17.2803 9.22016L19 10.9398L20.7197 9.22016C21.0126 8.92727 21.4874 8.92727 21.7803 9.22016C22.0732 9.51305 22.0732 9.98793 21.7803 10.2808L20.0607 12.0005L21.7803 13.7202C22.0732 14.0131 22.0732 14.4879 21.7803 14.7808C21.4874 15.0737 21.0126 15.0737 20.7197 14.7808L19 13.0611L17.2803 14.7808C16.9874 15.0737 16.5126 15.0737 16.2197 14.7808C15.9268 14.4879 15.9268 14.0131 16.2197 13.7202L17.9393 12.0005L16.2197 10.2808C15.9268 9.98793 15.9268 9.51305 16.2197 9.22016Z',
	},
};

export class StepPlugin extends Plugin {
	declare player: NMPlayer<any>;

	private topBar!: HTMLDivElement;
	private bottomBar!: HTMLDivElement;
	private bottomRow!: HTMLDivElement;
	private overlay!: HTMLDivElement;
	private centerButton!: HTMLButtonElement;
	private spinner!: HTMLDivElement;
	private playbackButton!: HTMLButtonElement;
	private sliderBar!: HTMLDivElement;
	private isMouseDown = false;
	private currentTimeLabel!: HTMLSpanElement;
	private durationLabel!: HTMLSpanElement;
	private volumeSlider!: HTMLInputElement;
	private titleLabel!: HTMLDivElement;

	initialize(player: NMPlayer<any>) {
		this.player = player;
	}

	use() {
		this.overlay = this.player.overlay;

		this.createTopBar();
		this.createTitle();
		this.createCenterButton();
		this.createSpinner();
		this.createBottomBar();
		this.createProgressBar();
		this.createBottomRow();
		this.createPlaybackButton();
		this.createSkipButtons();
		this.createTimeDisplay();
		this.createVolumeControl();
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

	private createTitle() {
		this.titleLabel = this.player
			.createElement('div', 'title-display')
			.addClasses([
				'text-white', 'text-sm', 'font-medium', 'truncate',
			])
			.appendTo(this.topBar)
			.get();

		this.updateTitle();
		this.player.on('item', () => this.updateTitle());
	}

	private updateTitle() {
		const item = this.player.playlistItem();
		if (!item) return;

		let text = item.title;
		if (item.show) {
			text = item.show;
			if (item.season !== undefined && item.episode !== undefined) {
				text += ` — S${item.season}E${item.episode}: ${item.title}`;
			}
		}
		this.titleLabel.textContent = text;
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

	private createSkipButtons() {
		const skipBack = this.player.createUiButton(this.bottomRow, 'skip-back').get();
		skipBack.ariaLabel = 'Skip back 10 seconds';
		this.player.createSVGElement(skipBack, 'skip-back-icon', icons.seekBack, false, true);
		skipBack.addEventListener('click', (e) => {
			e.stopPropagation();
			this.player.rewindVideo(10);
		});

		const skipForward = this.player.createUiButton(this.bottomRow, 'skip-forward').get();
		skipForward.ariaLabel = 'Skip forward 10 seconds';
		this.player.createSVGElement(skipForward, 'skip-forward-icon', icons.seekForward, false, true);
		skipForward.addEventListener('click', (e) => {
			e.stopPropagation();
			this.player.forwardVideo(10);
		});
	}

	private createTimeDisplay() {
		this.currentTimeLabel = this.player
			.createElement('span', 'current-time')
			.addClasses(['text-white', 'text-xs', 'tabular-nums', 'ml-2'])
			.appendTo(this.bottomRow)
			.get();
		this.currentTimeLabel.textContent = '0:00';

		const separator = this.player
			.createElement('span', 'time-separator')
			.addClasses(['text-white/50', 'text-xs', 'mx-1'])
			.appendTo(this.bottomRow)
			.get();
		separator.textContent = '/';

		this.durationLabel = this.player
			.createElement('span', 'duration')
			.addClasses(['text-white', 'text-xs', 'tabular-nums'])
			.appendTo(this.bottomRow)
			.get();
		this.durationLabel.textContent = '0:00';
	}

	private createVolumeControl() {
		const volumeContainer = this.player
			.createElement('div', 'volume-container')
			.addClasses([
				'flex', 'items-center', 'group/volume', 'ml-1',
			])
			.appendTo(this.bottomRow)
			.get();

		const volumeButton = this.player.createUiButton(volumeContainer, 'volume').get();
		volumeButton.ariaLabel = 'Mute';

		const volHigh = this.player.createSVGElement(volumeButton, 'vol-high', icons.volumeHigh, false, true);
		const volLow = this.player.createSVGElement(volumeButton, 'vol-low', icons.volumeLow, true, true);
		const volMuted = this.player.createSVGElement(volumeButton, 'vol-muted', icons.volumeMuted, true, true);

		volumeButton.addEventListener('click', (e) => {
			e.stopPropagation();
			this.player.toggleMute();
			this.player.emit('hide-tooltip');
		});

		this.volumeSlider = this.player
			.createElement('input', 'volume-slider')
			.addClasses([
				'w-0', 'opacity-0',
				'group-hover/volume:w-20', 'group-hover/volume:mx-2', 'group-hover/volume:opacity-100',
				'group-focus-within/volume:w-20', 'group-focus-within/volume:mx-2', 'group-focus-within/volume:opacity-100',
				'transition-all', 'duration-200',
				'appearance-none', 'bg-white/30', 'rounded-full', 'h-1',
				'cursor-pointer',
				'[&::-webkit-slider-thumb]:appearance-none',
				'[&::-webkit-slider-thumb]:w-3',
				'[&::-webkit-slider-thumb]:h-3',
				'[&::-webkit-slider-thumb]:bg-white',
				'[&::-webkit-slider-thumb]:rounded-full',
			])
			.appendTo(volumeContainer)
			.get();

		this.volumeSlider.type = 'range';
		this.volumeSlider.min = '0';
		this.volumeSlider.max = '100';
		this.volumeSlider.step = '1';
		this.volumeSlider.value = String(this.player.getVolume());

		this.volumeSlider.addEventListener('input', (e) => {
			e.stopPropagation();
			const vol = parseInt(this.volumeSlider.value, 10);
			this.player.setVolume(vol);
		});

		const updateVolumeIcon = (volume: number, muted: boolean) => {
			volHigh.style.display = 'none';
			volLow.style.display = 'none';
			volMuted.style.display = 'none';

			if (muted || volume === 0) {
				volMuted.style.display = 'flex';
			} else if (volume < 50) {
				volLow.style.display = 'flex';
			} else {
				volHigh.style.display = 'flex';
			}
		};

		this.player.on('volume', (data: VolumeState) => {
			this.volumeSlider.value = String(data.volume);
			updateVolumeIcon(data.volume, data.muted);
		});

		updateVolumeIcon(this.player.getVolume(), this.player.isMuted());
	}
}

export default StepPlugin;
