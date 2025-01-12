<script setup lang="ts">

defineProps({
  route: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <router-link :to="route"
               class="home-card relative group/card overflow-clip bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-lg flex flex-col w-full sm:w-[30%] h-auto aspect-[16/10] border-[3px] hover:border-2  p-2 sm:p-4 empty:hidden-"
  >
    <slot />
  </router-link>
</template>

<style scoped lang="scss">
.home-card {
  transition: transform 0.5s, box-shadow 0.5s, border-color 0.5s;
}

@for $i from 1 through 6 {
  .home-card:nth-child(#{$i}) {
    --color-shadow: var(--color-theme-#{$i}-shadow);
    --color-border: var(--color-theme-#{$i}-border);
  }
}

.home-card {
  border-color: hsl(from var(--color-border) h s 40%);
}

.home-card:focus,
.home-card:focus-visible,
.home-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 1rem var(--color-shadow);
  border-color: var(--color-border);
  outline: none;
}

a {
  --color-1: rgba(from var(--color-shadow) r g b/0.5);
  --color-2: rgba(from var(--color-border) r g b/0.25);
  background: linear-gradient(90deg, var(--color-1), var(--color-2));
}
</style>