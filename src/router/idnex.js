import vue from 'vue'
import vueRouter from 'vue-router'
vue.use(vueRouter)

const Login = () => import('components/login/login.vue');
const Home = () => import('components/home/home.vue');
const Users = () => import('components/users/users.vue');
const routes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'home',
        path: '/',
        component: Home,
        children: [
            {
                name: 'users',
                path: '/users',
                component: Users
            }
        ]
    },
]
const router = new vueRouter({
    routes
})

export default router