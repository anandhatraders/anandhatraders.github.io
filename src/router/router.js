import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import authRoutes from './authRoutes'
import anandhatraders from './anandhatraders'
import adminRoutes from './adminRoutes'
import stocks_orders from './stocks_Orders'
import userRoutes from './userRoutes'

import Notfoundpage from '../components/common/notFoundPage.vue'

import middlewarePipeline from './middlewarePipeline'

Vue.use(Router)

const router = new Router({
    mode: hashed,
    routes: [
        ...authRoutes,
        ...anandhatraders,
        ...adminRoutes,
        ...stocks_orders,
        ...userRoutes,
        {
            path: '*',
            name: '404page',
            component: Notfoundpage,
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
