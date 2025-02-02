import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';
import { Costumer } from "@/models/costumer";
import { Supplier } from "@/models/supplier";

export const useProfileStore = defineStore("profile", () => {
  // Profile status
  const customerProfile = ref<Costumer | null>(null);
  const supplierProfile = ref<Supplier | null>(null);

  // Profile value change function
  const saveChanges = async (profileType: "clienti" | "fornitori", profileData: Costumer | Supplier) => {
    try {
      const endpoint = `/api/${profileType}/update/${profileData.id}`;
      const data = {
        custom_data: {
          NOME: profileData.name,
          COGNOME: profileData.surname,
          CAP: profileData.cap,
          CODICE_ISTAT: profileData.istatCode,
          EMAIL: profileData.email,
          PHONE_NUMBER: profileData.phoneNumber
        }
      };
      const response = await axios.put(endpoint, data);

      if (response.status != 200) {
        throw new Error(`Errore durante il salvataggio del profilo ${profileType}`);
      }

      console.log(`Profilo ${profileType} salvato con successo.`);
    } catch (error) {
      throw error;
    }
  };

  const getLocalityByCap = async (cap) => {
    try {
      const endpoint = `/api/localita/getByCap/${cap}`;
      const response = await axios.get(endpoint);
  
      if (response.status !== 200) {
        throw new Error(`Errore durante il recupero delle località per il CAP ${cap}`);
      }
  
      // Mappa i dati per estrarre solo i nomi delle località
      const localities = response.data.map((item) => item.DENOMINAZIONE_LOCALITA);
  
      return localities;
    } catch (error) {
      throw error;
    }
  };  

  const GetLocalityByCapDenominazione = async (cap: number, denominazione: string) => {
    try {
      const endpoint = `/api/localita/getByCapDenominazione/${cap}/${denominazione}`;
      const response = await axios.get(endpoint);

      if (response.status !== 200) {
        throw new Error('Errore durante il recupero del codice istat');
      }

      const istat_code = response.data.CODICE_ISTAT;

      return istat_code;
    } catch (error) {
      throw error;
    }
  };

  // Delete profile function
  const deleteProfile = async (profileType: "clienti" | "fornitori", id: number) => {
    try {
      const endpoint = `/api/${profileType}/remove/${id}`;
      const response = await axios.delete(endpoint);

      if (response.status != 200) {
        throw new Error(`Errore durante l'eliminazione del profilo ${profileType}`);
      }

      // Reset state
      if (profileType === "clienti") {
        customerProfile.value = null;
      } else {
        supplierProfile.value = null;
      }

      console.log(`Profilo ${profileType} eliminato con successo.`);
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const endpoint = `api/auth/general/changePassword`;
      const data = {
        "OLD_PASSWORD": passwordData.oldPassword,
        "NEW_PASSWORD": passwordData.newPassword
      };
      const response = await axios.post(endpoint, data);

      if (response.status != 200) {
        throw new Error('Errore durante il cambio password');
      }

      console.log('Password aggiornata correttamente.');
    } catch (error) {
      throw(error);
    }
  };

  return {
    customerProfile,
    supplierProfile,
    getLocalityByCap,
    GetLocalityByCapDenominazione,
    saveChanges,
    deleteProfile,
    changePassword
  };
});
