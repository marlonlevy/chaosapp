<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple home page for the Chaos App.</p>
        <div>{{ getNodes.length }} nodes available</div>
        <p>{{ getNodes }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

const resourceStore = useResourceStore()
const { getNodes } = storeToRefs(resourceStore)

onMounted(async () => {
  console.log('Home component mounted')
  await resourceStore.fetchNodes()
})
</script>
