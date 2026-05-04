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
          <td>{{ JSON.stringify(deployment.metadata.labels) }}</td>
        </tr>
        <tr>
          <td><strong>Annotations:</strong></td>
          <td>{{ JSON.stringify(deployment.metadata.annotations) }}</td>
        </tr>
        <!-- Add more fields as needed -->
      </tbody>
    </v-table>

    <v-card-text>
      <!-- Deployment content goes here -->
      <h3>Conditions</h3>
      <v-list>
        <v-list-item v-for="(condition, idx) in deployment.status.conditions" :key="idx">
          <v-list-item-title>{{ condition.type }} </v-list-item-title>
          <v-list-item-subtitle>{{ condition.message }}</v-list-item-subtitle>
          <template v-slot:append>
            <v-list-item-action
              ><v-chip>{{ condition.status }}</v-chip></v-list-item-action
            >
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script setup>
defineProps({
  deployment: {
    type: Object,
    required: true,
  },
})
</script>
