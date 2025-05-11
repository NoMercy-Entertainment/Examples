<script setup lang="ts">
import { ref } from 'vue';
import {Option} from "@/types/types";
import Menu from "@/components/Menu.vue";
import HomeCorner from "@/components/HomeCorner.vue";
import GithubCorner from "@/components/GithubCorner.vue";

defineProps({
  theme: {
    type: String,
    default: 'theme-1',
  },
});

const musicPlayerRef = ref<{ player:  any }>();
const currentMenu = ref('main');

const options = ref<Option[]>([
  {
    label: 'Play',
    level: 0,
    // action: () => musicPlayerRef.value?.player.play(),
  },
  {
    label: 'Pause',
    level: 0,
    action: () => musicPlayerRef.value?.player.pause(),
  },
  {
    label: 'Settings',
    level: 0,
    options: [
    ]
  },
]);

const goBack = () => {
  currentMenu.value = 'main';
};

</script>

<template>
  <HomeCorner :style="`--color-theme: var(--color-${theme}-shadow)`" />
  <GithubCorner :style="`--color-theme: var(--color-${theme}-shadow)`" />
  <div class="w-full h-32 min-h-32 flex items-center justify-center">
    <h1 class="text-4xl font-bold text-center">
      NoMercy Entertainment - Page 3
    </h1>
  </div>
  <div id="container"
       class="flex flex-wrap flex-col-reverse justify-center sm:justify-center items-center w-full gap-4 sm:gap-16 sm:flex-row flex-1">

    <aside
        id="menu"
        class="relative overflow-clip bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-lg flex flex-col w-full sm:w-1/3 max-w-sm  max-h-[calc(100vh-12rem)] h-64 sm:h-[100dvh] border border-neutral-700 p-2 sm:p-4">
      <Menu :options="options as Option[]" @goBack="goBack"
            :class="theme"
            :style="`
                  --color-1: var(--color-${theme}-shadow);
                  --color-2: var(--color-${theme}-border);
            `"/>
    </aside>

    <main id="wrapper"
          class="relative overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-lg flex flex-col sm:w-px h-[100dvh] w-auto aspect-[16/10]  max-h-[calc(100vh-12rem)] sm:flex-1 sm:max-w-[88rem] border border-neutral-700 p-2 sm:p-4 sm:pb-0 z-0">

    </main>
  </div>
</template>

<style scoped>
</style>