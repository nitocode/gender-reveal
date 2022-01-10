import { createApp } from 'vue';
import { router } from "./router";
import { i18n } from "./i18n";
import App from './App.vue';

import './styles/fonts.css';
import './styles/index.css';

const app = createApp(App).use(router).use(i18n);

app.mount("#app");
