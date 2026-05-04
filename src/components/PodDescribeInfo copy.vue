<template>
  <v-card class="mx-auto" max-width="500" variant="outlined" v-if="pod">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          {{ props.pod.status.phase }}
        </div>
        <div class="text-h6 mb-1">
          {{ props.pod.metadata.generate_name }}
        </div>
        <div class="text-caption text-medium-emphasis">
          Created: {{ formatDate(props.pod.metadata.creation_timestamp) }}
        </div>
      </div>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-text>
      <div class="mb-4">
        <div class="text-subtitle-2 mb-2">Labels</div>
        <v-chip-group>
          <v-chip v-for="(val, key) in props.pod.metadata.labels" :key="key" size="small">
            {{ key }}: {{ val }}
          </v-chip>
        </v-chip-group>
      </div>

      <div class="text-subtitle-2 mb-2">Containers</div>
      <v-list
        density="compact"
        v-if="
          !!props.pod.spec.containers &&
          props.pod.spec.containers.length === 0 &&
          !!props.pod.spec.init_containers &&
          props.pod.spec.init_containers.length > 0
        "
      >
        <v-list-item
          v-for="container in props.pod.spec.containers"
          :key="container.name"
          :title="container.name"
          :subtitle="container.image"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-package-variant-closed" color="primary"></v-icon>
          </template>
          <template v-slot:append>
            <v-chip size="x-small" variant="tonal">
              Port: {{ container.ports[0].containerPort }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-btn variant="text" color="primary" append-icon="mdi-chevron-right"> View Full Logs </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  pod: {
    type: Object,
    required: true,
    description: 'Kubernetes pod object with metadata, spec, and status',
  },
})

onMounted(() => {
  console.log('PodDescribeInfo mounted with pod:', props.pod)
})

const formatDate = (dateStr) => new Date(dateStr).toLocaleString()
</script>
