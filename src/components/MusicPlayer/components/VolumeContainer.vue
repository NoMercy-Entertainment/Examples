<script setup lang="ts">

import VolumeButton from '@/components/MusicPlayer/components/VolumeButton.vue';
import VolumeSlider from '@/components/MusicPlayer/components/VolumeSlider.vue';
</script>

<template>
    <div class="mr-2 flex w-32 min-w-28 items-center">
        <VolumeButton />

        <div class="w-full h-full items-center flex">
             <VolumeSlider />
        </div>
    </div>
</template>
