<script setup lang="ts">
import {musicPlayer, isPlaying} from '../musicPlayerStore';
import MusicButton from "@/components/MusicPlayer/components/MusicButton.vue";

const handleClick = (e: MouseEvent) => {
  e.stopPropagation();
  musicPlayer.togglePlayback();
};

</script>

<template>
  <MusicButton label="Toggle Playback" :onclick="handleClick" >
    <span v-if="isPlaying" class="material-icons text-white text-4xl">pause</span>
    <span v-else class="material-icons text-white text-4xl">play_arrow</span>
  </MusicButton>
</template>