import vue from 'vue'
import vueRouter from 'vue-router'
vue.use(vueRouter)

const login = () => import('components/login/login.vue');

const routes = [
    {path: '', redirect: '/login' },
    {name:'login', path: '/login', component: login },
]
const router = new vueRouter({
   routes
})

export default router