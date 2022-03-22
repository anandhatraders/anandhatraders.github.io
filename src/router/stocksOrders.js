import Stocks from '@/components/stocks/stockList.vue'
import StockAdd from '@/components/stocks/stocksAdd.vue'
import StockUpdate from '@/components/stocks/stockUpdate.vue'
import PlaceOrder from '@/components/orders/placeOrder.vue'
import OrdersList from '@/components/orders/ordersList.vue'
import DetailOrder from '@/components/orders/detailOrder.vue'

import auth from './middleware/auth'
import isOwner from './middleware/isOwner'

export default [
  {
    path: '/',
    name: 'stocks',
    component: Stocks,
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/stock-create',
    name: 'create-stocks',
    component: StockAdd,
    meta: {
      middleware: [
        auth,
        isOwner
      ]
    }
  },
  {
    path: '/stock-update',
    name: 'update-stock',
    component: StockUpdate,
    meta: {
      middleware: [
        auth,
        isOwner
      ]
    }
  },
  {
    path: '/place-order',
    name: 'place-order',
    component: PlaceOrder,
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/orders',
    name: 'all-orders',
    component: OrdersList,
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/invoice/item',
    name: 'detail-invoice',
    component: DetailOrder,
    meta: {
      middleware: [
        auth
      ]
    }
  }
]
