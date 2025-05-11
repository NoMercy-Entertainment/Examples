<script setup lang="ts">

import MusicButton from './MusicButton.vue';
import {queueMenuOpen, toggleQueueMenuOpen} from '../musicPlayerStore';

const handleClick = (e?: MouseEvent) => {
    e?.stopPropagation();
    toggleQueueMenuOpen();
};
</script>

<template>
    <MusicButton label="Queue" :onclick="handleClick">
      <span class="material-icons text-white ml-auto text-2xl"
            :class="{
              '!text-[var(--color-theme-2-shadow)]': queueMenuOpen,
            }"
      >queue_music</span>
    </MusicButton>
</template>
