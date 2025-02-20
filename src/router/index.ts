import { createWebHistory, createRouter } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

// import hello from '@/components/HelloWorld.vue'
import index from '@/views/index.vue'
import antiShakeThrottling from '@/components/methods/antiShakeThrottling.vue'
import pinia from '@/components/methods/storeDemo.vue'
const routes = [
    { path: '/', component: index, meta: { title: "首页" ,isAuth: true }},
       { path: '/ces', component: () => import('@/components/cesh.vue'),
        meta: { title: "测试页面" ,isAuth: true },
        beforeEnter:(_to:RouteLocationNormalized, _from:RouteLocationNormalized, next:NavigationGuardNext) => {
            console.log('这是页面路由独享守卫')
            next()
        }
},
      { path: '/antiShakeThrottling', component: antiShakeThrottling, meta: { title: "防抖节流" ,isAuth: true }},
    { path: '/pinia', component: pinia, meta: { title: "pinia" ,isAuth: true }},
    { path: '/pinias', component: () => import('@/components/chatRoom/index.vue'), meta: { title: "pinia" ,isAuth: true }},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
//全局路由守卫
router.beforeEach((_to, _from, next) => {
     console.log('这是全局路由前置守卫')

    next()
})
router.afterEach((to, from, next) => {
    console.log('这是全局路由后置守卫')
    console.log(to, from, next)

})
export default router