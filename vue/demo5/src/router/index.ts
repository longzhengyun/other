import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('./../pages/Home.vue')
const DetailPage = () => import('./../pages/Detail.vue')

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/detail/:id', name: 'Detail', component: DetailPage },
]

export default createRouter({
    history: createWebHistory('/'),
    routes,
})