import { RouteRecordRaw } from 'vue-router';



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/page-layout/page-layout.vue'),
    meta: {
      authCheck: true,
    },
    children: [
      {
        path: '',
        name: 'home',
        redirect: { name: 'index' },
      },
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/home/home.vue'),
        meta: {
          title: '主页',
          cacheableMenu: true,
          permission: 'page.home'
        },
      },
    ]
  }
]

export default routes;