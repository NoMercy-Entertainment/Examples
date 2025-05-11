<script setup lang="ts">

import PlaybackButton from "@/components/MusicPlayer/components/PlaybackButton.vue";
import ShuffleButton from "@/components/MusicPlayer/components/ShuffleButton.vue";
import PreviousButton from "@/components/MusicPlayer/components/PreviousButton.vue";
import NextButton from "@/components/MusicPlayer/components/NextButton.vue";
import RepeatButton from "@/components/MusicPlayer/components/RepeatButton.vue";
import VolumeContainer from "@/components/MusicPlayer/components/VolumeContainer.vue";
import ProgressBarContainer from "@/components/MusicPlayer/components/ProgressBarContainer.vue";
import EqButton from "@/components/MusicPlayer/components/EqButton.vue";
import QueueButton from "@/components/MusicPlayer/components/QueueButton.vue";
import StopButton from "@/components/MusicPlayer/components/StopButton.vue";
import CoverImage from "@/components/MusicPlayer/components/CoverImage.vue";

import {musicPlayer, currentSong} from "./musicPlayerStore";

defineExpose({
  player: musicPlayer,
});

</script>

<template>
  <div class="flex flex-col my-auto left-0 w-available mx-auto">

    <div class="flex flex-col items-center gap-1 justify-between w-full sm:bg-neutral-800/80 rounded-full px-4 py-2">

      <div class="flex flex-col sm:flex-row items-center gap-2 w-full px-2">

        <div class="flex landscape:hidden sm:hidden w-full gap-2 overflow-clip">
          <CoverImage :data="currentSong" class="w-16 min-w-16 aspect-square bg-black" />
          <div class="flex flex-col w-full justify-evenly">
            <span class="text-sm whitespace-nowrap line-clamp-1">
              {{ currentSong?.name ?? 'No Mercy' }}
            </span>
            <span class="text-xs whitespace-nowrap line-clamp-1">
              {{ currentSong?.artist_track?.at(0)?.name ?? 'Select a playlist in the menu' }}
            </span>
          </div>
        </div>

        <div class="hidden sm:flex w-full gap-2 max-w-[33%] overflow-clip py-2 -ml-2">
          <CoverImage :data="currentSong " class="w-14 min-w-14 aspect-square bg-black rounded-full" />
          <div class="flex flex-col w-full justify-evenly">
            <span class="text-sm whitespace-nowrap line-clamp-1">
              {{ currentSong?.name ?? 'No Mercy' }}
            </span>
            <span class="text-xs whitespace-nowrap line-clamp-1">
              {{ currentSong?.artist_track?.at(0)?.name ?? 'Select a playlist in the menu' }}
            </span>
          </div>
        </div>

        <div class="flex w-full flex-grow flex-col items-center justify-start transition-width duration-300">
          <div class="flex justify-center flex-col w-full">
            <ProgressBarContainer class="sm:hidden" />
            <div class="flex flex-shrink-0 flex-grow-0 items-center justify-center gap-2 mt-2">
              <ShuffleButton />
              <PreviousButton />
              <PlaybackButton class="children:h-10 h-12 children:w-10 w-12 !bg-white/10" />
              <NextButton />
              <RepeatButton />
            </div>
          </div>
        </div>

        <div class="hidden landscape:hidden lg:landscape:flex relative flex-grow justify-end w-full max-w-[33%] -mr-2">
          <StopButton />

          <QueueButton />
          <EqButton />

          <VolumeContainer />
        </div>

      </div>
    </div>

    <div class="rounded-full left-0 w-available px-4 mx-2 sm:mx-8">

      <div
        class="hidden sm:flex justify-between w-available items-center gap-2 text-xs mx-12 bg-neutral-800/80 px-5 rounded-b-full py-4 -mt-px">

        <ProgressBarContainer />
      </div>
    </div>

  </div>

</template>

<style scoped>
</style>