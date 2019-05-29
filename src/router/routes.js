
const routes = [
  {
    path: '',
    component: () => import('layouts/ClientHeader.vue'),
    children: [
      { path: 'price', component: () => import('pages/Client/Price.vue') },
      { path: 'reservation', component: () => import('pages/Client/Reservation.vue') },
      { path: 'schedule', component: () => import('pages/Client/Schedule.vue') },
      { path: 'checkIn', component: () => import('pages/Employee/CheckingLugage.vue') },
      { path: 'createE', component: () => import('pages/Admin/CreateEmployee.vue') },
      { path: 'price/edit', component: () => import('pages/Admin/EditPrices.vue') },
      
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
