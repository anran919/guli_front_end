import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: 'teacher',
    meta: { title: '讲师管理', icon: 'el-icon-magic-stick' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/teacher/list'),
        meta: { title: '讲师列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/teacher/add'),
        meta: { title: '添加讲师', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('@/views/teacher/add'),
        meta: { title: '修改讲师', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: 'subject',
    meta: { title: '课程分类管理', icon: 'el-icon-collection' },
    children: [
      {
        path: 'list',
        name: 'subject-list',
        component: () => import('@/views/subject/list'),
        meta: { title: '分类列表', icon: 'tree' }
      },
      {
        path: 'add',
        name: 'subject-add',
        component: () => import('@/views/subject/add'),
        meta: { title: '添加分类', icon: 'table' }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'course',
    meta: { title: '课程管理', icon: 'el-icon-reading' },
    children: [
      {
        path: 'list',
        name: 'course-list',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表', icon: 'form' }
      },
      {
        path: 'add',
        name: 'course-add',
        component: () => import('@/views/course/add'),
        meta: { title: '发布课程', icon: 'form', keepAlive: true }
      },
      {
        path: 'edit/:id',
        name: 'course-edit',
        component: () => import('@/views/course/add'),
        meta: { title: '编辑课程基本信息', icon: 'form' },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'course-chapter',
        component: () => import('@/views/course/chapter'),
        meta: { title: '编辑课程大纲', icon: 'form' },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'course-publish',
        component: () => import('@/views/course/publish'),
        meta: { title: '发布课程', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/list',
    name: 'banner',
    meta: { title: '轮播图管理', icon: 'el-icon-magic-stick' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/banner/list'),
        meta: { title: '轮播图列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/banner/add'),
        meta: { title: '添加轮播图', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('@/views/banner/add'),
        meta: { title: '修改轮播图', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    meta: {
      title: '滚动',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
