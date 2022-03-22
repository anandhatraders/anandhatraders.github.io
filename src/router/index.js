import Vue from 'vue'
import Router from 'vue-router'
import NotFoundPage from '@/components/common/notFoundPage.vue'
import store from '@/store'

import authRoutes from './authRoutes'
import anandhatraders from './anandhatraders'
import stocksOrders from './stocksOrders'
import middlewarePipeline from './middlewarePipeline'

Vue.use(Router)

const router = new Router({
  routes: [
    ...authRoutes,
    ...anandhatraders,
    ...stocksOrders,
    {
      path: '*',
      name: '404page',
      component: NotFoundPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
