<script setup lang="ts">
import { ref } from 'vue';

const optionsVisible = ref(true);

</script>

<template>
  <div class="music-player-container">
    <div class="options-menu" v-if="optionsVisible">

    </div>

    <div class="music-player">
      HI I AM MUSIC PLAYER
    </div>
  </div>
</template>

<style scoped>
.music-player-container {
  display: flex;
}
.music-player {
  flex: 1;
  padding: 1rem;
}
.options-menu {
  width: 33%;
  padding: 1rem;
}
</style>