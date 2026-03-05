import { StepPlugin as Step9Plugin } from './step9Plugin';
import type { Icon } from '@nomercy-entertainment/nomercy-video-player/src/types';

interface Position {
	x: { start: number; end: number };
	y: { start: number; end: number };
}

const icons: Icon = {
	bigPlay: {
		classes: [],
		title: 'Play',
		normal: 'M5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z',
		hover: 'M5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z',
	},
};

export class StepPlugin extends Step9Plugin {
	private center!: HTMLDivElement;
	private controlsVisible = false;

	use() {
		super.use();
		this.createCenter();

		this.player.on('active', (value: boolean) => {
			setTimeout(() => {
				this.controlsVisible = value;
			}, (this.player.options.doubleClickDelay ?? 300) + 10);
		});
	}

	dispose() {
		this.center?.remove();
		super.dispose();
	}

	private doubleTap(doubleTapCb: (event: Event) => void, singleTapCb?: (event: Event) => void) {
		const delay = this.player.options.doubleClickDelay ?? 300;
		let lastTap = 0;
		let timeout: ReturnType<typeof setTimeout>;
		let timeout2: ReturnType<typeof setTimeout>;

		return (event: Event) => {
			const curTime = new Date().getTime();
			const tapLen = curTime - lastTap;

			if (tapLen > 0 && tapLen < delay) {
				event.preventDefault();
				doubleTapCb(event);
				clearTimeout(timeout2);
			} else {
				timeout = setTimeout(() => clearTimeout(timeout), delay);
				timeout2 = setTimeout(() => singleTapCb?.(event), delay);
			}
			lastTap = curTime;
		};
	}

	private createCenter() {
		const center = this.player.createElement('div', 'center')
			.addClasses([
				'center',
				'absolute',
				'grid',
				'grid-cols-3',
				'grid-rows-6',
				'h-full',
				'w-full',
				'z-0',
				'transition-all',
				'duration-300',
				'bg-transparent',
				'group-[&.nomercyplayer:not(.buffering).paused]:bg-gradient-circle-c',
				'from-15%',
				'from-black/50',
				'via-40%',
				'via-black/30',
				'to-100%',
				'to-black/0',
			])
			.appendTo(this.player.overlay);

		this.center = center.get();

		if (this.player.isMobile()) {
			this.createTouchSeekBack(this.center, { x: { start: 1, end: 1 }, y: { start: 2, end: 6 } });
			this.createTouchPlayback(this.center, { x: { start: 2, end: 2 }, y: { start: 3, end: 5 } });
			this.createTouchSeekForward(this.center, { x: { start: 3, end: 3 }, y: { start: 2, end: 6 } });
			this.createTouchVolUp(this.center, { x: { start: 2, end: 2 }, y: { start: 1, end: 3 } });
			this.createTouchVolDown(this.center, { x: { start: 2, end: 2 }, y: { start: 5, end: 7 } });
		} else {
			this.createTouchSeekBack(this.center, { x: { start: 1, end: 2 }, y: { start: 2, end: 6 } });
			this.createTouchPlayback(this.center, { x: { start: 2, end: 3 }, y: { start: 2, end: 6 } });
			this.createTouchSeekForward(this.center, { x: { start: 3, end: 4 }, y: { start: 2, end: 6 } });
		}
	}

	private createTouchBox(parent: HTMLElement, id: string, pos: Position): HTMLDivElement {
		const touch = this.player.createElement('div', `touch-box-${id}`)
			.addClasses([`touch-box-${id}`, 'z-40'])
			.appendTo(parent);

		const el = touch.get();
		el.style.gridColumnStart = pos.x.start.toString();
		el.style.gridColumnEnd = pos.x.end.toString();
		el.style.gridRowStart = pos.y.start.toString();
		el.style.gridRowEnd = pos.y.end.toString();

		return el;
	}

	private createTouchSeekBack(parent: HTMLElement, pos: Position) {
		const el = this.createTouchBox(parent, 'touchSeekBack', pos);

		el.addEventListener('click', this.doubleTap(
			() => this.player.rewindVideo(),
			() => {
				if (this.controlsVisible) {
					this.player.emit('hideControls');
				}
			},
		));

		this.createSeekRipple(el, 'left');
	}

	private createTouchSeekForward(parent: HTMLElement, pos: Position) {
		const el = this.createTouchBox(parent, 'touchSeekForward', pos);

		['mouseup', 'touchend'].forEach((event) => {
			el.addEventListener(event, this.doubleTap(
				() => this.player.forwardVideo(),
				() => {
					if (this.controlsVisible) {
						this.player.emit('hideControls');
					}
				},
			));
		});

		this.createSeekRipple(el, 'right');
	}

	private createTouchPlayback(parent: HTMLElement, pos: Position) {
		const el = this.createTouchBox(parent, 'touchPlayback', pos);
		this.player.addClasses(el, [
			'touch-playback',
			'flex',
			'-ml-2',
			'items-center',
			'justify-center',
		]);

		el.addEventListener('click', this.doubleTap(
			() => this.player.toggleFullscreen(),
			() => {
				if (this.controlsVisible) {
					this.player.togglePlayback();
				}
			},
		));

		const playButton = this.player.createSVGElement(el, 'bigPlay', icons.bigPlay, false, false);
		this.player.addClasses(playButton, [
			'touch-playback-button',
			'pointer-events-none',
			'fill-white',
		]);

		this.player.on('ready', () => { playButton.style.display = 'flex'; });
		this.player.on('pause', () => { playButton.style.display = 'flex'; });
		this.player.on('play', () => { playButton.style.display = 'none'; });
		this.player.on('time', () => { playButton.style.display = 'none'; });
	}

	private createTouchVolUp(parent: HTMLElement, pos: Position) {
		if (!this.player.isMobile()) return;
		const el = this.createTouchBox(parent, 'touchVolUp', pos);

		el.addEventListener('click', this.doubleTap(
			() => this.player.volumeUp(),
			() => {
				if (this.controlsVisible) {
					this.player.emit('hideControls');
				}
			},
		));
	}

	private createTouchVolDown(parent: HTMLElement, pos: Position) {
		if (!this.player.isMobile()) return;
		const el = this.createTouchBox(parent, 'touchVolDown', pos);

		el.addEventListener('click', this.doubleTap(
			() => this.player.volumeDown(),
			() => {
				if (this.controlsVisible) {
					this.player.emit('hideControls');
				}
			},
		));
	}

	private createSeekRipple(parent: HTMLDivElement, side: string) {
		const seekRipple = this.player.createElement('div', 'seek-ripple')
			.addClasses(['seek-ripple', side])
			.appendTo(parent)
			.get();

		const arrowHolder = this.player.createElement('div', 'seek-ripple-arrow')
			.addClasses(['seek-ripple-arrow'])
			.appendTo(seekRipple)
			.get();

		const text = this.player.createElement('p', 'seek-ripple-text')
			.addClasses(['seek-ripple-text'])
			.appendTo(seekRipple)
			.get();

		if (side === 'left') {
			seekRipple.style.borderRadius = '0 50% 50% 0';
			seekRipple.style.left = '0px';
			arrowHolder.innerHTML = `
				<div class="arrow arrow2 arrow-left"></div>
				<div class="arrow arrow1 arrow-left"></div>
				<div class="arrow arrow3 arrow-left"></div>
			`;
			this.player.on('rewind', (val: number) => {
				text.innerText = `${Math.abs(val)} ${this.player.localize('seconds')}`;
				seekRipple.style.display = 'flex';
			});
			this.player.on('remove-rewind', () => {
				seekRipple.style.display = 'none';
			});
		} else if (side === 'right') {
			seekRipple.style.borderRadius = '50% 0 0 50%';
			seekRipple.style.right = '0px';
			arrowHolder.innerHTML = `
				<div class="arrow arrow3 arrow-right"></div>
				<div class="arrow arrow1 arrow-right"></div>
				<div class="arrow arrow2 arrow-right"></div>
			`;
			this.player.on('forward', (val: number) => {
				text.innerText = `${Math.abs(val)} ${this.player.localize('seconds')}`;
				seekRipple.style.display = 'flex';
			});
			this.player.on('remove-forward', () => {
				seekRipple.style.display = 'none';
			});
		}
	}
}

export default StepPlugin;
