import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Adjust path if necessary
import './assets/tailwind.css' // Correct path to the Tailwind CSS file
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store) // Add this line to integrate Vuex
app.mount('#app')
