<template>
  <div class="cliente-profile">
    <div class="profile-card">
      <!-- Header con immagine profilo -->
      <div class="profile-header">
        <div class="profile-image">
          <i class="fa fa-user-circle"></i>
        </div>
      </div>

      <!-- Form per i dati -->
      <form @submit.prevent="saveChanges">
        <!-- Sezione Anagrafica e Contatto -->
        <div class="form-section">
          <h2>Anagrafici e di contatto</h2>
          <div class="form-row">
            <div class="form-field">
              <label for="nome">Nome</label>
              <input type="text" id="nome" v-model="profile.name" placeholder="Nome" />
            </div>
            <div class="form-field">
              <label for="cognome">Cognome</label>
              <input type="text" id="cognome" v-model="profile.surname" placeholder="Cognome" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="profile.email" placeholder="Email" />
            </div>
            <div class="form-field">
              <label for="telefono">Telefono</label>
              <input type="tel" id="telefono" v-model="profile.phoneNumber" placeholder="Telefono" />
            </div>
          </div>
        </div>

        <!-- Sezione Località -->
        <div class="form-section">
          <h2>Località</h2>
          <div class="form-row">
            <div class="form-field">
              <label for="cap">CAP</label>
              <input type="text" id="cap" v-model="profile.cap" placeholder="CAP" />
            </div>
            <div class="form-field">
              <label for="istatCode">Codice ISTAT</label>
              <input type="text" id="istatCode" v-model="profile.istatCode" placeholder="Codice ISTAT" />
            </div>
          </div>
        </div>

        <!-- Sezione Password -->
        <div class="form-section">
          <h2>Password</h2>
          <div class="form-row">
            <div class="form-field">
              <label for="vecchiaPassword">Inserire vecchia password</label>
              <input type="password" id="vecchiaPassword" v-model="passwords.oldPassword" />
            </div>
            <div class="form-field">
              <label for="nuovaPassword">Inserire nuova password</label>
              <input type="password" id="nuovaPassword" v-model="passwords.newPassword" />
            </div>
            <div class="form-field">
              <label for="confermaPassword">Reinserire nuova password</label>
              <input type="password" id="confermaPassword" v-model="passwords.confirmPassword" />
            </div>
          </div>
        </div>

        <!-- Pulsante Salva -->
        <button type="submit" class="btn-save">Salva modifiche</button>

        <!-- Link per eliminare profilo -->
        <p class="delete-profile">
          <a href="#" @click.prevent="deleteProfile">Desideri eliminare il tuo profilo?</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useConfigurationStore } from "@/stores/configurations";
import { useProfileStore } from "@/stores/profile";

export default {
  name: "ClientProfile",
  setup() {
    const configurationStore = useConfigurationStore();
    const profileStore = useProfileStore();

    // Profilo del cliente
    const profile = ref({
      id: null,
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      cap: "",
      istatCode: "",
    });

    const passwords = ref({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const localities = ref(["Comune 1", "Comune 2", "Comune 3"]); // Mock data per comuni

    // Funzione per recuperare i dati del profilo cliente usando configurationStore
    const fetchProfile = async () => {
      try {
        await configurationStore.getProfile(); // Recupera i dati dal backend tramite lo store
        Object.assign(profile.value, configurationStore.configurations.userData); // Mappa i dati nel profilo
      } catch (error) {
        console.error("Errore durante il recupero del profilo cliente:", error);
      }
    };

    // Salva le modifiche tramite lo store profile
    const saveChanges = () => {
      if (profile.value) {
        profileStore.saveChanges("clienti", profile.value);
      }
    };

    // Elimina il profilo tramite lo store profile
    const deleteProfile = () => {
      profileStore.deleteProfile("clienti");
    };

    // Recupera i dati del profilo al montaggio
    onMounted(fetchProfile);

    return { profile, passwords, localities, saveChanges, deleteProfile };
  },
};
</script>

<style scoped>
.cliente-profile {
  max-width: 800px;
  margin: auto;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}
.profile-image {
  font-size: 80px;
  color: #ccc;
}
.form-section {
  margin-bottom: 20px;
}
.form-row {
  display: flex;
  gap: 20px;
}
.form-field {
  flex: 1;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.btn-save {
  background: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-save:hover {
  background: #444;
}
.delete-profile {
  text-align: center;
  margin-top: 20px;
}
.delete-profile a {
  color: #d9534f;
  text-decoration: none;
}
</style>
