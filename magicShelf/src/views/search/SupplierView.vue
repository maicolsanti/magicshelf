<script setup lang="ts">
import { useSupplierStore } from '@/stores/supplier';
import { computed } from 'vue';
import { addIcons } from 'oh-vue-icons';
import { HiLocationMarker } from 'oh-vue-icons/icons';

addIcons(HiLocationMarker);

const props = defineProps({
    supplierId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    isNearby: {
        type: Boolean,
        required: true
    }
});

const supplierStore = useSupplierStore();

const products = computed(() => supplierStore.products);
const supplier = computed(() => supplierStore.supplier);
const location = computed(() => supplierStore.location);

console.log("products ", products.value);
console.log("productId prop ", props.productId);

const selectedProduct = products.value.find(product => product.id === props.productId);

</script>

<template>
  <main class="margin-content">
    <div class="col-auto supplier-header">
      <h2 class="text-center">{{ supplier.companyName }}</h2>
      <div class="row justify-content-center align-items-center">
        <div class="col-1 supplier-icon">
            <v-icon name="hi-location-marker"
            class="visibility-icon" />
        </div>
        <p class="col-auto text-center">{{ supplier.address }}<br>{{ location.municipality }} {{ location.cap }} {{ location.district }}</p>
      </div>
      <div v-if="props.isNearby">
        <p>Nelle tue vicinanze</p>
      </div>
      <div class="row product-highlight justify-content-between align-items-center mx-1 px-4 gx-3">
        <div class="col-6">
          <span class="text-dark product-name">{{ selectedProduct.description  }}</span>
        </div>
        <div class="col-6 badge my-3">
          <span class="price">€ {{ selectedProduct.unitPrice }}</span>
        </div>
      </div>
    </div>

    <section class="supplier-products">
      <h3>Tutti i prodotti del fornitore</h3>
      <ul>
        <li v-for="product in products" :key="product.id" class="product-item">
          <span class="product-name">{{ product.description }}</span>
          <div class="badge">
            <span class="price">€ {{ product.unitPrice }}</span>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.margin-content {
  padding: 20px;
}

.supplier-header {
  background-color: var(--bs-primary);
  padding: 20px;
  border-radius: 10px;
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
  border-radius: 18px;
  height: 50px;
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

.product-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
}

.product-item .price {
  color: var(--bs-secondary);
  font-weight: bold;
}

.badge {
    max-width: 50px;
    font-weight: normal;
    background-color: var(--bs-secondary);
}

.product-name {
  font-weight: bold;
}
</style>
