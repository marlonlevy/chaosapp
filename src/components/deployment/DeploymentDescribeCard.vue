<template>
  <v-card flat>
    <v-card-title><v-icon class="mr-2">mdi-application</v-icon>Deployment Details</v-card-title>
    <v-divider></v-divider>
    <v-table comfortable>
      <tbody>
        <tr>
          <td width="150px"><strong>Name:</strong></td>
          <td>{{ deployment.name }}</td>
        </tr>
        <tr>
          <td><strong>Namespace:</strong></td>
          <td>{{ deployment.namespace }}</td>
        </tr>
        <tr>
          <td><strong>Replicas:</strong></td>
          <td>{{ deployment.status.available_replicas + '/' + deployment.status.replicas }}</td>
        </tr>
        <tr>
          <td><strong>CreationTimeStamp:</strong></td>
          <td>{{ deployment.metadata.creation_timestamp }}</td>
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
              :annotations-object="deployment.metadata.annotations"
            ></resource-annotation-chips>
          </td>
        </tr>
        <!-- Add more fields as needed -->
      </tbody>
    </v-table>

    <v-card-text>
      <!-- Deployment content goes here -->
      <h3>Conditions</h3>
      <resource-condition-table
        v-if="deployment?.status?.conditions"
        :items="deployment.status.conditions"
      ></resource-condition-table>
    </v-card-text>
  </v-card>
</template>
<script setup>
import ResourceConditionTable from '../ui/ResourceConditionTable.vue'
import ResourceLabelChips from '../ui/ResourceLabelChips.vue'
import ResourceAnnotationChips from '../ui/ResourceAnnotationChips.vue'

defineProps({
  deployment: {
    type: Object,
    required: true,
  },
})
</script>
