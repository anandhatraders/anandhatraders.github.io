import Signin from '@/components/auth/signIn.vue'
import SignOut from '@/components/auth/signOut.vue'

import guest from './middleware/guest'

export default [{
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
  component: SignOut
}]
