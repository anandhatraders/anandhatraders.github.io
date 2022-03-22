import Customer from '@/components/customer/customerList.vue'
import CustomerEdit from '@/components/customer/customerEdit.vue'

import auth from './middleware/auth'

export default [{
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
}]
