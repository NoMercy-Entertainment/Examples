<script setup lang="ts">

import MusicButton from './MusicButton.vue';
import musicPlayer, {isMuted, volume} from '../musicPlayerStore';

const handleClick = (e?: MouseEvent) => {
	e?.stopPropagation();
	musicPlayer.toggleMute();
};
</script>

<template>
    <MusicButton label="Mute" :onclick="handleClick">
        <span v-if="isMuted" class="material-icons text-white ml-auto text-2xl">volume_off</span>
        <span v-else-if="volume == 0" class="material-icons text-white ml-auto text-2xl">volume_mute</span>
        <span v-else-if="volume <= 50" class="material-icons text-white ml-auto text-2xl">volume_down</span>
      <span v-else-if="volume > 50" class="material-icons text-white ml-auto text-2xl">volume_up</span>
      <span v-else class="material-icons text-white ml-auto text-2xl">volume_down</span>
    </MusicButton>
</template>
