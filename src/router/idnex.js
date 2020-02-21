import vue from 'vue'
import vueRouter from 'vue-router'
vue.use(vueRouter)

const Login = () => import('components/login/login.vue');
const Home = () => import('components/home/home.vue');
const routes = [
    {name:'login', path: '/login', component: Login },
    {name:'home', path: '/', component: Home },
]
const router = new vueRouter({
   routes
})

export default router