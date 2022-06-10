import {createRouter, createWebHistory} from 'vue-router'
import {hasLogin} from "@/api/user";

const routes = [
    // 首页
    {
        path: '/',
        component: () => import('../views/Home'),
        name: 'Root'   // 源路径
    },
    //首页
    {
        path: '/home',
        component: () => import('../views/Home.vue'),
        name: 'Home'
    },
    // 分类页
    {
        path: '/category/:id',
        component: () => import('../views/Category.vue'),
        name: 'Category'
    },
    {
        path: '/category',
        redirect: '/category/1'
    },
    {
        path: '/article',
        redirect: '/article/1'
    },
    // 文章详情
    {
        path: '/article/:aid',
        component: () => import('../views/DetailArticle.vue'),
        name: 'Article'
    },

    //分享详情
    {
        path: '/reward',
        component: () => import('../views/Reward.vue'),
        name: 'Reward'
    }, //赞赏
    {
        path: '/friend-link',
        component: () => import('../views/FriendLink.vue'),
        name: 'FriendsLink'
    }, //友链
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
    }, //注册登录
    // 后台管理中心
    {
        path: '/admin',
        component: () => import('../views/Admin.vue'),
        redirect: '/admin/home',
        children: [
            {path: 'home', component: () => import('../components/admin/AdminHome.vue')},
            {path: 'edit', component: () => import('../components/admin/EditArticle.vue')},
            {path: 'edit/:id', component: () => import('../components/admin/EditArticle.vue')},
            {path: 'comment', component: () => import('../components/admin/Comment.vue')},
            {path: 'user', component: () => import('../components/admin/AdminUserList.vue')},
            {path: 'user/:id', component: () => import('../components/admin/AdminUserInfo.vue')},
            {path: 'all-article', component: () => import('../components/admin/AdminArticleList.vue')},
            {path: 'all-category', component: () => import('../components/admin/CategoryList.vue')},
            {path: 'friend-link', component: () => import('../components/admin/AdminFriendLink.vue')},
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
