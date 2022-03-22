import Profile from '../components/users/profile.vue'
import createUser from '../components/users/createUser.vue'



import auth from './middleware/auth'


export default [
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            middleware: [
                auth
            ]
        },
    },
    {
        path: '/user/add',
        name: 'createUser',
        component: createUser,
        meta: {
            middleware: [
                auth
            ]
        }
    },
]