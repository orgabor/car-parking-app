import '@/assets/main.css'
import "@/bootstrap.js";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ValidationError from "@/components/ValidationError.vue";
import App from './App.vue'
import router from './router'
import IconSpinner from "@/components/IconSpinner.vue";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("IconSpinner", IconSpinner);
app.component("ValidationError", ValidationError);
//app.component("PasswordWithTextSwitcher", PasswordWithTextSwitcher);
app.mount('#app')
