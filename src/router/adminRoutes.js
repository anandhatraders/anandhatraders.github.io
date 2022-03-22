import AdminUserUpdate from '../components/admin/adminUserUpdate.vue'
import AdminAllUser from '../components/admin/adminAllUser.vue'

import auth from './middleware/auth'
import isAdmin from './middleware/isAdmin'


export default [{
    path: '/admin/users/all',
    name: 'admin-all-user',
    component: AdminAllUser,
    meta: {
        middleware: [
            auth,
            isAdmin
        ]
    }
},
{
    path: '/admin/user/update',
    name: 'user-delete',
    component: AdminUserUpdate,
    meta: {
        middleware: [
            auth,
            isAdmin
        ]
    }
}]
