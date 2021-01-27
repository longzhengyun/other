import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
    { 'path': '/', name: 'home', component: () => import('./../components/Home.vue') },
    { 'path': '/detail/:id', name: 'detail', component: () => import('./../components/Detail.vue') },
]

export default createRouter({
    history: createMemoryHistory(),
    routes: routes,
})