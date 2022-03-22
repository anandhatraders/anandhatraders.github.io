import Signin from '../components/auth/signin.vue'
import SignOut from '../components/auth/signout.vue'

import guest from './middleware/guest'

export default [
    {
        path: '/signin',
        name: 'signin',
        component: Signin,
        meta: {
            middleware: [
                guest
            ]
        }
    },

    {
        path: '/signout',
        name: 'signout',
        component: SignOut,
    },
]
