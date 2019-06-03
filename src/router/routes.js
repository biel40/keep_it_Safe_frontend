
const routes = [
  {
    path: '',
    component: () => import('layouts/ClientHeader.vue'),
    children: [
      { path: 'price', component: () => import('pages/Client/Price.vue') },
      { path: 'reservation', component: () => import('pages/Client/Reservation.vue') },
      { path: 'schedule', component: () => import('pages/Client/Schedule.vue') },
      { path: 'employee/invoice/check-in', component: () => import('pages/Employee/CheckingLugage.vue') },
      { path: 'employee/invoice/validate', component: () => import('pages/Employee/ValidateInvoice.vue') },
      { path: 'employee/invoice/edit', component: () => import('pages/Commond/EditInvoice.vue') },
      { path: 'admin/user/create', component: () => import('pages/Admin/CreateEmployee.vue') },
      { path: 'admin/price/edit', component: () => import('pages/Admin/EditPrices.vue') },
      { path: 'admin/invoice/edit', component: () => import('pages/Commond/EditInvoice.vue') },
      
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
