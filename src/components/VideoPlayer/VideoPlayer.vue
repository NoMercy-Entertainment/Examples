<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

import nmplayer from "@nomercy-entertainment/nomercy-video-player/src";
// // @ts-ignore
// import nmplayer from "http://localhost:5503/src/index.ts";
import type {NMPlayer} from "@nomercy-entertainment/nomercy-video-player/src/types";

import config from "./config";
import OctopusPlugin from "@nomercy-entertainment/nomercy-video-player/src/plugins/octopusPlugin";

const player = ref<NMPlayer>();

onMounted(() => {
    player.value = nmplayer('player1')
        .setup(config) as unknown as NMPlayer;

  const octopusPlugin = new OctopusPlugin();
  player.value?.registerPlugin('octopus', octopusPlugin);
  player.value?.usePlugin('octopus');
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