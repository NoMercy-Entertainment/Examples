<script setup lang="ts">
import musicPlayer from '../musicPlayerStore';
import MusicButton from './MusicButton.vue';

const handleClick = (e?: MouseEvent) => {
	e?.stopPropagation();
	musicPlayer.previous();
};
</script>

<template>
    <MusicButton label="Previous" :onclick="handleClick">
      <span class="material-icons text-white text-3xl">skip_previous</span>
    </MusicButton>
</template>
