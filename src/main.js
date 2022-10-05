// import { createApp } from "vue";
// import App from './App.vue';

// createApp(App).mount('#app');

import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
