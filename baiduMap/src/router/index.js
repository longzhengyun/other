//先引入需要路由的文件
import index from '../pages/index'

export default [
  {
    path: '/index',
    component: index
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '*',
    redirect: '/index'
  }
]