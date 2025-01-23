<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
    <main>
        <p class="supplier-link mb-5"><a @click="router.push('/loginSupplier');"
                class="link-dark link-underline-dark link-underline-opacity-25 link-underline-opacity-75-hover font-small">Sei
                un fornitore?<br />Accedi e configura i tuoi prodotti</a></p>
    </main>
</template>


<style scoped>
.supplier-link {
    line-height: 1.1;
    max-width: 350px;
}

.font-small {
    font-size: small;
    color: var(--bs-dark);
}
</style>