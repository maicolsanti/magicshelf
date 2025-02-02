import { defineStore } from 'pinia'
import { Supplier } from '@/models/supplier';
import { Product } from '@/models/product';
import { LocationDetails } from '@/models/location-details';
import axios from 'axios';
import { FoundProduct } from '@/models/found_product';
import { MaterialSituation } from '@/models/material_situation';

// for api calls see https://pinia.vuejs.org/core-concepts/actions.html

export const useSupplierStore = defineStore('supplierStore', {
  state: () => ({
    selectedSupplierId: null,
    selectedProductId: null,
    supplier: null,
    location: null,
    supplierFetchedProducts: [] as FoundProduct[], // Materials
    materialSituations: [] as MaterialSituation[], // Materials situations
    productMaterialSituation: {} as MaterialSituation,
    newProduct: {} as Product,
    newProductDialog: false,
    editProductDialog: false,
    deleteProductDialog: false
  }),
  actions: {
    setSelectedProduct(productId, supplierId) {
      // Set selected product
        this.selectedProductId = productId;
        this.selectedSupplierId = supplierId;
        console.log("Settato il prodotto selezionato: ", productId);
    },
    async fetchSupplierById(id: Number) {
      // GET BY ID - supplier

      try {
        // All supplier products
        this.supplierFetchedProducts = await axios.get('/api/materiali-fornitori/getById/' + id).then(res => res.data.map((fetchedProduct: any) => new FoundProduct(
          fetchedProduct.CODICE_FORNITORE,
          fetchedProduct.NOME,
          fetchedProduct.COGNOME,
          fetchedProduct.RAGIONE_SOCIALE,
          fetchedProduct.PARTITA_IVA,
          fetchedProduct.CODICE_FISCALE,
          fetchedProduct.CAP,
          fetchedProduct.CODICE_ISTAT,
          fetchedProduct.INDIRIZZO,
          fetchedProduct.PHONE_NUMBER,
          null,
          fetchedProduct.CODICE_MATERIALE,
          fetchedProduct.DESCRIZIONE_MATERIALE,
          fetchedProduct.MARCA,
          fetchedProduct.UNITA_MISURA,
          fetchedProduct.PREZZO_UNITARIO,
          fetchedProduct.SIGLA_PROVINCIA,
          fetchedProduct.DENOMINAZIONE_PROVINCIA,
          fetchedProduct.DENOMINAZIONE_REGIONE,
          fetchedProduct.DENOMINAZIONE_LOCALITA,
          fetchedProduct.IMMAGINE
        )));

        // Supplier data
        this.supplier = new Supplier(
          this.supplierFetchedProducts[0].supplierId,
          this.supplierFetchedProducts[0].supplierName,
          this.supplierFetchedProducts[0].supplierSurname,
          this.supplierFetchedProducts[0].supplierCompanyName,
          this.supplierFetchedProducts[0].supplierVatNumber,
          this.supplierFetchedProducts[0].supplierFiscalCode,
          this.supplierFetchedProducts[0].supplierPhoneNumber,
          this.supplierFetchedProducts[0].supplierEmail,
          this.supplierFetchedProducts[0].supplierAddress,
          this.supplierFetchedProducts[0].supplierZipCode,
          this.supplierFetchedProducts[0].supplierIstatCode
        )

        console.log("Materiali fornitore recuperati con successo.");
      }
      catch (error) {
        console.error("Errore nel recupero dei materiali del fornitore: ", error);
      }
    },
    async fetchMaterialSituation(id: Number) {
      // GET BY ID - material situation
      try {
        await axios.get('/api/situazione-materiali/getById/' + id).then(res => {
          const situation = res.data;
          this.productMaterialSituation = new MaterialSituation(
          situation.CODICE_MATERIALE,
          situation.QUANTITA
          );
        });
        console.log("Situazione materiale recuperata con successo.");
      }
      catch (error) {
        console.error("Errore nel recupero della situazione materiale: ", error);
      }
    },
    async fetchAllMaterialSituations() {
      // GET ALL - material situations
      console.log("Chiamata per recuperare tutte le situazioni materiali.");
      try {
        this.materialSituations = await axios.get('/api/situazione-materiali/getAll/').then(res => res.data.map((fetchedSituation: any) => new MaterialSituation(
          fetchedSituation.CODICE_MATERIALE,
          fetchedSituation.QUANTITA
        )));
        console.log("Recuperate tutte le situazioni materiali.");
      }
      catch (error) {
        console.error("Errore nel recupero delle situazioni materiali: ", error);
      }
    },
    async fetchLocationByIstatCode() {
        // GET BY ID - location

        try {
          await axios.get('/api/localita/getById/' + this.supplier.istatCode).then(res => {
            this.location = new LocationDetails(
            res.data.CODICE_ISTAT,
            res.data.CAP,
            res.data.PROVINCIA,
            res.data.REGIONE,
            res.data.LOCALITA
            );
          });
          console.log("Località recuperata con successo.");
        }
        catch (error) {
          console.error("Errore nel recupero della località: ", error);
        }
        return true;
    },
    async insertQuantity(id, quantity) {
      // CREATE - material situation

      try {
        await axios.post('/api/situazione-materiali/create', {
          custom_data: {
            CODICE_MATERIALE: id,
            QUANTITA: quantity
          }
        })
          .then(function (response) {
            console.log("Situazione materiale creata con successo.");
          })
      }
      catch (error) {
        console.error("Errore nella registrazione del cliente: ", error);
      }
    },
    async editQuantity(id, quantity) {
      // UPDATE - material situation

      try {
        await axios.put('/api/situazione-materiali/update/' + id, {
          custom_data: {
            CODICE_MATERIALE: id,
            QUANTITA: quantity
          }
        })
          .then(function (response) {
            console.log("Situazione materiale modificata con successo.");
          })
      }
      catch (error) {
        console.error("Errore nella modifica della situazione materiale: ", error);
      }
    },
    async insertNewProduct(productDescription, productBrand, productUnit, productPrice, productQuantity, productImage, supplierId) {
      // CREATE - material

      let responseId = 0; // Response id for creating new material situation

      // Populate form data
      let formData = new FormData();
      formData.append(
        'custom_data',
        JSON.stringify({
            DESCRIZIONE_MATERIALE: productDescription,
            MARCA: productBrand,
            CODICE_FORNITORE: supplierId,
            UNITA_MISURA: productUnit,
            PREZZO_UNITARIO: productPrice,
        })
      );

      // Append image
      formData.append('image', productImage);

      // Make request
      try {
        await axios.post('/api/materiali/create', 
          formData,
        {
          headers: {
          'Content-Type': 'multipart/form-data',
          }
        })
          .then(function (response) {
            console.log("Materiale creato con successo.");
            responseId = response.data.id; // Save response id
          })

          // Insert quantity
          this.insertQuantity(responseId, productQuantity);

          // Fetch supplier for updating product list
          this.fetchSupplierById(supplierId);
      }
      catch (error) {
        console.error("Errore nella creazione del materiale: ", error);
      }
    },
    async editProduct(productId,productDescription, productBrand, productUnit, productPrice, productQuantity, productImage, originalProduct) {
      // Update - material

      // Populate form data with only updated values
      let formData = new FormData();
      formData.append(
        'custom_data',
        JSON.stringify({
            ...(productDescription !== originalProduct.materialDescription && { DESCRIZIONE_MATERIALE: productDescription }),
            ...(productBrand !== originalProduct.materialBrand && { MARCA: productBrand }),
            ...(productUnit !== originalProduct.materialUnitOfMeasure && { UNITA_MISURA: productUnit }),
            ...(productPrice !== originalProduct.materialPrice && { PREZZO_UNITARIO: productPrice }),
        })
      );

      // Append image
      formData.append('image', productImage);

      // Make request
      try {
        await axios.put('/api/materiali/update/' + productId, 
          formData,
        {
          headers: {
          'Content-Type': 'multipart/form-data',
          }
        })
          .then(function (response) {
            console.log("Materiale modificato con successo.");
          })

          // Update quantity if necessary
          if (this.productMaterialSituation.materialQuantity != productQuantity){
            this.editQuantity(productId, productQuantity);
          }

          // Fetch supplier for updating product list
          this.fetchSupplierById(this.supplierFetchedProducts[0].supplierId);
      }
      catch (error) {
        console.error("Errore nella modifica del materiale: ", error);
      }
    },
    async deleteMaterialSituation(materialId) {
      // DELETE - material situation

      try {
        await axios.delete('/api/situazione-materiali/remove/' + materialId)
          .then(function (response) {
            console.log("Materiale eliminato con successo.");

            // Delete material
            this.deleteMaterial(materialId);
          })
      }
      catch (error) {
        console.error("Errore nell'eliminazione del materiale': ", error);
      }
    },
    async deleteMaterial(materialId) {
      // DELETE - material

      try {
        await axios.delete('/api/materiali/remove/' + materialId)
          .then(function (response) {
            console.log("Situazione materiale eliminata con successo.");

            // Fetch supplier for updating product list
            this.fetchSupplierById(this.supplier.id);
          })
      }
      catch (error) {
        console.error("Errore nell'eliminazione della situazione materiale': ", error);
      }
    },
    setSupplierIdNull() {
      this.selectedSupplierId = null;
    },
    openNewProductDialog() {
      this.newProductDialog = true;
    },
    openEditProductDialog(id) {
      this.fetchMaterialSituation(id).then(() => {
        this.editProductDialog = true;
      });
    },
    openDeleteProductDialog(id) {
      this.deleteProductDialog = true;
    },
    closeNewProductDialog() {
      this.newProductDialog = false;
    },
    closeEditProductDialog() {
      this.editProductDialog = false;
    },
    closeDeleteProductDialog() {
      this.deleteProductDialog = false;
    }
  },
  getters: {
    shouldBeOpen() {
      return this.newProductDialog;
    },
    editShouldBeOpen() {
      return this.editProductDialog;
    },
    deleteShouldBeOpen() {
      return this.deleteProductDialog;
    },
    getSelectedProductQuantity() {
      return this.productMaterialSituation.materialQuantity;
    }
  },
});