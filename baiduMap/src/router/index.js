//先引入需要路由的文件
import index from '../pages/index'
import tradeArea from '../pages/tradeArea'
import detail from '../pages/detail'

export default [
  {
    path: '/index',
    component: index
  },
  {
    path: '/tradeArea',
    component: tradeArea
  },
  {
    path: '/tradeArea/:id',
    component: detail
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