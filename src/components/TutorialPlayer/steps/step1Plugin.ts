import Plugin from '@nomercy-entertainment/nomercy-video-player/src/plugin';
import type { NMPlayer } from '@nomercy-entertainment/nomercy-video-player/src/types';

export class StepPlugin extends Plugin {
	declare player: NMPlayer<any>;

	private topBar!: HTMLDivElement;
	private bottomBar!: HTMLDivElement;
	private overlay!: HTMLDivElement;

	initialize(player: NMPlayer<any>) {
		this.player = player;
	}

	use() {
		this.overlay = this.player.overlay;
		this.createTopBar();
		this.createBottomBar();
	}

	dispose() {
		this.topBar?.remove();
		this.bottomBar?.remove();
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
}

export default StepPlugin;
