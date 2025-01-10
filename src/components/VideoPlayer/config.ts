
import type  {PlayerConfig} from "@nomercy-entertainment/nomercy-video-player/src/types";

import playlist from "./playlist";

const config = {
	muted: false,
	controls: false,
	preload: 'auto',
	debug: false,
	playlist: playlist,
	controlsTimeout: 3000,
	doubleClickDelay: 500,
	playbackRates: [
		0.25,
		0.5,
		0.75,
		1,
		1.25,
		1.5,
		1.75,
		2,
	],
	renderAhead: 10,
} satisfies Partial<PlayerConfig>;

export default config;