import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("@/views/Home.vue")
  },
  {
  
  
    path:"/callback",
    component: () => import("@/views/callback.vue")
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
  
  
    path:"/download",
    component: () => import("@/views/download.vue")
  },
  
  {
  
  
    path:"/test",
    component: () => import("@/components/staff_show.vue")
  },
  {
  
  
    path:"/banlist",
    component: () => import("@/views/show_ban.vue")
  },
  {
  
  
    path:"/*",
    component: () => import("@/views/error.vue")
  },
  
]

const router = new VueRouter({
  routes
})


export default router
