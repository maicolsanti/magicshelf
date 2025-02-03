<script setup lang="ts">
import { computed } from 'vue';
import { useProductsStore } from '@/stores/product';
import { useSupplierStore } from '@/stores/supplier';
const productStore = useProductsStore();
const supplierStore = useSupplierStore();

const props = defineProps({
    cap: {
        type: String,
        required: true
    },
})

const products = computed(() => productStore.products);

function setSelectedProduct(productId, supplierId) {
	supplierStore.fetchSupplierById(supplierId).then(() => {
		supplierStore.fetchLocationByIstatCode().then(() => {
			supplierStore.setSelectedProduct(productId, supplierId);
		});
	});
}

</script>

<template>
	<div class="">
	  <div v-for="product in products" :key="product.materialId">
		<div class="product-card px-4 py-2 mx-auto" @click="setSelectedProduct(product.materialId, product.supplierId)">
		  <div class="row align-items-center justify-content-between">
			<div v-if="product.imageBase64 != null" class="col-auto">
				<img v-bind:src="'data:image/jpeg;base64,'+product.imageBase64" class="product-image"/>
			</div>
			<div class="col-7">
			  <div class="row">
				<div class="col-12 bolder-text">
				  <span>{{ product.supplierCompanyName }}</span> <span class="address">{{ product.supplierAddress }}</span> <span class="address">{{ product.locationName }}</span>
				</div>
				<div class="col-12 text-primary bolder-text">
				  {{ product.materialDescription }}
				</div>
			  </div>
			</div>
			<div class="col-auto">
			  <div class="badge-container row"> 
				<div v-if="product.supplierZipCode == Number(props.cap)" class="col-auto badge">
				  <span>Nelle tue vicinanze</span>
				</div>
				<div class="col-auto badge">
				  <span>€ {{ product.materialUnitPrice }}</span>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <style scoped>
  @media (max-width: 400px) {
	.address {
	  display: none;
	}
	.product-image {
		max-height: 100px;
		max-width: 70px;
	}
  }
  
  .product-card {
	border: solid;
	border-color: var(--bs-secondary);
	border-radius: 6px;
	border-width: 2px;
	padding: 5px;
	margin-top: 10px;
	margin-bottom: 10px;
	max-width: 800px;
	min-width: 200px;
  }
  
  .badge-container {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
  }
  
  .badge {
	flex-shrink: 0;
	margin-left: 5px;
	padding: 5px 10px;
	border-radius: 6px;
	background-color: var(--bs-secondary);
  }
  
  .bolder-text {
	font-weight: 600;
	font-size: 16px;
	line-height: 1.2;
  }
  
  .address {
	font-weight: lighter;
	font-size: 14px;
	line-height: 1.2;
  }
  </style>
