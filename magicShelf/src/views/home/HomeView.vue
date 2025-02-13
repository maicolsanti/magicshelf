<script setup lang="ts">
import SearchInstructions from '../../components/home/SearchInstructions.vue'
import SupplierLink from '../../components/home/SupplierLink.vue'
import { useConfigurationStore } from '../../stores/configurations';
import { MdCancelpresentation } from 'oh-vue-icons/icons'
import AboutView from '../about_us/AboutView.vue';
import { computed } from 'vue';
import { addIcons } from 'oh-vue-icons'

addIcons(MdCancelpresentation);

const confStore = useConfigurationStore();

// Check if user is logged in (valid authToken)
confStore.getProfile();

const isLoggedIn = computed(() => confStore.isLoggedIn);
const isSupplier = computed(() => confStore.isSupplier);
const alertMessage = computed(() => confStore.configurations.loginMessage);
const alertTimeout = computed(() => confStore.showAlert);

function getAlertType() {
  if (isLoggedIn.value) {
    return "success";
  } else {
    return "error";
  }
}

</script>
<template>
  <main>
    <div 
        v-if="alertMessage != '' && alertTimeout" 
        class="custom-alert"
        :class="getAlertType()"
      >
        {{ alertMessage }}
        <v-icon name="md-cancelpresentation" @click="confStore.closeAlert()" class="alert-icon" :class="getAlertType()"/>
      </div>
    <h1 class="welcome mb-4" v-if="!isSupplier">Benvenut*,<br>qui potrai trovare ciò che cerchi
    </h1>
    <h1 class="welcome mb-4" v-if="isSupplier">Benvenut*,<br>qui potrai far scoprire i tuoi prodotti
    </h1>
    <div class="d-grid gap-2 mb-1" v-if="!isLoggedIn">
      <RouterLink to="/loginCostumer" class="login-link primary-button">
        <button type="button" class="btn btn-primary py-2 primary-button">
          Accedi per iniziare la ricerca
        </button>
      </RouterLink>
    </div>
    <div class="d-grid gap-2 mb-1" v-if="isLoggedIn && !isSupplier">
      <RouterLink to="/search" class="login-link primary-button">
        <button type="button" class="btn btn-primary py-2 primary-button">
          Vai alla ricerca
        </button>
      </RouterLink>
    </div>
    <div class="d-grid gap-2 mb-1" v-if="isLoggedIn && isSupplier">
      <RouterLink to="/products" class="login-link primary-button">
        <button type="button" class="btn btn-primary py-2 primary-button">
          Vai ai tuoi prodotti
        </button>
      </RouterLink>
    </div>
    <SupplierLink v-if="!isLoggedIn" />
    <SearchInstructions v-if="!isLoggedIn" />
    <AboutView v-if="isLoggedIn" class="mt-5"/>
  </main>
</template>


<style scoped>

.login-link {
  color: var(--bs-dark);
  text-decoration: none;
}
</style>