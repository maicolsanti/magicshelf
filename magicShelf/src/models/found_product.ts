export class FoundProduct {
    public supplierId: number;
    public supplierName: string;
    public supplierSurname: string;
    public supplierCompanyName: string;
    public supplierVatNumber: string;
    public supplierTaxCode: string;
    public supplierZipCode: number;
    public supplierIstatCode: number;
    public supplierAddress: string;
    public supplierPhoneNumber: number;
    public materialId: number;
    public materialDescription: string;
    public materialBrand: string;
    public materialUnitOfMeasure: string;
    public materialUnitPrice: string;
    public districtAbbreviation: string;
    public districtName: string;
    public regionName: string;
    public locationName: string;
    public imageBase64: string;

    constructor(
        supplierId: number,
        supplierName: string,
        supplierSurname: string,
        supplierCompanyName: string,
        supplierVatNumber: string,
        supplierTaxCode: string,
        supplierZipCode: number,
        supplierIstatCode: number,
        supplierAddress: string,
        supplierPhoneNumber: number,
        materialId: number,
        materialDescription: string,
        materialBrand: string,
        materialUnitOfMeasure: string,
        materialUnitPrice: string,
        districtAbbreviation: string,
        districtName: string,
        regionName: string,
        locationName: string,
        imageBase64: string
    ) {
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.supplierSurname = supplierSurname;
        this.supplierCompanyName = supplierCompanyName;
        this.supplierVatNumber = supplierVatNumber;
        this.supplierTaxCode = supplierTaxCode;
        this.supplierZipCode = supplierZipCode;
        this.supplierIstatCode = supplierIstatCode;
        this.supplierAddress = supplierAddress;
        this.supplierPhoneNumber = supplierPhoneNumber;
        this.materialId = materialId;
        this.materialDescription = materialDescription;
        this.materialBrand = materialBrand;
        this.materialUnitOfMeasure = materialUnitOfMeasure;
        this.materialUnitPrice = materialUnitPrice;
        this.districtAbbreviation = districtAbbreviation;
        this.districtName = districtName;
        this.regionName = regionName;
        this.locationName = locationName;
        this.imageBase64 = imageBase64;
    }
}
