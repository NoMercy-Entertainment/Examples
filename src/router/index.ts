import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/router/routes";

const router = createRouter({
	// @ts-ignore
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
});

router.afterEach((to, from) => {
	const toDepth = to.path.split('/').length;
	const fromDepth = from.path.split('/').length;
	to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});

export default router;