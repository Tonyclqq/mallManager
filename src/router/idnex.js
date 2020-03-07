import vue from 'vue'
import vueRouter from 'vue-router'
import {Message} from 'element-ui'
vue.use(vueRouter)

const Login = () => import('components/login/login.vue');
const Home = () =>  import('components/home/home.vue');
const Users = () => import('components/users/users.vue');
const Right = () => import('components/rights/right.vue');

const Role = () => import('components/rights/role.vue');
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
            },
            {
                name:'right',
                path:'/rights',
                component:Right
            },
            {
                name:'roles',
                path:'/roles',
                component:Role
            }
        ]
        
    },
   
]
const router = new vueRouter({
    routes
})

//在路由配置生效之前 同意判断token
//路由守卫在路由配置生效之前
// 路由/导航 守卫
//to  要去的路由配置
//from 当前的路由配置
//如果要去的是登录  --》next()
//如果要去的不是登录
//判断token
/*
    如果token没有   -》login
    如果有   ->next()
*/
router.beforeEach((to,from,next)=>{
    if(to.path === '/login'){
        next()
    } else {
        const token = localStorage.getItem('token')
        if(!token){
            Message.warning('请先登录')
            router.push({name:'login'})
        } else {
            next()
        }
        
    }
})
export default router