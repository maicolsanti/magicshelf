<template>
  <div class="profile-page">
    <h1>Profilo Utente</h1>
    <ProfileComponent />
  </div>
</template>

<script>
import ProfileComponent from "@/components/Profile.vue";

export default {
  name: "ProfileView",
  components: {
    ProfileComponent,
  },
};
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
html, body {
  width: 100%;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
