<script setup lang="ts">

import {computed} from "vue";


</script>

<template>
  <router-link to="/"  class="home-corner"
     aria-label="Back to home">
    <svg viewBox="0 0 250 250">
      <g clip-path="url(#clip0_1078_4136)">
        <path d="M250 0L0 250V0H250Z" fill="var(--color-theme)"/>
        <path d="M115.845 134.281L92.5601 110.996L107.996 95.5605L131.28 118.845L150.575 99.5512L119.528 68.5045L131.105 56.9279L57.5886 60.5891L53.9275 134.105L65.5041 122.529L96.5507 153.575L115.845 134.281Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_1078_4136">
          <rect width="250" height="250" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </router-link>
</template>

<style scoped>

a {
  color: white;
  text-decoration: none;
}

.home-corner {
  position: absolute;
  z-index: 40;
  top: 0;
  left: 0;
  border-bottom: 0;
  text-decoration: none;
}

.home-corner svg {
  height: 70px;
  width: 70px;
}

</style>