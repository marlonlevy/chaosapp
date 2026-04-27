import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue')
},
{ path: '/nodes', name: 'Nodes', component: () => import('../views/NodeIndex.vue') },
{ path: '/pods', name: 'Pods', component: () => import('../views/PodIndex.vue') },
{path: '/deployments', name: 'Deployments', component: () => import('../views/DeploymentIndex.vue') }]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
