import { defineStore } from 'pinia'
import { Product } from '@/models/product';
import { Supplier } from '@/models/supplier';
import { ProductSearched } from '@/models/product-searched';

// for api calls see https://pinia.vuejs.org/core-concepts/actions.html

export const useProductsStore = defineStore('productStore', {
  state: () => ({
    products: ProductSearched[0],
    filters: {
      productName: "",
      brand: "",
      supplier: "",
      cap: "",
      priceRange: null,
      distanceRange: null
    }
  }),
  actions: {
    async fetchSearchedProducts() {
      var fetchedProducts = [
        new ProductSearched(new Product(1, "Penna", "Bic", "pezzi", 2.5, new Supplier(1, "n", "s", "Bic", "11111111111", "11111111111", "011/111111", " bic@bic.com", "via rossi, 1", 10100, 1001)), 4),
        new ProductSearched(new Product(2, "Matita", "Faber", "pezzi", 1.5, new Supplier(2, "n", "s", "Faber", "22222222222", "22222222222", "011/222222", "faber@faber.com", "via rossi, 2", 10100, 1002)), 15),
        new ProductSearched(new Product(3, "Gomma", "Staedtler", "pezzi", 3, new Supplier(3, "n", "s", "Staedtler", "33333333333", "33333333333", "011/333333", "staedtler@staedtler.com", "via rossi, 3", 10100, 1003)), 60),
      ]
      this.products = fetchedProducts;
      return true;
    },
    setFilters(productName, brand, supplier, cap, priceRange, distanceRange) {
      this.filters.productName = productName;
      this.filters.brand = brand;
      this.filters.supplier = supplier;
      this.filters.cap = cap;
      this.filters.priceRange = priceRange; //TODO: controllare come le vuole passate
      this.filters.distanceRange = distanceRange; //TODO: controllare come le vuole passate
    },
  },
  getters: {
  },
});