<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <div class="w-screen h-[100dvh] flex flex-col items-center overflow-clip">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>

<style scoped>
</style>