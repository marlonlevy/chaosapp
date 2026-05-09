import { defineStore } from 'pinia'
import { getFileApiBaseUrl } from "../utils/api";

const FILE_API_BASE_URL = getFileApiBaseUrl();
export const useFileStore = defineStore('file', {
  state: () => ({
    files: [],
    uploadProgress: 0,
    downloadUrl: null,
    error: null,
  }),

  getters: {
    fileCount: (state) => state.files.length,
    hasDownloadUrl: (state) => Boolean(state.downloadUrl),
  },

  actions: {
    async fetchFiles() {
      this.error = null
      try {
        const response = await fetch(FILE_API_BASE_URL + '/list')
        if (!response.ok) {
          throw new Error('Failed to fetch files')
        }
        this.files = await response.json()
        console.log('Fetched files:', this.files )
      } catch (err) {
        this.error = err.message
      }
    },

    uploadFile(file) {
      console.log(FILE_API_BASE_URL)
      return new Promise((resolve, reject) => {
        this.error = null
        this.uploadProgress = 0

        const formData = new FormData()
        formData.append('file', file)

        const xhr = new XMLHttpRequest()
        xhr.open('POST', `${FILE_API_BASE_URL}/upload`)

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            this.uploadProgress = Math.round((event.loaded / event.total) * 100)
          }
        }

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const result = JSON.parse(xhr.responseText)
              resolve(result)
            } catch  {
              resolve(xhr.responseText)

            }
          } else {
            this.error = `Upload failed: ${xhr.statusText}`
            reject(new Error(this.error))
          }
        }

        xhr.onerror = () => {
          this.error = 'Upload network error'
          reject(new Error(this.error))
        }

        xhr.send(formData)
      })
    },

    async downloadFile(fileId, filename = 'downloaded-file') {
      this.error = null
      if (this.downloadUrl) {
        URL.revokeObjectURL(this.downloadUrl)
        this.downloadUrl = null
      }

      try {
        const response = await fetch(`${FILE_API_BASE_URL}/download/${encodeURIComponent(fileId)}`)
        if (!response.ok) {
          throw new Error('Failed to download file')
        }
        const blob = await response.blob()
        this.downloadUrl = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = this.downloadUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (err) {
        this.error = err.message
      }
    },

    clearDownloadUrl() {
      if (this.downloadUrl) {
        URL.revokeObjectURL(this.downloadUrl)
        this.downloadUrl = null
      }
    },

    clearError() {
      this.error = null
    },
  },
})
