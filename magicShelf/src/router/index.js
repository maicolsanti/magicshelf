import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import SearchView from '../views/search/SearchView.vue'
import ProductsView from '../views/products/ProductsView.vue'
import ProfileView from '../views/profile/ProfileView.vue'
import AboutView from '../views/about_us/AboutView.vue'
import LoginCostumerView from '../views/login/LoginCostumerView.vue'
import RegistrationView from '@/views/login/RegistrationView.vue'
import LoginSupplierView from '@/views/login/LoginSupplierView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/loginCostumer',
      name: 'loginCostumer',
      component: LoginCostumerView
    },
    {
      path: '/loginSupplier',
      name: 'loginSupplier',
      component: LoginSupplierView
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView
    }
  ]
})

export default router
