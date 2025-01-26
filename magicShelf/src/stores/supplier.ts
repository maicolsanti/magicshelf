import { defineStore } from 'pinia'
import { Supplier } from '@/models/supplier';
import { Product } from '@/models/product';
import { LocationDetails } from '@/models/location-details';
import axios from 'axios';
import { FoundProduct } from '@/models/found_product';

// for api calls see https://pinia.vuejs.org/core-concepts/actions.html

export const useSupplierStore = defineStore('supplierStore', {
  state: () => ({
    selectedSupplierId: null,
    selectedProductId: null,
    supplier: null,
    products: Product[0],
    location: null,
    supplierFetchedProducts: [] as FoundProduct[],
    newProduct: {} as Product,
    newProductDialog: false
  }),
  actions: {
    setSelectedProduct(productId, supplierId) {
        this.selectedProductId = productId;
        this.selectedSupplierId = supplierId;
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
    async fetchLocationByIstatCode() {
        //TODO add call using this.supplier.istatCode
        var fetchedLocation = new LocationDetails(1, 47020, "FC", "Emilia-Romagna", "Longiano");
        this.location = fetchedLocation;
        return true;
    },
    async insertNewProduct(productDescription, productBrand, productUnit, productPrice, productQuantity, productImage, supplierId) {
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
        {headers: {
          'Content-Type': 'multipart/form-data',
        },})
          .then(function (response) {
            console.log("new product created");
            console.log("response - status: " + JSON.stringify(response.status) + " - message:" + JSON.stringify(response.data.message));
          })
      }
      catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async insertQuantity(id, quantity) {
      try {

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
    closeNewProductDialog() {
      this.newProductDialog = false;
      console.log("should close")
    }
  },
  getters: {
    shouldBeOpen() {
      return this.newProductDialog;
    }
  },
});