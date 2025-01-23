<template>
  <div class="profile-view">
    <h1>Profilo Utente</h1>
    <!-- Caricamento del componente corretto in base al tipo di profilo -->
    <Profile />
  </div>
</template>

<script>
import Profile from "@/components/Profile.vue";

export default {
  name: "ProfileView",
  components: {
    Profile,
  },
};
</script>

<style scoped>
.profile-view {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
