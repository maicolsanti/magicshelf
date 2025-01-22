import { Supplier } from "./supplier";

export class Product {
    id: number;
    description: string;
    brand: string;
    unitOfMeasure: string;
    unitPrice: number;
    supplier: Supplier

    constructor(id: number, description: string, brand: string, unitOfMeasure: string, unitPrice: number, supplier: Supplier) {
        this.id = id;
        this.description = description;
        this.brand = brand;
        this.unitOfMeasure = unitOfMeasure;
        this.unitPrice = unitPrice;
        this.supplier = supplier;
    }
}
