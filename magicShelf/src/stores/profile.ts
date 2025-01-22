import { defineStore } from "pinia";
import { ref } from "vue";
import axios from 'axios';
import { Costumer } from "@/models/costumer";
import { Supplier } from "@/models/supplier";

export const useProfileStore = defineStore("profile", () => {
  // Stato per i profili (opzionale per mantenere dati condivisi)
  const customerProfile = ref<Costumer | null>(null);
  const supplierProfile = ref<Supplier | null>(null);

  // Funzione per salvare le modifiche del profilo
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
      console.log(data);
      const response = await axios.put(endpoint, data);

      if (response.status != 200) {
        throw new Error(`Errore durante il salvataggio del profilo ${profileType}`);
      }

      console.log(`Profilo ${profileType} salvato con successo.`);
    } catch (error) {
      console.error("Errore durante il salvataggio:", error);
    }
  };

  // Funzione per eliminare il profilo
  const deleteProfile = async (profileType: "clienti" | "fornitori", id: number) => {
    try {
      const endpoint = `/api/${profileType}/delete/${id}`;
      const response = await axios.delete(endpoint);

      if (response.status != 200) {
        throw new Error(`Errore durante l'eliminazione del profilo ${profileType}`);
      }

      // Resetta lo stato locale dopo l'eliminazione
      if (profileType === "clienti") {
        customerProfile.value = null;
      } else {
        supplierProfile.value = null;
      }

      console.log(`Profilo ${profileType} eliminato con successo.`);
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  return {
    customerProfile,
    supplierProfile,
    saveChanges,
    deleteProfile,
  };
});
