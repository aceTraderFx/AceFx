import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import RulePage from './pages/RulePage.vue'
import BasicPage from './pages/BasicPage.vue'
import SoftwarePage from './pages/SoftwarePage.vue'
import WithdrawalPage from './pages/WithdrawalPage.vue'
import MaterialPage from './pages/MaterialPage.vue'
import FreeCoursePage from './pages/FreeCoursePage.vue'
import TestPage from './pages/test.vue'

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/rule', component: RulePage, name: 'rule' },
  { path: '/basic', component: BasicPage, name: 'basic' },
  { path: '/software', component: SoftwarePage, name: 'software' },
  { path: '/withdrawal', component: WithdrawalPage, name: 'withdrawal' },
  { path: '/material', component: MaterialPage, name: 'material' },
  { path: '/freecourse', component: FreeCoursePage, name: 'freecourse' },
  { path: '/test', component: TestPage, name: 'test' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
