import { createRouter, createWebHashHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ArticleDetail from "../views/ArticleDetail.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'PageTwo', component: Login },
    { path: '/articles/:id', component: ArticleDetail }
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})

export default router;