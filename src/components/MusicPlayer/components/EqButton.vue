<script setup lang="ts">

import {equalizerMenuOpen, toggleEqualizerMenuOpen} from '../musicPlayerStore';

import MusicButton from './MusicButton.vue';

const handleClick = (e?: MouseEvent) => {
  e?.stopPropagation();
  toggleEqualizerMenuOpen();
};
</script>

<template>
  <MusicButton label="Equalizer" :onclick="handleClick">
    <span class="material-icons text-white text-2xl"
          :class="{
              '!text-[var(--color-theme-2-shadow)]': equalizerMenuOpen,
            }"
    >equalizer</span>
  </MusicButton>
</template>
