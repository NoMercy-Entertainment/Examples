<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import nmplayer from "@nomercy-entertainment/nomercy-video-player/src";
// // @ts-ignore
// import nmplayer from "http://localhost:5503/src/index.ts";
import type { NMPlayer } from "@nomercy-entertainment/nomercy-video-player/src/types";

declare global {
  interface Window {
    player: NMPlayer;
    nmplayer: typeof nmplayer;
  }
}

import config from "./config";
import { OctopusPlugin } from "@nomercy-entertainment/nomercy-video-player/src/plugins/octopusPlugin";

const props = defineProps({
  language: {
    type: String,
    default: 'en',
  },
});

const player = ref<NMPlayer>();

onMounted(() => {
    player.value = nmplayer('player1')
        .setup({ ...config, language: props.language });

  const octopusPlugin = new OctopusPlugin({ renderAhead: 10 });
  player.value?.registerPlugin('octopus', octopusPlugin);
  player.value?.usePlugin('octopus');

  window.player = player.value;
  window.nmplayer = nmplayer;
});

onUnmounted(() => {
  player.value?.dispose();
});

defineExpose({
  player,
});

</script>

<template>
  <div id="player1" class="group nomercyplayer rounded-md !overflow-unset"></div>
</template>

<style >
video::-webkit-media-text-track-container {
  display: none;
}
</style>