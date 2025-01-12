<script setup lang="ts">

import MusicButton from './MusicButton.vue';
import musicPlayer from '../musicPlayerStore';

const handleClick = (e?: MouseEvent) => {
  e?.stopPropagation();
  musicPlayer.next();
};
</script>

<template>
  <MusicButton label="Next" :onclick="handleClick">
    <span class="material-icons text-white text-3xl">skip_next</span>
  </MusicButton>
</template>
