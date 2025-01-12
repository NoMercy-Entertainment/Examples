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
  <div class="mt-auto mb-8 left-0 w-available mx-auto">

    <div class="flex flex-col items-center gap-1 justify-between w-full bg-neutral-800/80 rounded-full px-4 py-2">

      <div class="flex items-center gap-2 w-full px-2">

        <div class="flex w-full gap-2 max-w-[33%] overflow-clip">
          <CoverImage  :data="currentSong " class="w-14 min-w-14 aspect-square bg-black" />
          <div class="flex flex-col w-full justify-evenly">
            <span class="text-sm whitespace-nowrap line-clamp-1">
              {{ currentSong?.name ?? 'No Mercy' }}
            </span>
            <span class="text-xs whitespace-nowrap line-clamp-1">
              {{ currentSong?.artist_track?.at(0)?.name ?? 'Racoon' }}
            </span>
          </div>
        </div>

        <div class="flex w-full flex-grow flex-col items-center justify-start transition-width duration-300">
          <div class="flex justify-center">
            <div class="flex flex-shrink-0 flex-grow-0 items-center justify-center gap-2">
              <ShuffleButton/>
              <PreviousButton/>
              <PlaybackButton class="children:h-10 h-12 children:w-10 w-12 !bg-white/10"/>
              <NextButton/>
              <RepeatButton/>
            </div>
          </div>
        </div>

        <div class="relative flex flex-grow justify-end w-full max-w-[33%]">
          <StopButton />

          <QueueButton/>
          <EqButton />

          <VolumeContainer />
        </div>

      </div>
    </div>

    <div class="rounded-full left-0 w-available px-4 mx-8">

      <div
          class="flex justify-between w-available items-center gap-2 text-xs mx-12 bg-neutral-800/80 px-6 rounded-b-full mt-px py-4 -mt-px">

        <ProgressBarContainer />
      </div>

    </div>

  </div>

</template>

<style scoped>
</style>