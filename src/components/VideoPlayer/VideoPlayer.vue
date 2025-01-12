<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

import nmplayer from "@nomercy-entertainment/nomercy-video-player/src";
import type {NMPlayer} from "@nomercy-entertainment/nomercy-video-player/src/types";

import config from "./config";

const player = ref<NMPlayer>();

onMounted(() => {
    player.value = nmplayer('player1')
        .setup(config) as unknown as NMPlayer;
});

onUnmounted(() => {
  player.value?.dispose();
});

defineExpose({
  player,
});

</script>

<template>
  <div id="player1" class="group nomercyplayer rounded-md"></div>
</template>

<style scoped>

</style>