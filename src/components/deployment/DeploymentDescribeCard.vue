<template>
  <v-card flat>
    <v-card-title><v-icon class="mr-2">mdi-application</v-icon>Deployment Details</v-card-title>
    <v-divider></v-divider>
    <v-table comfortable>
      <tbody>
        <tr>
          <td width="150px"><strong>Name:</strong></td>
          <td>{{ deployment.metadata.name }}</td>
        </tr>
        <tr>
          <td><strong>Namespace:</strong></td>
          <td>{{ deployment.metadata.namespace }}</td>
        </tr>
        <tr>
          <td><strong>Replicas:</strong></td>
          <td>{{ deployment.status.availableReplicas + '/' + deployment.status.replicas }}</td>
        </tr>
        <tr>
          <td><strong>CreationTimeStamp:</strong></td>
          <td>{{ deployment.metadata.creationTimestamp }}</td>
        </tr>
        <tr>
          <td><strong>Labels:</strong></td>
          <td>
            <resource-label-chips
              :labels-object="deployment.metadata.labels"
            ></resource-label-chips>
          </td>
        </tr>
        <tr>
          <td><strong>Annotations:</strong></td>
          <td>
            <resource-annotation-chips
              size="x-small"
              :annotations-object="deployment.metadata.annotations"
            ></resource-annotation-chips>
          </td>
        </tr>
        <!-- Add more fields as needed -->
      </tbody>
    </v-table>

    <v-card-text>
      <v-tabs v-model="deploymentTab" bg-color="transparent" color="primary" grow>
        <v-tab value="containers">Containers</v-tab>
        <v-tab value="conditions">Conditions</v-tab>
      </v-tabs>
      <v-window v-model="deploymentTab">
        <v-window-item value="containers">
          <v-list lines="Two">
            <v-list-item
              v-for="(container, idx) in deployment.spec.template.spec.containers"
              :key="idx"
            >
              <v-list-item-title>{{ container.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ container.image }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-chips v-for="(port, pnum) in container.ports" :key="pnum">{{
                  port.protocol + '/' + port.containerPort
                }}</v-chips>
              </template>
            </v-list-item>
          </v-list>
        </v-window-item>
        <v-window-item value="conditions">
          <resource-condition-table
            v-if="deployment?.status?.conditions"
            :items="deployment.status.conditions"
          ></resource-condition-table>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>

  <!-- <span class="text-label-small text-green">{{ deployment }}</span>-->
</template>
<script setup>
import { ref } from 'vue'
import ResourceConditionTable from '../ui/ResourceConditionTable.vue'
import ResourceLabelChips from '../ui/ResourceLabelChips.vue'
import ResourceAnnotationChips from '../ui/ResourceAnnotationChips.vue'

const deploymentTab = ref('')

defineProps({
  deployment: {
    type: Object,
    required: true,
  },
})
</script>
