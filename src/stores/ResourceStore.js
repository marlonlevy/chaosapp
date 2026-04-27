import { defineStore } from "pinia";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://192.168.2.43:30081/api/resources";

/**
 * Parse logs string into an array of log lines
 * @param {string} logsString - The logs string with newline characters
 * @param {boolean} filterEmpty - Whether to filter out empty lines (default: true)
 * @returns {string[]} Array of log lines
 */
export function parseLogsToArray(logsString, filterEmpty = true) {
  if (!logsString || typeof logsString !== 'string') {
    return [];
  }

  const lines = logsString.split('\\n');
  return filterEmpty ? lines.filter(line => line.trim().length > 0) : lines;
}

export const useResourceStore = defineStore("resource", {
  state: () => ({
    nodes: [],
    pods: [],
    deployments: [],
    services: [],
    performanceMetrics: {},
    persistentVolumes: [],
    persistentVolumeClaims: [],
  }),

  getters: {
    getNodes: (state) => state.nodes || [],
    getPods: (state) => state.pods  || [],
    getDeployments: (state) => state.deployments || [],
    getServices: (state) => state.services || [],
    getPerformanceMetrics: (state) => state.performanceMetrics || {},
    getPersistentVolumes: (state) => state.persistentVolumes || [],
    getPersistentVolumeClaims: (state) => state.persistentVolumeClaims || [],
  },

  actions: {
    async fetchNodes() {
      try {
        const response = await fetch(`${API_BASE_URL}/nodes`);
        if (!response.ok) {
          throw new Error("Failed to fetch nodes");
        }
        const data = await response.json();
        this.nodes = data;
      } catch (error) {
        console.error("Error fetching nodes:", error);
      }
    },
    async fetchPods() {
      try {
        const response = await fetch(`${API_BASE_URL}/pods`);
        if (!response.ok) {
          throw new Error("Failed to fetch pods");
        }
        const data = await response.json();
        this.pods = data;
      } catch (error) {
        console.error("Error fetching pods:", error);
      }
    },

    async fetchDeployments() {
      try {
        const response = await fetch(`${API_BASE_URL}/deployments`);
        if (!response.ok) {
          throw new Error("Failed to fetch deployments");
        }
        const data = await response.json();
        this.deployments = data;
      } catch (error) {
        console.error("Error fetching deployments:", error);
      }
    },

    async fetchServices() {
      try {
        const response = await fetch(`${API_BASE_URL}/services`);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        this.services = data;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },

    async fetchPersistentVolumes() {
      try {
        const response = await fetch(`${API_BASE_URL}/persistentvolumes`);
        if (!response.ok) {
          throw new Error("Failed to fetch persistent volumes");
        }
        const data = await response.json();
        this.persistentVolumes = data;
      } catch (error) {
        console.error("Error fetching persistent volumes:", error);
      }
    },

    async fetchPersistentVolumeClaims() {
      try {
        const response = await fetch(`${API_BASE_URL}/persistentvolumeclaims`);
        if (!response.ok) {
          throw new Error("Failed to fetch persistent volume claims");
        }
        const data = await response.json();
        this.persistentVolumeClaims = data;
      } catch (error) {
        console.error("Error fetching persistent volume claims:", error);
      }
    },

    async fetchPerformanceMetrics() {
      try {
        const response = await fetch(`${API_BASE_URL}/performance-metrics`);
        if (!response.ok) {
          throw new Error("Failed to fetch performance metrics");
        }
        const data = await response.json();
        this.performanceMetrics = data;
      } catch (error) {
        console.error("Error fetching performance metrics:", error);
      }
    },

    async fetchPodLogs(podName) {
      try {
        const response = await fetch(`${API_BASE_URL}/pods/${podName}/logs`);
        if (!response.ok) {
          throw new Error("Failed to fetch pod logs");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching logs for pod ${podName}:`, error);
        return null;
      }
    },

    async describeResource(resourceType, resourceName, namespace = 'default') {
      try {
        const response = await fetch(`${API_BASE_URL}/${resourceType}/${resourceName}/describe?namespace=${namespace}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch details for ${resourceType} ${resourceName}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching details for ${resourceType} ${resourceName}:`, error);
        return null;
      }
    },



    parsePodLogs(logsInput) {
      /**
       * Parse pod logs from various formats:
       * - String with newlines
       * - JSON object with "logs" property
       * @param {string|object} logsInput - Logs string or JSON object
       * @returns {string[]} Array of log lines
       */
      let logsString = logsInput;

      if (typeof logsInput === 'object' && logsInput !== null && logsInput.logs) {
        logsString = logsInput.logs;
      }

      return parseLogsToArray(logsString);
    },
}});

