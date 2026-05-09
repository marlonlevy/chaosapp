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
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
const file = ref(null)
const uploadFile = async () => {
  if (file.value) {
    const formData = new FormData()
    formData.append('file', file.value)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (response.ok) {
        console.log('Upload successful:', result.message)
        // Optionally, show a success message to the user
      } else {
        console.error('Upload failed:', result.error)
        // Optionally, show an error message
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  } else {
    console.log('No file selected')
  }
}
</script>
