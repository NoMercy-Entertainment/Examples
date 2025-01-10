<script setup lang="ts">
import {defineEmits, onMounted, onUnmounted, type PropType, Ref, ref} from "vue";

import {Option} from "@/types/types";

defineProps({
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

defineEmits(["goBack"]);

const activeSubmenuIndex = ref(0);
const currentMenu = ref<string | null>();

const handleItemClick = (option: Option) => {
  if (option.action) {
    option.action();
  } else if (option.options) {
    currentMenu.value = option.label;
    activeSubmenuIndex.value = 1;
  }
};

const handleGoBack = () => {
  activeSubmenuIndex.value = 0;
  setTimeout(() => {
    currentMenu.value = null;
  }, 100);
};

const opacity = ref(0);

onMounted(() => {
  setTimeout(() => {
    opacity.value = 1;
  }, 0);
});

onUnmounted(() => {
  opacity.value = 0;
  currentMenu.value = null;
});

</script>

<template>
  <div class="relative w-full h-full z-10">
    <div
        class="absolute w-full h-full transition-all duration-300 top-0 flex flex-col"
        :style="`
          transform: translateX(calc(-${(activeSubmenuIndex * 100)}% - ${activeSubmenuIndex}rem));
          opacity: ${opacity};
        `"
    >
      <button v-if="backButton"
          @click="$emit('goBack')"
          class="py-1.5 px-3 flex gap-2 items-center bg-gradient-to-r from-neutral-700 to-neutral-700 text-white rounded-md cursor-pointer transition-transform duration-300 text-left">
        <span class="material-icons text-white">arrow_back</span>
        <span>Back</span>
      </button>

      <ul class="flex flex-col w-full h-available gap-2 overflow-y-auto overflow-x-hidden mt-2">

        <template
            v-for="option in options"
            :key="option.label">

          <li
              class="py-1.5 px-3 theme-button flex gap-2 items-center bg-gradient-to-r  rounded-md cursor-pointer mr-1 text-left"
              @click="handleItemClick(option)"
          >
            <span v-if="option.active" class="material-icons text-white w-5">checkmark</span>
            <span
                :class="{
                  'ml-7': !option.active && option.active !== undefined,
                }"
            >{{ option.label }}</span>
          </li>

          <div v-if="option.options && option.label === currentMenu"
               class="submenu-container absolute top-0 left-full w-full h-available ml-4 overflow-clip">
            <Menu
                v-bind="option"
                :options="option.options as Option[]"
                @goBack="handleGoBack"
                @goForward="handleItemClick"
                :backButton="true"
            />
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.material-icons {
  font-size: 1.2rem;
}
</style>