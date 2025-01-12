<script setup lang="ts">

import MusicButton from './MusicButton.vue';
import musicPlayer from '../musicPlayerStore';

</script>

<template>
    <MusicButton label="" :onclick="() => musicPlayer?.togglePlayback()">

    </MusicButton>
</template>
