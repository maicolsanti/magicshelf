import { defineStore } from 'pinia'

export const useProductsStore = defineStore('productStore', {
  state: () => ({
    products: [
        {
          id: 1,
          name: "Bianco",
          brand: "Bianco",
          supplier: "Bianco",
          cap: "47020",
        }
    ]
  }),
  actions: {
  },
  getters: {
  },
});