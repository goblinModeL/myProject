import { createApp } from 'vue'
import '@/assets/css/page.css'
import  {createPinia} from 'pinia'
import router from '@/router/index'
import App from './App.vue'
import 'element-plus/dist/index.css'
import  httpRequest from './utils/httpRequest'
const app = createApp(App)
const pinia =createPinia()
app.config.globalProperties.$http=httpRequest
app.use(router)
app.use(pinia)
app.mount('#app')
