import App from './App.vue';
import router from './router';
import pinia from './stores/index';
import { createApp } from 'vue';
import '@/styles/main.scss';

const app = createApp(App);

// Intégration des plugins globaux
app.use(pinia);
app.use(router);

app.mount('#app');
