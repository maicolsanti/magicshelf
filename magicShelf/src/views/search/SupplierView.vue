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
    <section class="supplier-header">
      <div class="supplier-info">
        <div class="supplier-icon">
            <v-icon name="hi-location-marker"
            class="visibility-icon" />
        </div>
        <div>
          <h2>{{ supplier.companyName || 'Ragione Sociale' }}</h2>
          <p>{{ supplier.address }}</p>
          <p>{{ supplier.address || 'Via delle vie, 2405 Langiano 47020 FC' }}</p>
          <p class="price">Nelle tue vicinanze</p>
        </div>
      </div>
      <div class="product-highlight">
        <p>{{ selectedProduct.description || 'Nome prodotto' }}</p>
        <p class="price">{{ selectedProduct.price }}</p>
      </div>
    </section>

    <section class="supplier-products">
      <h3>Tutti i prodotti del fornitore</h3>
      <ul>
        <li v-for="product in products" :key="product.id" class="product-item">
          <span>{{ product.description }}</span>
          <span class="price">{{ product.price }}</span>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.supplier-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.supplier-icon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
}

.product-highlight {
  text-align: right;
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
</style>
