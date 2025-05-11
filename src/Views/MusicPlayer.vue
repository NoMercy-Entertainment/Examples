<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import type { Option } from "@/types/types";
import Layout from "@/Views/Layout.vue";

import MusicPlayer from "@/components/MusicPlayer/MusicPlayer.vue";

import playlists from '@/components/MusicPlayer/playlists';
import { fetchPlaylist } from '@/lib/fetchPlaylist';
import { useLocalStorage } from '@vueuse/core';
import { currentSong, equalizerMenuOpen, queueMenuOpen } from '@/components/MusicPlayer/musicPlayerStore';
import { unique } from '@nomercy-entertainment/nomercy-video-player/src/helpers';
import { BasePlaylistItem } from '@nomercy-entertainment/nomercy-music-player/dist/types';

defineProps({
  theme: {
    type: String,
    default: 'theme-1',
  },
});

const musicPlayerRef = ref<{ player: any }>();
const canvas = ref<HTMLCanvasElement>();
const audioColor = ref<HTMLDivElement>();

const useTheme = useLocalStorage('useTheme', true);

const colorStops = computed(() => {
  const bg = getComputedStyle(audioColor.value!).backgroundColor;

  if (!useTheme.value) {
    return [
      '#ff0000',
      '#ffff00',
      '#00ff00',
    ];
  }
  return [
    bg,
  ];
});

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
      {
        label: computed(() => useTheme.value ? 'Use default colors' : 'Use theme colors'),
        level: 1,
        action: () => {
          useTheme.value = !useTheme.value;
        },
      },
    ]
  },
  {
    label: 'Playlists',
    level: 0,
    options: [
      ...playlists.value.map((playlist) => ({
        label: `${playlist.artist} - ${playlist.name}`,
        level: 1,
        action: () => {
          musicPlayerRef.value?.player?.setBaseUrl('');
          musicPlayerRef.value?.player?.playTrack(playlist.tracks[0], playlist.tracks);
        },
      })),
    ]
  },
]);

onMounted(() => {
  if (!musicPlayerRef.value) return;

  musicPlayerRef.value.player?.setBaseUrl('');
  const playlist = playlists.value.find(p => p.name == 'Wake Up')!;
  musicPlayerRef.value.player?.playTrack(playlist.tracks[0], playlist.tracks);
  musicPlayerRef.value.player?.pause();

});

const handleChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const url = input.value;

  if (!url) return;

  const playlist = await fetchPlaylist(url);
  if (!playlist) return;

  options.value = [
    ...options.value.filter((option) => option.label !== 'Playlists'),
    {
      label: 'Playlists',
      level: 0,
      options: [
        ...options.value.find((option) => option.label == 'Playlists')?.options ?? [],
        {
          label: `${playlist.artist} - ${playlist.name}`,
          level: 1,
          action: () => {
            musicPlayerRef.value?.player?.setBaseUrl('');
            musicPlayerRef.value?.player?.setQueue(playlist.tracks);
            musicPlayerRef.value?.player?.setCurrentSong(playlist.tracks[0]);
            musicPlayerRef.value?.player?.pause();
          },
        }
      ]
    }
  ];

  musicPlayerRef.value?.player?.setBaseUrl('');
  musicPlayerRef.value?.player?.setQueue(playlist.tracks);
  musicPlayerRef.value?.player?.setCurrentSong(playlist.tracks[0]);
  musicPlayerRef.value?.player?.pause();
};

watch(canvas, (value) => {
  if (!value) return;
  const context = value.getContext('2d', {
    willReadFrequently: true,
    desynchronized: true,
  });

  const draw = () => {
    if (!musicPlayerRef.value?.player) return;

    const sourceCanvas = musicPlayerRef.value.player._audioElement1?.motion?.canvas;
    if (sourceCanvas && audioColor.value) {

      if (musicPlayerRef.value.player._audioElement1.isPlaying()) {
        if (useTheme) {
          musicPlayerRef.value.player._audioElement1?.motion!.registerGradient('theme', {
            bgColor: 'transparent',
            dir: 'h',
            colorStops: colorStops.value
          });

          musicPlayerRef.value.player._audioElement1!.motion!.gradient = 'theme';
        }

        value.width = sourceCanvas.width;
        value.height = sourceCanvas.height;
        context!.clearRect(0, 0, value.width, value.height);
        context!.drawImage(sourceCanvas, 0, 0, value.width, value.height);
      } else if (musicPlayerRef.value.player._audioElement2.isPlaying()) {
        if (useTheme) {
          musicPlayerRef.value.player._audioElement2?.motion!.registerGradient('theme', {
            bgColor: 'transparent',
            dir: 'h',
            colorStops: colorStops.value
          });

          musicPlayerRef.value.player._audioElement2!.motion!.gradient = 'theme';
        }

        value.width = sourceCanvas.width;
        value.height = sourceCanvas.height;
        context!.clearRect(0, 0, value.width, value.height);
        context!.drawImage(sourceCanvas, 0, 0, value.width, value.height);
      }
    }
    requestAnimationFrame(draw);
  };

  draw();
});

watch(musicPlayerRef, (value) => {
  if (!value) return;
  console.log(value?.player);
});

const handleClick = (song: any) => {
  if (!musicPlayerRef.value) return;
  musicPlayerRef.value.player?.setCurrentSong(song);
  musicPlayerRef.value.player?.play();
};

const list = computed(() => {
  if (!musicPlayerRef.value) return [];

  return unique<BasePlaylistItem>(musicPlayerRef.value?.player?._backLog
    .concat([musicPlayerRef.value?.player?.currentSong])
    .concat(musicPlayerRef.value?.player?._queue), 'name')
});

</script>

<template>
  <Layout :theme="theme" :title="`NoMercy Entertainment - Music Player`" :options="options as Option[]">

    <div ref="audioColor" id="audio-color"
      class="absolute top-0 left-0 overflow-clip bg-[var(--color-theme-2-shadow)] h-0 w-0"></div>

    <div class="flex gap-2 items-center justify-center h-10 flex-1 w-auto bg-black relative overflow-clip">
      <canvas ref="canvas" id="visualizer" class="w-full h-full" :class="{
        'opacity-0': !equalizerMenuOpen,
        'w-full': !queueMenuOpen,
      }" />

      <div class="flex flex-col w-full h-available overflow-auto py-2 gap-2 pr-4 transition-all duration-300" :class="{
        '-translate-x-0': queueMenuOpen,
        'translate-x-full !w-0': !queueMenuOpen,
      }">
        <template v-for="(song, index) in list" :key="index">
          <button class="flex items-center w-full h-full gap-2 text-left" @click="handleClick(song)">
            <div class="flex items-center justify-center">
              <img :src="song?.cover" class="w-12 aspect-square" />
            </div>
            <div class="flex flex-col w-full h-full" :class="{
              '!text-[var(--color-theme-2-shadow)]': song?.name == currentSong?.name,
            }">
              <h1 class="text-lg">{{ song?.name }}</h1>
              <h2 class="text-sm">{{ song?.album_track?.at(0)?.name }} - {{ song?.artist_track?.at(0)?.name }}</h2>
            </div>
          </button>
        </template>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-center w-full gap-2 mt-2 mb-2 sm:my-4">
      <label for="playlist-url" class="text-pretty text-lg hidden sm:flex flex-nowrap whitespace-nowrap gap-1">
        <a class="underline underline-offset-2" target="_blank"
          :href="currentSong?.album_track.at(0)?.url || 'https://freemusicarchive.org/music/artistShuffle'">freemusicarchive.org</a>
        url:
      </label>
      <div class="flex gap-2 flex-1 w-full">
        <input type="text" class="w-px flex-1 px-2 py-1" :placeholder="currentSong?.album_track.at(0)?.url"
          @change="handleChange" />
        <button @click="handleChange"
          class="px-4 py-2 bg-pretty text-white rounded-lg bg-[var(--color-theme-2-shadow)]">Load</button>
      </div>
    </div>

    <MusicPlayer ref="musicPlayerRef" />
  </Layout>
</template>

<style scoped></style>