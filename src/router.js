import Vue from 'vue';
import Router from 'vue-router';
import Store from './store';


Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue'),
    meta: {},
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
    meta: {},
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/Register.vue'),
    meta: {},
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('./views/Profile.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    meta: {},
  },
  {
    path: '/blog/',
    name: 'blog',
    component: () => import('./views/Blog.vue'),
    meta: {},
  },
  {
    path: '/blog/:id',
    name: 'single',
    component: () => import('./views/Single.vue'),
    meta: {},
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('./views/Category.vue'),
    meta: {},
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(Store.state.AuthUser.authenticated);

  if (to.meta.requireAuth) {
    if (Store.state.AuthUser.authenticated || localStorage.getItem('token')) {
      return next();
    }
    return next({ name: 'login' });
  }

  return next();
});

export default router;
