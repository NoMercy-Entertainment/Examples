<script setup lang="ts">

import musicPlayer, {setQueueMenuOpen} from '../musicPlayerStore';

import MusicButton from './MusicButton.vue';

const handleClick = (e?: MouseEvent) => {
	e?.stopPropagation();
  setQueueMenuOpen(false);
	musicPlayer.stop();
};
</script>

<template>
    <MusicButton label="Stop" :onclick="handleClick">
        <span class="material-icons text-white text-2xl">stop</span>
    </MusicButton>
</template>
