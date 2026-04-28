import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue')
},
{ path: '/nodes', name: 'Nodes', component: () => import('../views/NodeIndex.vue') },
{ path: '/pods', name: 'Pods', component: () => import('../views/PodIndex.vue') },
{path: '/deployments', name: 'Deployments', component: () => import('../views/DeploymentIndex.vue') },
{path: '/services', name: 'Services', component: () => import('../views/ServicesIndex.vue') },
{path: '/persistentvolumeclaims', name: 'PersistentVolumeClaims', component: () => import('../views/PersistentVolumeClaimIndex.vue') },
{path: '/persistentvolumes', name: 'PersistentVolumes', component: () => import('../views/PersistentVolumeIndex.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
