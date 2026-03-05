<script setup lang="ts">
import {onMounted, onUnmounted, ref, watch} from "vue";

import nmplayer from "@nomercy-entertainment/nomercy-video-player/src";
import type {NMPlayer} from "@nomercy-entertainment/nomercy-video-player/src/types";
import {KeyHandlerPlugin} from "@nomercy-entertainment/nomercy-video-player/src/plugins/keyHandlerPlugin";

import config from "../VideoPlayer/config";

const props = defineProps<{
	step: number;
}>();

const player = ref<NMPlayer>();
let createId = 0;

const stepModules: Record<number, () => Promise<any>> = {
	1: () => import('./steps/step1Plugin'),
	2: () => import('./steps/step2Plugin'),
	3: () => import('./steps/step3Plugin'),
	4: () => import('./steps/step4Plugin'),
	5: () => import('./steps/step5Plugin'),
	6: () => import('./steps/step6Plugin'),
	7: () => import('./steps/step7Plugin'),
	8: () => import('./steps/step8Plugin'),
	9: () => import('./steps/step9Plugin'),
	10: () => import('./steps/step10Plugin'),
};

async function createPlayer(step: number) {
	const id = ++createId;

	if (player.value) {
		player.value.dispose();
		player.value = undefined;
	}

	const container = document.getElementById('tutorial-player');
	if (container) {
		container.innerHTML = '';
	}

	const mod = await stepModules[step]();

	// A newer createPlayer call was started while we were awaiting — bail out
	if (id !== createId) return;

	player.value = nmplayer('tutorial-player')
		.setup(config) as unknown as NMPlayer;

	const PluginClass = mod.StepPlugin ?? mod.default;

	const uiPlugin = new PluginClass();
	player.value.registerPlugin('ui', uiPlugin);
	player.value.usePlugin('ui');

	const keyPlugin = new KeyHandlerPlugin();
	player.value.registerPlugin('keys', keyPlugin);
	player.value.usePlugin('keys');
}

onMounted(() => {
	createPlayer(props.step);
});

watch(() => props.step, (newStep) => {
	createPlayer(newStep);
});

onUnmounted(() => {
	createId++;
	player.value?.dispose();
});

defineExpose({
	player,
});
</script>

<template>
	<div id="tutorial-player" class="group nomercyplayer rounded-md !overflow-unset h-full w-full flex-1"></div>
</template>

<style>
video::-webkit-media-text-track-container {
	display: none;
}
</style>
