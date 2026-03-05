<script setup lang="ts">
import {computed, ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";

import HomeCorner from "@/components/HomeCorner.vue";
import GithubCorner from "@/components/GithubCorner.vue";
import TutorialVideoPlayer from "@/components/TutorialPlayer/TutorialVideoPlayer.vue";

defineProps({
	theme: {
		type: String,
		default: 'theme-1',
	},
});

const route = useRoute();
const router = useRouter();

const steps = [
	{ num: 1, title: 'Shell & Layout' },
	{ num: 2, title: 'Play / Pause' },
	{ num: 3, title: 'Progress Bar' },
	{ num: 4, title: 'Time & Skip' },
	{ num: 5, title: 'Volume' },
	{ num: 6, title: 'Title Bar' },
	{ num: 7, title: 'Fullscreen & Speed' },
	{ num: 8, title: 'Selectors' },
	{ num: 9, title: 'Seek Preview' },
	{ num: 10, title: 'Full Plugin' },
];

const currentStep = ref(1);
const playerKey = ref(0);
const videoPlayerRef = ref<{ player: any }>();

onMounted(() => {
	const stepParam = Number(route.query.step);
	if (stepParam >= 1 && stepParam <= 10) {
		currentStep.value = stepParam;
	}
});

function selectStep(step: number) {
	currentStep.value = step;
	playerKey.value++;
	router.replace({ query: { step: String(step) } });
}
</script>

<template>
	<HomeCorner :style="`--color-theme: var(--color-${theme}-shadow)`" />
	<GithubCorner :style="`--color-theme: var(--color-${theme}-shadow)`" />

	<div class="w-full flex items-center justify-center px-4 sm:px-8 mt-6 text-pretty landscape:hidden">
		<h1 class="text-2xl sm:text-4xl font-bold text-center py-2">
			Tutorial — PlayerUIPlugin
		</h1>
	</div>

	<!-- Step selector -->
	<div class="w-full flex justify-center px-4 sm:px-8 mb-4">
		<div class="flex flex-wrap gap-1.5 sm:gap-2 justify-center max-w-[80rem]">
			<button
				v-for="step in steps"
				:key="step.num"
				@click="selectStep(step.num)"
				class="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border"
				:class="currentStep === step.num
					? 'bg-white text-neutral-900 border-white shadow-lg shadow-white/20'
					: 'bg-neutral-800/60 text-neutral-400 border-neutral-700 hover:bg-neutral-700/80 hover:text-neutral-200 hover:border-neutral-500'"
			>
				<span
					class="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[10px] sm:text-xs font-bold"
					:class="currentStep === step.num
						? 'bg-neutral-900 text-white'
						: 'bg-neutral-700 text-neutral-400'"
				>{{ step.num }}</span>
				<span class="hidden sm:inline">{{ step.title }}</span>
			</button>
		</div>
	</div>

	<div id="container"
		class="flex flex-col justify-center items-center w-full px-4 sm:px-16 flex-1 max-h-[calc(100vh-18rem)] min-h-[calc(100vh-18rem)] overflow-clip landscape:mt-4">
		<main id="wrapper"
			class="sm:max-h-fit relative overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow-lg flex flex-col h-full w-full aspect-video sm:max-w-[120rem] border border-neutral-700 p-2 sm:p-4 z-0">
			<TutorialVideoPlayer :key="playerKey" ref="videoPlayerRef" :step="currentStep" />
		</main>
	</div>
</template>
