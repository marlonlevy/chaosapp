<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Upload Document</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-file-input
              variant="outlined"
              label="Select a file to upload"
              accept=".txt,.pdf,.docx"
              v-model="file"
              hide-details
            ></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-btn block variant="outlined" color="primary" @click="uploadFile">Upload</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th colspan="2"><h3>Available Files for Download</h3></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filesToDownload.length === 0">
              <td colspan="2">No files available.</td>
            </tr>
            <tr v-for="(file, idx) in filesToDownload.files" :key="idx">
              <td>{{ file }}</td>
              <td align="right">
                <v-btn small color="primary" @click="downloadFile(file)">Download</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row v-if="showAlert">
      <v-col>
        <v-alert
          :type="alertType"
          variant="tonal"
          density="comfortable"
          prominent
          dismissible
          v-model="showAlert"
        >
          {{ alertMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue'

import { useFileStore } from '@/stores/FileStore'

const file = ref(null)
const filesToDownload = ref([])
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

const fileStore = useFileStore()

const showStatus = (message, type = 'success') => {
  alertMessage.value = message
  alertType.value = type
  showAlert.value = true
}

const uploadFile = async () => {
  if (!file.value) {
    showStatus('Please select a file before uploading.', 'error')
    return
  }

  try {
    await fileStore.uploadFile(file.value)
    showStatus('File uploaded successfully.', 'success')
    await fileStore.fetchFiles()
    filesToDownload.value = fileStore.files
  } catch (error) {
    console.error('Error uploading file:', error)
    showStatus('Failed to upload file.', 'error')
  }
}

const downloadFile = async (fileId) => {
  try {
    await fileStore.downloadFile(fileId, fileId) // Using fileId as filename for simplicity
    showStatus('File downloaded successfully.', 'success')
  } catch (error) {
    console.error('Error downloading file:', error)
    showStatus('Failed to download file.', 'error')
  }
}

onMounted(() => {
  fileStore
    .fetchFiles()
    .then(() => {
      filesToDownload.value = fileStore.files
    })
    .catch((error) => {
      console.error('Error fetching files:', error)
      showStatus('Unable to load file list.', 'error')
    })
})
</script>
