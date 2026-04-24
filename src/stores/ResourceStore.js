import { defineStore } from "pinia";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://192.168.2.43:30081/api/resources";

export const useResourceStore = defineStore("resource", {
  state: () => ({
    nodes: [],
  }),

  getters: {
    getNodes: (state) => state.nodes,
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
    }
  },
});

