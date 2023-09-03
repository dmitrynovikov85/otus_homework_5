import router from './router/router.js';
import './style.css'
import { createApp } from 'vue';
import { Field, Form, ErrorMessage, configure } from 'vee-validate';
import App from './App.vue';
import { createPinia } from 'pinia'

configure({
    validateOnInput: true,
});
const pinia = createPinia()
const app = createApp(App);
app.component('Field', Field);
app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);
app.use(router).use(pinia).mount('#app');