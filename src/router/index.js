import { createRouter, createWebHashHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ArticleDetail from "../views/ArticleDetail.vue";
import SignUp from "../views/SignUp.vue";

const routes = [
    { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: Login },
    { path: '/sign-up', name: 'SignUp', component: SignUp },
    { path: '/articles/:id', name: 'ArticleDetail', component: ArticleDetail, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('userToken')

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})

export default router;
