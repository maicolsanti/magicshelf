<script setup lang="ts">
import { useSupplierStore } from '@/stores/supplier';
import { computed } from 'vue';
import { addIcons} from 'oh-vue-icons';
import { HiLocationMarker, IoArrowBackCircleOutline, IoArrowBackCircle } from 'oh-vue-icons/icons';

addIcons(HiLocationMarker, IoArrowBackCircleOutline, IoArrowBackCircle);

const props = defineProps({
    supplierId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    filterCap: {
        type: String,
        required: true
    }
});

const supplierStore = useSupplierStore();

const products = computed(() => supplierStore.products);
const supplier = computed(() => supplierStore.supplier);
const location = computed(() => supplierStore.location);

console.log("products ", products.value);
console.log("productId prop ", props.productId);

console.log("caps ", props.filterCap, supplier.value.cap);

const selectedProduct = products.value.find(product => product.id === props.productId);

console.log("selectedProduct ", selectedProduct);
</script>

<template>
  <div class="row align-items-end">
        <div class="col d-flex flex-column align-items-start">
            <button @click="supplierStore.setSupplierIdNull()"><v-icon name="io-arrow-back-circle" scale="2.3" class="navigation-icon" /></button>
        </div>
        <div class="col sub-page-title d-flex flex-column align-items-end">
            <h4>Dettaglio fornitore</h4>
        </div>
    </div>
  <main class="width mt-5">
    <div class="col-auto supplier-header">
      <h2 class="text-center bold">{{ supplier.companyName }}</h2>
      <div class="row justify-content-center align-items-center">
        <div class="col-1 supplier-icon">
            <v-icon name="hi-location-marker"
            class="visibility-icon" />
        </div>
        <p class="col-auto text-center font-lighter">{{ supplier.address }}<br>{{ location.municipality }} {{ location.cap }} {{ location.district }}</p>
      </div>
      <div v-if="supplier.cap == props.filterCap">
        <p class="text-center bold">Nelle tue vicinanze</p>
      </div>
      <div class="row product-highlight justify-content-between align-items-center mx-1 px-4 gx-3">
        <div class="col-6">
          <span class="text-dark bold">{{ selectedProduct.description  }}</span>
        </div>
        <div class="col-6 badge my-3 d-flex justify-content-center align-items-center">
          <span class="price">€ {{ selectedProduct.unitPrice }}</span>
        </div>
      </div>
    </div>

    <section class="supplier-products mt-5">
      <h3 class="font-lighter">Tutti i prodotti del fornitore</h3>
        <li v-for="product in products" :key="product.id" class="product-item">
          <span class="bold">{{ product.description }}</span>
          <div class="badge d-flex justify-content-center align-items-center">
            <span class="price text-light">€ {{ product.unitPrice }}</span>
          </div>
        </li>
    </section>
  </main>
</template>

<style scoped>
.navigation-icon {
    color: var(--bs-primary);
}

.sub-page-title {
    align-items: end;
    align-content: end;
}

button {
    background-color: unset;
    border: unset;
}

.width {
  max-width: 500px;
  min-width: 350px;
}

.supplier-header {
  background-color: var(--bs-primary);
  padding: 20px;
  border-radius: 30px;
  color: #fff;
  justify-content: space-between;
  align-items: center;
}

.supplier-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.supplier-icon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
}

.product-highlight {
  background-color: #fff;
  border-radius: 30px;
  max-height: 60px;
}

.price {
  font-weight: bold;
  color: #fff;
}

.supplier-products {
  margin-top: 20px;
}

.supplier-products h3 {
  margin-bottom: 10px;
}

.font-lighter {
  font-weight: lighter;
}

.product-item {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid var(--bs-secondary);
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-item .price {
  color: var(--bs-secondary);
  font-weight: bold;
}

.badge {
    max-width: 50px;
    font-weight: normal;
    height: 25px;
    background-color: var(--bs-secondary);
}

.bold {
  font-weight: bold;
}
</style>
