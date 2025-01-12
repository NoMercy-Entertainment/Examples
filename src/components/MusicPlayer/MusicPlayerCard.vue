<script setup lang="ts">
import logo from "@/assets/logo.svg";

import HomeCard from "@/components/HomeCard.vue";
</script>

<template>
  <HomeCard route="/musicplayer">
    <div class="text-right text-sm group-hover/card:text-base  group-hover/card:font-bold transition-all duration-300 delay-0">
      Music player
    </div>

    <div class="absolute top-1/2 -translate-y-1/2 rounded-full left-0 w-available bg-neutral-900/80  px-4 py-2 mx-4">

      <div class="flex flex-col items-center gap-1">

        <div class="flex items-center gap-2 w-full px-2">
          <div class="flex w-full gap-2">
            <div class="w-10 aspect-square bg-black">
              <img class="object-fit w-full h-full p-1" :src="logo" alt="logo" />
            </div>
            <div class="flex flex-col w-full">
              <span class="text-2xs whitespace-nowrap line-clamp-1">No Mercy</span>
              <span class="text-3xs whitespace-nowrap line-clamp-1">Racoon</span>
            </div>
          </div>

          <span class="material-icons text-white text-sm">shuffle</span>
          <span class="material-icons text-white text-2xl">skip_previous</span>

          <div class="flex items-center justify-center rounded-full left-0 p-1 w-12 min-w-12 aspect-square bg-white/10 ">
            <span class="material-icons text-white text-4xl">play_arrow</span>
          </div>

          <span class="material-icons text-white text-2xl">skip_next</span>
          <span class="material-icons text-white text-sm">repeat</span>

          <div class="flex w-full items-center gap-2">
            <span class="material-icons text-white ml-auto !text-sm">volume_up</span>
            <div class="flex flex-1 h-1 bg-neutral-700 rounded-full max-w-10">
              <div class="h-full bg-white rounded-full" style="width: 50%"></div>
            </div>
          </div>
        </div>

      </div>

      <div class="absolute top-1/2  translate-y-2/4 rounded-full left-0 w-available px-4 py-2 mx-8">

        <div class="flex justify-between w-available items-center gap-2 text-xs mx-12 bg-neutral-900/80 px-6 rounded-b-full mt-px">
          <span class="font-mono text-white">2:10</span>
          <div class="flex flex-1 h-1 bg-neutral-700 rounded-full my-3">
            <div class="h-full bg-white rounded-full" style="width: 50%"></div>
          </div>
          <span class="font-mono text-white">4:20</span>
        </div>

      </div>

    </div>

  </HomeCard>
</template>

<style scoped>
</style>