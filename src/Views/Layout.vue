<script setup lang="ts">
import {type PropType, ref} from 'vue';
import {Option} from "@/types/types";
import Menu from "@/components/Menu.vue";
import HomeCorner from "@/components/HomeCorner.vue";
import GithubCorner from "@/components/GithubCorner.vue";

defineProps({
  theme: {
    type: String,
    default: 'theme-1',
  },
  title: {
    type: String,
    default: 'NoMercy Entertainment',
  },
  options: {
    type: Array as PropType<Array<Option>>,
    required: true,
  },
  backButton: {
    type: Boolean,
    default: false,
  },
  activeChild: {
    type: String,
    default: "main",
  },
});

</script>

<template>
  <HomeCorner :style="`--color-theme: var(--color-${theme}-shadow)`" />
  <GithubCorner :style="`--color-theme: var(--color-${theme}-shadow)`" />
  <div class="w-full h-32 min-h-32 flex items-center justify-center">
    <h1 class="text-4xl font-bold text-center">
      {{ title }}
    </h1>
  </div>
  <div id="container"
       class="flex flex-nowrap flex-col-reverse justify-center sm:justify-evenly items-center w-full gap-4 sm:gap-16 px-4 sm:px-16 sm:flex-row flex-1 max-h-[calc(100vh-12rem)] overflow-clip">

    <aside
        id="menu"
        class="relative overflow-clip bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-lg flex flex-col w-full sm:w-1/3 max-w-sm h-available border border-neutral-700 p-2 sm:p-4">
      <Menu :options="options as Option[]"
            :class="theme"
            :style="`
                  --color-1: var(--color-${theme}-shadow);
                  --color-2: var(--color-${theme}-border);
            `"/>
    </aside>

    <main id="wrapper"
          class="relative overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-lg flex flex-col h-full w-auto aspect-[16/10] 5xl:aspect-[16/9.5] sm:max-w-[120rem] border border-neutral-700 p-2 sm:p-4 z-0">
        <slot />
    </main>
  </div>
</template>

<style scoped>

</style>