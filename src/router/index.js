import {createRouter, createWebHistory} from 'vue-router'
import {hasLogin} from "@/api/user";

const routes = [
    {
        path: '/',
        component: () => import('../views/Home'),
        name: 'Home1'   // 源路径
    }, //首页
    {
        path: '/Home',
        component: () => import('../views/Home.vue'),
        name: 'Home'
    }, //首页
    {
        path: '/Share',
        component: () => import('../views/Share.vue'),
        name: 'Share'
    }, //分类
    {
        path: '/article',
        redirect: '/article/1'
    },
    // 文章详情
    {
        path: '/article/:aid',
        component: () => import('../views/DetailArticle.vue'),
        name: 'DetailArticle'
    }, //分享详情
    {
        path: '/Reward',
        component: () => import('../views/Reward.vue'),
        name: 'Reward'
    }, //赞赏
    {
        path: '/FriendsLink',
        component: () => import('../views/FriendsLink.vue'),
        name: 'FriendsLink'
    }, //友链
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
    }, //注册登录
    {
        path: '/user-info',
        component: () => import('../views/UserInfo.vue'),
        name: 'UserInfo'
    },
    // 后台管理中心
    {
        path: '/admin',
        component: () => import('../views/Admin.vue'),
        redirect: '/admin/home',
        children: [
            {path: 'home', component: () => import('../views/admin/AdminHome.vue')},
            {path: 'all-article', component: () => import('../views/admin/AllArticles.vue')},
            {path: 'new-article', component: () => import('../views/admin/NewArticle.vue')},
            {path: 'comment', component: () => import('../views/admin/Comment.vue')},
            {path: 'all-user', component: () => import('../views/admin/AllUser.vue')},
            {path: 'user-info', component: () => import('../views/admin/UserInfo.vue')},
            {path: 'all-category', component: () => import('../views/admin/AllCategory.vue')}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            let top;
            if (window.innerWidth >= 700) {
                top = 676
            } else {
                top = 267
            }
            return {
                x: 0,
                y: top
            }
        }
    },
    routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
    // 1. 判断范围路径是否是后台页面
    if (to.path.startsWith("/admin")) {
        // 2. 若是后台页面，首先判断用户是否登陆
        hasLogin().then(() => {
            next();
        }).catch(() => {
            next("/login");
        })
    } else {
        // 3. 非后台页面直接放行
        next();
    }
});


export default router