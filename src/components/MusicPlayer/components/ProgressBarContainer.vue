<script setup lang="ts">
import {PropType, ref} from 'vue';

import {humanTime} from '@/lib/dateTime';
import ProgressBar from './ProgressBar.vue';
import {currentTime, duration, remainingTime} from '../musicPlayerStore';

defineProps({
  size: {
    type: String,
    default: 'full',
  },
  color: {
    type: String,
    required: false,
  },
  variant: {
    type: String as PropType<'stacked' | 'default'> | undefined,
    default: 'default',
  },
  onKeyDown: {
    type: Function as PropType<(event: KeyboardEvent) => void>,
    required: false,
  },
  onKeyUp: {
    type: Function as PropType<(event: KeyboardEvent) => void>,
    required: false,
  },
});

const timeChoice = ref<'duration' | 'remaining'>(localStorage.getItem('timeChoise') as 'duration' | 'remaining' || 'remaining');

const toggleTimeChoice = () => {
  if (timeChoice.value === 'duration') {
    timeChoice.value = 'remaining';
  } else {
    timeChoice.value = 'duration';
  }
  localStorage.setItem('timeChoise', timeChoice.value);
};

</script>

<template>
  <div class="flex items-center justify-center !w-full flex-row select-none monospace">
    <div v-if="variant == 'stacked'" class="flex w-full flex-col">

      <div class="flex w-full items-center justify-between">
        <div class="music-compact:pointer-events-none pointer-events-auto flex h-full items-center w-available">
          <ProgressBar
              :color="color"
              :onKeyDown="onKeyDown"
              :onKeyUp="onKeyUp"
          />
        </div>
      </div>

      <div class="flex w-full items-center justify-between">
        <span aria-label="current time" class="mx-2 !text-contrast whitespace-nowrap text-xs relative block">
            {{ humanTime(currentTime) }}
        </span>

        <span class="mx-2 !text-contrast whitespace-nowrap text-xs relative flex justify-between monospace"
              @click="toggleTimeChoice">
          <span aria-label="duration" class="" v-if="timeChoice === 'duration'">
              {{ humanTime(duration) }}
          </span>
          <span aria-label="remaining time" v-else>
              {{ humanTime(remainingTime) }}
          </span>
        </span>
      </div>

    </div>
    <div v-else class="flex w-full items-center">
       <span aria-label="current time" class="mx-2 !text-contrast whitespace-nowrap text-xs relative block">
           {{ humanTime(currentTime) }}
       </span>
      <div
          class="w-available h-full items-center flex full:mb-2 !mb-0 music-compact:pointer-events-none pointer-events-auto">
        <ProgressBar :color="color"/>
      </div>
      <span class="mx-2 !text-contrast whitespace-nowrap text-xs relative flex justify-between"
            @click="toggleTimeChoice">
         <span aria-label="duration" class="" v-if="timeChoice === 'duration'">
             {{ humanTime(duration) }}
         </span>
         <span aria-label="remaining time" v-else>
             {{ humanTime(remainingTime) }}
         </span>
      </span>
    </div>
  </div>
</template>
