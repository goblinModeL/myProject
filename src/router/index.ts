import { createMemoryHistory, createRouter } from 'vue-router'

import hello from '../components/HelloWorld.vue'

const routes = [
    { path: '/', component: () =>hello, },
    { path: '/ces', component: () => import('../components/cesh.vue'), },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
export default router