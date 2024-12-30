<script setup lang="ts">
import { computed } from 'vue';
import { useProductsStore } from '@/stores/product';
const productStore = useProductsStore();

const props = defineProps({
    cap: {
        type: String,
        required: true
    },
})

const products = computed(() => productStore.products);
</script>

<template>
	<div class="">
	                <div v-for="product in products" :key="product.id">
	                <div class="product-card px-4 py-2 mx-auto">
	                    <div class="row align-items-center justify-content-between">
	                        <div class="col-7">
	                            <div class="row">
	                                <div class="col-12 bolder-text">
	                                    <!-- TODO: add institution -->
	                                    <span>{{ product.supplier.companyName }}</span> <span class="address">{{ product.supplier.address }}</span>
	                                </div>
	                                <div class="col-12 bolder-text">
	                                    {{ product.description }}
	                                </div>
	                            </div>
	                        </div>
	                        <div class="col-auto"> 
	                            <div class="row gx-5">
	                                <div v-if="product.supplier.cap == props.cap" class="col-6">
	                                    <span class="badge">Nelle tue vicinanze</span>
	                                </div>
	                                <div class="col-6">
	                                    <span class="badge">€{{ product.unitPrice }}</span>
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
