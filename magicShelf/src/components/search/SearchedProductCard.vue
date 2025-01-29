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
		supplierStore.setSelectedProduct(productId, supplierId);
	});
	supplierStore.fetchLocationByIstatCode();
}

</script>

<template>
	<div class="">
	                <div v-for="product in products" :key="product.materialId">
	                <div class="product-card px-4 py-2 mx-auto" @click="setSelectedProduct(product.materialId, product.supplierId)">
						<!-- <img v-if="product.imageBase64" v-bind:src="'data:image/png;base64,'+product.imageBase64" /> -->
	                    <div class="row align-items-center justify-content-between">
	                        <div class="col-7">
	                            <div class="row">
	                                <div class="col-12 bolder-text">
	                                    <span>{{ product.supplierCompanyName }}</span> <span class="address">{{ product.supplierAddress }}</span> <span class="address">{{ product.locationName }}</span>
	                                </div>
	                                <div class="col-12 bolder-text">
	                                    {{ product.materialDescription }}
	                                </div>
	                            </div>
	                        </div>
	                        <div class="col-auto"> 
	                            <div class="row gx-5">
	                                <div v-if="product.supplierZipCode == Number(props.cap)" class="col-6">
	                                    <span class="badge">Nelle tue vicinanze</span>
	                                </div>
	                                <div class="col-6">
	                                    <span class="badge">€ {{ product.materialUnitPrice }}</span>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                </div>
	            </div>
</template>

<style scoped>

.product-card {
    border: solid;
    border-color: var(--bs-secondary);
    border-radius: 6px;
    border-width: 2px;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 800px;
}
.badge {
    max-width: 300px;
    font-weight: normal;
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
