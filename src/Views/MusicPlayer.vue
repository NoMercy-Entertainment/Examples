<script setup lang="ts">
import { ref } from 'vue';

import type {Option} from "@/types/types";
import Layout from "@/Views/Layout.vue";

import MusicPlayer from "@/components/MusicPlayer/MusicPlayer.vue";
import {fetchPlaylist} from "@/lib/musicPlaylist";

defineProps({
  theme: {
    type: String,
    default: 'theme-1',
  },
});

const musicPlayerRef = ref<{ player:  any }>();

const loadPlaylist = (genre: string) => {
  fetchPlaylist(genre, 3);
}

const options = ref<Option[]>([
  {
    label: 'Play',
    level: 0,
    action: () => musicPlayerRef.value?.player?.play(),
  },
  {
    label: 'Pause',
    level: 0,
    action: () => musicPlayerRef.value?.player?.pause(),
  },
  {
    label: 'Settings',
    level: 0,
    options: [
    ]
  },
  {
    label: 'Playlists',
    level: 0,
    options: [
      {
        label: 'Rock',
        level: 1,
        action: () => loadPlaylist('Rock'),
      },
      {
        label: 'Pop',
        level: 1,
        action: () => loadPlaylist('Pop'),
      },
      {
        label: 'Jazz',
        level: 1,
        action: () => loadPlaylist('Jazz'),
      },
      {
        label: 'Classical',
        level: 1,
        action: () => loadPlaylist('Classical'),
      },
    ]
  },
]);

</script>

<template>
  <Layout :theme="theme" :title="`NoMercy Entertainment - Music Player`"  :options="options as Option[]">

<!--    canvas container-->
    <div class="flex flex-col items-center justify-center h-96 w-auto aspect-[32/9] bg-neutral-900/80">
      <canvas id="visualizer" class="w-full h-full" />
    </div>

      <MusicPlayer ref="musicPlayerRef" />
  </Layout>
</template>

<style scoped>
</style>