<template>
  <div class="fornitore-profile">
    <div class="profile-card">
      <!-- Profile image header -->
      <div class="profile-header">
        <div class="profile-image">
          <i class="fa fa-user-circle"></i>
        </div>
      </div>

      <!-- Data form -->
      <form @submit.prevent="saveChanges">
        <!-- Anagrafica section -->
        <div class="form-section">
          <h2>Anagrafici e di azienda</h2>
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
              <label for="ragioneSociale">Ragione sociale</label>
              <input type="text" id="ragioneSociale" v-model="profile.companyName" placeholder="Ragione sociale" />
            </div>
            <div class="form-field">
              <label for="partitaIva">Partita Iva</label>
              <input type="text" id="partitaIva" v-model="profile.vatNumber" placeholder="Partita IVA" />
            </div>
            <div class="form-field">
              <label for="codiceFiscale">Codice fiscale</label>
              <input type="text" id="codiceFiscale" v-model="profile.fiscalCode" placeholder="Codice fiscale" />
            </div>
          </div>
        </div>

        <!-- Locality section -->
        <div class="form-section">
          <h2>Località</h2>
          <div class="form-row">
            <div class="form-field">
              <label for="cap">CAP</label>
              <input type="text" id="cap" v-model="profile.cap" placeholder="CAP" />
            </div>
            <div class="form-field">
              <label for="comune">Comune</label>
              <select id="comune" v-model="profile.locality">
                <option v-for="locality in localities" :key="locality" :value="locality">{{ locality }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Contacts section -->
        <div class="form-section">
          <h2>Di contatto e utente</h2>
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

        <!-- Password section -->
        <div class="form-section">
          <h2>Password</h2>
          <div class="form-row">
            <div class="form-field">
              <label for="nuovaPassword">Inserire nuova password</label>
              <input type="password" id="nuovaPassword" v-model="passwords.newPassword" />
            </div>
            <div class="form-field">
              <label for="confermaPassword">Re inserire nuova password</label>
              <input type="password" id="confermaPassword" v-model="passwords.confirmPassword" />
            </div>
          </div>
        </div>

        <!-- Save button -->
        <button type="submit" class="btn-save">Salva modifiche</button>

        <!-- Delete profile link -->
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
  name: "SupplierProfile",
  setup() {
    const configurationStore = useConfigurationStore();
    const profileStore = useProfileStore();

    const profile = ref({
      id: null,
      name: "",
      surname: "",
      companyName: "",
      vatNumber: "",
      fiscalCode: "",
      cap: "",
      locality: "",
      email: "",
      phoneNumber: "",
    });

    const passwords = ref({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    const localities = ref(["Comune 1", "Comune 2", "Comune 3"]);

    // Load profile info
    const fetchProfile = async () => {
      try {
        await configurationStore.getProfile();
        Object.assign(profile.value, configurationStore.configurations.userData); // Map data
        console.log(configurationStore.configurations.userData)
      } catch (error) {
        console.error("Errore durante il caricamento del profile fornitore:", error);
      }
    };

    // Save changes
    const saveChanges = () => {
      if (profile.value) {
        profileStore.saveChanges("fornitori", profile.value);
      }
    };

    // Delete profile
    const deleteProfile = () => {
      profileStore.deleteProfile("fornitori", profile.id);
    };

    onMounted(fetchProfile);

    return { profile, passwords, localities, saveChanges, deleteProfile };
  },
};
</script>

<style scoped>
.fornitore-profile {
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
