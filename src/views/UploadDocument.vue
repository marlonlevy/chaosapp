<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Upload Document</h1>
        <v-file-input
          label="Select a file to upload"
          accept=".txt,.pdf,.docx"
          v-model="file"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="uploadFile">Upload</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item v-for="(file, idx) in filesToDownload" :key="idx">
            <v-list-item-title>{{ file }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue'

import { useFileStore } from '@/stores/FileStore'

const file = ref(null)
const filesToDownload = ref([])

const fileStore = useFileStore()

const uploadFile = async () => {
  if (file.value) {
    const formData = new FormData()
    formData.append('file', file.value)

    try {
      await fileStore.uploadFile(formData)
      alert('File uploaded successfully')
      // Refresh the list of files after upload
      await fileStore.fetchFiles()
      filesToDownload.value = fileStore.files
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file')
    }
  } else {
    console.log('No file selected')
  }
}

onMounted(() => {
  // Fetch the list of uploaded files from the backend
  fileStore
    .fetchFiles()
    .then(() => {
      filesToDownload.value = fileStore.files
    })

    .catch((error) => {
      console.error('Error fetching files:', error)
    })
})
</script>
