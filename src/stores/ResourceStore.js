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
  }),

  getters: {
    getNodes: (state) => state.nodes || [],
    getPods: (state) => state.pods  || [],
    getDeployments: (state) => state.deployments || [],
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

    async describeResource(resourceType, resourceName) {
      try {
        const response = await fetch(`${API_BASE_URL}/${resourceType}/${resourceName}/describe`);
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

