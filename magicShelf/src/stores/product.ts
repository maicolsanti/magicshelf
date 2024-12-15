import { defineStore } from 'pinia'
import { Product } from '@/models/product';
import { Supplier } from '@/models/supplier';

// for api calls see https://pinia.vuejs.org/core-concepts/actions.html

export const useProductsStore = defineStore('productStore', {
  state: () => ({
    products: null
  }),
  actions: {
    async fetchSearchedProducts() {
      var fetchedProducts = [
        new Product(1, "Penna", "Bic", "pezzi", 2.5, new Supplier(1, "n", "s", "Bic", "11111111111", "11111111111", "011/111111", " bic@bic.com", 10100, 1001)),
        new Product(2, "Matita", "Faber", "pezzi", 1.5, new Supplier(2, "n", "s", "Faber", "22222222222", "22222222222", "011/222222", "faber@faber.com", 10100, 1002)),
        new Product(3, "Gomma", "Staedtler", "pezzi", 3, new Supplier(3, "n", "s", "Staedtler", "33333333333", "33333333333", "011/333333", "staedtler@staedtler.com", 10100, 1003)),
      ]
      this.products = fetchedProducts;
      return true;
    },
  },
  getters: {

  },
});