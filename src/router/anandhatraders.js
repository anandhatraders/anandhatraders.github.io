import Customer from '../components/customer/customer.vue'
import CustomerEdit from '../components/customer/customerEdit.vue'
import ChangePassword from '../components/users/changePassword.vue'

import auth from './middleware/auth'


export default [
    {
        path: '/change-password',
        name: 'changePassword',
        component: ChangePassword,
        meta: {
            middleware: [
                auth
            ]
        },
    },
    {
        path: '/customers',
        name: 'customer-List',
        component: Customer,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/customer/edit',
        name: 'customerEdit',
        component: CustomerEdit,
        meta: {
            middleware: [
                auth
            ]
        }
    }
]
