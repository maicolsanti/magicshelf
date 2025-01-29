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
    products: Product[0],
    location: null,
    supplierFetchedProducts: [] as FoundProduct[],
    materialSituations: [] as MaterialSituation[],
    productMaterialSituation: {} as MaterialSituation,
    newProduct: {} as Product,
    newProductDialog: false,
    editProductDialog: false,
    deleteProductDialog: false
  }),
  actions: {
    setSelectedProduct(productId, supplierId) {
        this.selectedProductId = productId;
        this.selectedSupplierId = supplierId;
        console.log("setted selected product " + productId);
    },
    async fetchSupplierById(id: Number) {
      try {
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

        console.log("fetched supplier products");
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchMaterialSituation(id: Number) {
      try {
        await axios.get('/api/situazione-materiali/getById/' + id).then(res => {
          const situation = res.data;
          this.productMaterialSituation = new MaterialSituation(
          situation.CODICE_MATERIALE,
          situation.QUANTITA
          );
        });
        console.log("fetched material situation " + this.productMaterialSituation.materialQuantity);
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchAllMaterialSituations() {
      try {
        this.materialSituations = await axios.get('/api/situazione-materiali/getAll/').then(res => res.data.map((fetchedSituation: any) => new MaterialSituation(
          fetchedSituation.CODICE_MATERIALE,
          fetchedSituation.QUANTITA
        )));
        console.log("fetched all material situations");
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchLocationByIstatCode() {
        //TODO add call using this.supplier.istatCode
        var fetchedLocation = new LocationDetails(1, 47020, "FC", "Emilia-Romagna", "Longiano");
        this.location = fetchedLocation;
        return true;
    },
    async insertQuantity(id, quantity) {
      try {
        await axios.post('/api/situazione-materiali/create', {
          custom_data: {
            CODICE_MATERIALE: id,
            QUANTITA: quantity
          }
        })
          .then(function (response) {
            console.log("quantity created");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));
          })
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async editQuantity(id, quantity) {
      try {
        await axios.put('/api/situazione-materiali/update/' + id, {
          custom_data: {
            QUANTITA: quantity
          }
        })
          .then(function (response) {
            console.log("quantity created");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));
          })
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async insertNewProduct(productDescription, productBrand, productUnit, productPrice, productQuantity, productImage, supplierId) {
      let responseId = 0;
      let formData = new FormData();
      console.log("supplier id: " + supplierId);
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
      formData.append('image', productImage);
      try {
        await axios.post('/api/materiali/create', 
          formData,
        {
          headers: {
          'Content-Type': 'multipart/form-data',
          }
        })
          .then(function (response) {
            console.log("new product created");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));
            responseId = response.data.id;
          })
          this.insertQuantity(responseId, productQuantity);
          this.fetchSupplierById(supplierId);
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async editProduct(productId,productDescription, productBrand, productUnit, productPrice, productQuantity, productImage, originalProduct) {
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
      formData.append('image', productImage);
      try {
        await axios.put('/api/materiali/update/' + productId, 
          formData,
        {
          headers: {
          'Content-Type': 'multipart/form-data',
          }
        })
          .then(function (response) {
            console.log("product edited");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));
          })
          if (this.productMaterialSituation.materialQuantity != productQuantity){
            this.editQuantity(productId, productQuantity);
          }
          this.fetchSupplierById(this.supplierFetchedProducts[0].supplierId);
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteMaterialSituation(materialId) {
      try {
        await axios.delete('/api/situazione-materiali/remove/' + materialId)
          .then(function (response) {
            console.log("material situation deleted");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));
            this.deleteMaterial(materialId);
          })
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async deleteMaterial(materialId) {
      try {
        await axios.delete('/api/materiali/remove/' + materialId)
          .then(function (response) {
            console.log("material situation deleted");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));
          })
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    setSupplierIdNull() {
      this.selectedSupplierId = null;
    },
    openNewProductDialog() {
      this.newProductDialog = true;
      console.log("should open")
    },
    openEditProductDialog(id) {
      this.fetchMaterialSituation(id).then(() => {
        this.editProductDialog = true;
      console.log("edit open")
      });
    },
    openDeleteProductDialog(id) {
      this.deleteProductDialog = true;
    },
    closeNewProductDialog() {
      this.newProductDialog = false;
      console.log("should close")
    },
    closeEditProductDialog() {
      this.editProductDialog = false;
      console.log("edit close")
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