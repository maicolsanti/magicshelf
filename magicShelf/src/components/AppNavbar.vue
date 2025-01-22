<script setup lang="ts">
import '@/assets/scss/custom-css.css'
import { page } from '@/models/page'
import { useConfigurationStore } from '@/stores/configurations'
import { useRouter } from 'vue-router'
import { computed } from 'vue';

const confStore = useConfigurationStore();

const isLoggedIn = computed(() => confStore.isLoggedIn);

const router = useRouter()

function logout() {
  confStore.updatePage(page.HOME)
  confStore.logout();
  router.push('/');
}

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary shadow-sm mb-5">
    <div class="container-fluid">
      <a class="navbar-brand page-name" href="#">{{ confStore.updatePageName() }}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item mx-2" @click="confStore.updatePage(page.HOME)">
            <RouterLink to="/" class="nav-link inactive-page" active-class="active-page">Home</RouterLink>
          </li>
          <li class="nav-item mx-2" @click="confStore.updatePage(page.SEARCH)">
            <RouterLink to="/search" class="nav-link inactive-page" active-class="active-page">Ricerca</RouterLink>
          </li>
          <li class="nav-item mx-2" @click="confStore.updatePage(page.PRODUCTS)">
            <RouterLink to="/products" class="nav-link inactive-page" active-class="active-page">Prodotti</RouterLink>
          </li>
          <li class="nav-item mx-2" @click="confStore.updatePage(page.PROFILE)">
            <RouterLink to="/profile" class="nav-link inactive-page" active-class="active-page">Profilo</RouterLink>
          </li>
          <li class="nav-item mx-2" @click="confStore.updatePage(page.ABOUT)">
            <RouterLink to="/about" class="nav-link inactive-page" active-class="active-page">About</RouterLink>
          </li>
          <!-- TODO replace with icon -->
          <li class="nav-item mx-2" v-if="!isLoggedIn" @click="confStore.updatePage(page.LOGIN)">
            <RouterLink to="/loginCostumer" class="nav-link inactive-page" active-class="active-page">Accedi</RouterLink>
          </li>
          <li class="nav-item mx-2" v-if="isLoggedIn" @click="logout">
            <RouterLink to="/" class="nav-link inactive-page" active-class="active-page">Logout</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.page-name {
  color: white;
}

.inactive-page {
  font-family: 'Rubik', Rubik, sans-serif;
  font-weight: lighter;
  color: white;
}

.active-page {
  font-family: 'Rubik', Rubik, sans-serif;
  font-weight: bold;
  color: white;
  text-shadow: -1px 1px 0 var(--bs-secondary),
    1px 1px 0 var(--bs-secondary),
    1px -1px 0 var(--bs-secondary),
    -1px -1px 0 var(--bs-secondary);
}

.navbar {
  width: 100vw;
  /* position:fixed; TODO: fix position */
}
</style>
