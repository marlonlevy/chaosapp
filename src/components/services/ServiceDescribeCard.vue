<template>
  <v-card class="pa-4">
    <v-row align="center" justify="space-between">
      <v-col cols="8">
        <div class="d-flex align-center">
          <v-avatar class="mr-3" color="blue lighten-4">
            <v-icon color="blue darken-2">mdi-cloud</v-icon>
          </v-avatar>
          <div>
            <div class="text-h6">{{ service?.metadata?.name }}</div>
            <div class="text-caption grey--text">
              {{ service?.metadata?.namespace }} • {{ formattedCreation }}
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-chip small color="grey lighten-3" class="ma-0">{{
          service?.spec?.type || 'ClusterIP'
        }}</v-chip>
      </v-col>
    </v-row>

    <v-divider class="my-3" />

    <v-row>
      <v-col cols="12" md="6">
        <div class="mb-2"><strong>Cluster IP</strong></div>
        <div>{{ service?.spec?.clusterIP || 'None' }}</div>

        <div class="mt-4 mb-2"><strong>External IPs</strong></div>
        <div
          v-if="
            service?.status?.load_balancer?.ingress && service?.status.load_balancer.ingress.length
          "
        >
          <div v-for="(ing, idx) in service?.status?.load_balancer?.ingress" :key="idx">
            {{ ing.ip || ing.hostname }}
          </div>
        </div>
        <div v-else>N/A</div>

        <div class="mt-4 mb-2"><strong>Selectors</strong></div>
        <div v-if="service?.spec?.selector">
          <v-chip v-for="(val, key) in service?.spec?.selector" :key="key" class="ma-1" small>
            {{ key }}={{ val }}
          </v-chip>
        </div>
        <div v-else>N/A</div>
      </v-col>

      <v-col cols="12" md="6">
        <div class="mb-2"><strong>Ports</strong></div>
        <v-list dense>
          <v-list-item v-for="(p, idx) in service?.spec?.ports || []" :key="idx">
            <div>
              <strong>{{ p.port }}</strong>
              <span class="grey--text">→ target: {{ p.targetPort || '-' }}</span>
            </div>
            <div class="text-caption grey--text">protocol: {{ p.protocol || 'TCP' }}</div>

            <v-list-item-action>
              <v-chip small outlined>{{ p.name || p.port + '/' + (p.protocol || 'TCP') }}</v-chip>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-if="!(service?.spec?.ports && service?.spec.ports.length)"> </v-list-item>
        </v-list>

        <div class="mt-4 mb-2"><strong>Annotations</strong></div>
        <div v-if="service?.metadata?.annotations">
          <div
            v-for="(val, key) in service?.metadata?.annotations"
            :key="key"
            class="text-caption grey--text"
          >
            {{ key }}: {{ val }}
          </div>
        </div>
        <div v-else>N/A</div>
      </v-col>
    </v-row>
  </v-card>
  <!--<pre>{{ service }}</pre>-->
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
})

const formattedCreation = computed(() => {
  const ts =
    props.service?.metadata?.creation_timestamp || props.service?.metadata?.creationTimestamp
  if (!ts) return 'Unknown'
  try {
    const d = new Date(ts)
    return d.toLocaleString()
  } catch (e) {
    return ts
  }
  //return props.service?.metadata?.creationTimestamp || 'Unknown'
})
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
