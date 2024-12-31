import { defineStore } from 'pinia'
import { Supplier } from '@/models/supplier';
import { Product } from '@/models/product';
import { SupplierPorducts } from '@/models/supplier-products';

// for api calls see https://pinia.vuejs.org/core-concepts/actions.html

export const useSupplierStore = defineStore('supplierStore', {
  state: () => ({
    selectedSupplierId: null,
    selectedProductId: null,
    supplier: null,
    products: Product[0]
  }),
  actions: {
    setSelectedProduct(productId, supplierId) {
        this.selectedProductId = productId;
        this.selectedSupplierId = supplierId;
    },
    async fetchSupplierById(id) {
      var fetchedSupplier = new Supplier(1, "Maicol", "Santi", "Bic", "11111111111", "11111111111", "011/111111", " bic@bic.com", "Via rossi, 1", 10100, 1001);
      this.supplier = fetchedSupplier;
      return true;
    },
    async fetchSupplierProductsById(id) {
        var fetchedSupplierProducts = new SupplierPorducts(new Supplier(1, "Maicol", "Santi", "Bic", "11111111111", "11111111111", "011/111111", " bic@bic.com", "Via rossi, 1", 10100, 1001), [
            new Product(1, "Penna", "Bic", "pezzi", 2.5, new Supplier(1, "Maicol", "Santi", "Bic", "11111111111", "11111111111", "011/111111", " bic@bic.com", "Via rossi, 1", 10100, 1001)),
            new Product(2, "Matita", "Faber", "pezzi", 1.5, new Supplier(2, "n", "s", "Faber", "22222222222", "22222222222", "011/222222", "faber@faber.com", "via rossi, 2", 47020, 1002)),
        ]);
        this.products = fetchedSupplierProducts.products;
        return true;
      },
  },
  getters: {
  },
});