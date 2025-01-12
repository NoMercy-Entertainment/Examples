// noinspection JSUnusedGlobalSymbols
import {ref, toRaw} from 'vue';

import MusicPlayer from '@nomercy-entertainment/nomercy-music-player';

import {RepeatState, type EQBand, type EqualizerPreset, type EQSliderValues} from '@nomercy-entertainment/nomercy-music-player/src/types';

export interface BasePlaylistItem {
	id: string;
	name: string;
	cover: string | null;
	path: string;
	album_track: {
		name: string;
		[key: string]: any;
	}[];
	artist_track: {
		name: string;
		[key: string]: any;
	}[];
	[key: string]: any;
}

export interface PlaylistItem extends BasePlaylistItem {
	duration: string;
	favorite: boolean;
	date: string;
}

export const musicPlayer = new MusicPlayer<BasePlaylistItem>({
	motionConfig: {
		canvas: document.getElementById('visualizer') as HTMLCanvasElement,
	},
	motionColors: [
		'#ff0000',
		'#ffff00',
		'#00ff00',
		'#00ffff',
		'#0000ff',
		'#ff00ff',
		'#ff0000',
	],
	siteTitle: 'Music Player',
	expose: true,
});
export default musicPlayer;

export const currentTime = ref<number>(0);
export const duration = ref<number>(0);
export const remainingTime = ref<number>(0);
export const percentage = ref<number>(0);
export const currentSong = ref<BasePlaylistItem | null>(null);
export const currentPlaylist = ref<string | null>(null);
export const queue = ref<BasePlaylistItem[]>([]);
export const backlog = ref<BasePlaylistItem[]>([]);
export const isPlaying = ref<boolean>(false);
export const isMuted = ref<boolean>(false);
export const isShuffling = ref<boolean>(false);
export const isRepeating = ref<RepeatState>('off');
export const volume = ref<number>(100);

export const panning = ref(0);
export const bands = ref<EQBand[]>([]);
export const equalizerPresets = ref<EqualizerPreset[]>([]);
export const equalizerSliderValues = ref<EQSliderValues>(<EQSliderValues>{});

export const equalizerPreset = ref<EqualizerPreset>(<EqualizerPreset>{});

export const setCurrentPlaylist = (value: string): void => {
	currentPlaylist.value = value;
};

export const queueMenuOpen = ref<boolean>(false);
export const setQueueMenuOpen = (value: boolean): void => {
	queueMenuOpen.value = value;
	equalizerMenuOpen.value = false;
};
export const toggleQueueMenuOpen = (): void => {
	queueMenuOpen.value = !queueMenuOpen.value;
	equalizerMenuOpen.value = false;
};

export const equalizerMenuOpen = ref<boolean>(false);
export const setEqualizerMenuOpen = (value: boolean): void => {
	equalizerMenuOpen.value = value;
	queueMenuOpen.value = false;
};
export const toggleEqualizerMenuOpen = (): void => {
	equalizerMenuOpen.value = !equalizerMenuOpen.value;
	queueMenuOpen.value = false;
};

export const closeEqualizerMenu = (): void => {
	equalizerMenuOpen.value = false;
	queueMenuOpen.value = false;
}

export const abbreviateFrequency = (frequency: number) => {
	if (frequency >= 1000) {
		return `${frequency / 1000}k`;
	}
	return frequency;
};

export const convertToPercentage = (value: number, min: number, max: number): number => {
	let percentage = ((value - min) / (max - min)) * 100;

	if (percentage <= 20) {
		percentage += (5 / 20) * percentage;
	}
	else if (percentage >= 80) {
		percentage -= (5 / 20) * (100 - percentage);
	}

	return Math.max(0, Math.min(100, percentage));
}

export const handleFullReset = () => {
	panning.value = 0;
	setEqualizerPreset(equalizerPresets.value.find(preset => preset.name == 'Flat'));
};

export const handleChange = (type: string, event: Event, band?: EQBand) => {
	const value = parseFloat((event.target as HTMLInputElement).value);

	if (type === 'panning') {
		panning.value = value;
		musicPlayer.setPanner(value);
		musicPlayer.saveEqualizerSettings();
		return;
	}

	if (!band?.gain) return;

	band.gain = value;

	if (band.frequency === 'Pre') {
		musicPlayer.setPreGain(value);
		musicPlayer.saveEqualizerSettings();
		return;
	}

	bands.value = [...bands.value.map((b) => {
		if (b.frequency === band.frequency) {
			musicPlayer.setFilter(band);
			return band;
		}
		return b;
	})];

	musicPlayer.equalizerBands = bands.value;

	musicPlayer.saveEqualizerSettings();
};

const clicks = ref(0);
const timer = ref<NodeJS.Timeout>();
const delay = 300;

export const onDoubleClick = (event: MouseEvent, click: (event: MouseEvent) => void, double: (event: MouseEvent) => void) => {
	clicks.value++;
	if (clicks.value === 1) {
		timer.value = setTimeout( () => {
			clicks.value = 0
			click(event);
		}, delay);
	} else {
		clearTimeout(timer.value);

		double?.(event);
		clicks.value = 0;
	}
}

export const handleReset = (type: string, event: MouseEvent, band?: EQBand) => {
	onDoubleClick(event, () => {}, () => {
		if (type === 'panning') {
			panning.value = 0;
			musicPlayer.setPanner(0);
			musicPlayer.saveEqualizerSettings();
			return;
		}

		if (!band?.gain) return;

		band.gain = 0;

		if (band.frequency === 'Pre') {
			musicPlayer.setPreGain(0);
			musicPlayer.saveEqualizerSettings();
			return;
		}

		bands.value = [...bands.value.map((b) => {
			if (b.frequency === band.frequency) {
				musicPlayer.setFilter(band);
				return band;
			}
			return b;
		})];

		musicPlayer.equalizerBands = bands.value;

		musicPlayer.saveEqualizerSettings();
	});
}

export const setEqualizerPreset = (value?: EqualizerPreset) => {
	equalizerPreset.value = equalizerPresets.value.find((p) => p.name === (value?.name ?? 'Flat')) ?? equalizerPresets.value[0];

	bands.value = [
		{ frequency: 'Pre', gain: equalizerSliderValues.value.pre.default },
		...equalizerPreset.value.values
	];

	musicPlayer.equalizerBands = bands.value;

	for (let i = 1; i < bands.value.length; i++) {
		musicPlayer.setFilter(bands.value[i]);
	}

	musicPlayer.saveEqualizerSettings();
}

panning.value = musicPlayer.equalizerPanning;
bands.value = musicPlayer.equalizerBands;
equalizerPresets.value = musicPlayer.equalizerPresets;
equalizerSliderValues.value = musicPlayer.equalizerSliderValues;

equalizerPreset.value = musicPlayer.equalizerPresets
	.find(preset => preset.name == 'Flat') ?? equalizerPresets.value[0];

musicPlayer.on('time', (timeState) => {
	currentTime.value = timeState.position;
	duration.value = timeState.duration;
	remainingTime.value = timeState.remaining;
	percentage.value = timeState.percentage;
});
musicPlayer.on('song', (data) => {
	currentSong.value = data;
});

musicPlayer.on('queue', (data) => {
	queue.value = toRaw(data);
});

musicPlayer.on('backlog', (data) => {
	backlog.value = toRaw(data);
});

musicPlayer.on('play', () => {
	isPlaying.value = true;
});
musicPlayer.on('pause', () => {
	isPlaying.value = false;
});
musicPlayer.on('stop', () => {
	isPlaying.value = false;
});

musicPlayer.on('mute', (value) => {
	isMuted.value = value;
});

musicPlayer.on('shuffle', (value) => {
	isShuffling.value = value;
});

musicPlayer.on('repeat', (value) => {
	isRepeating.value = value;
});

musicPlayer.on('volume', (value) => {
	volume.value = value;
});
