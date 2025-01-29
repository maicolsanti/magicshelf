import { Supplier } from "./supplier";

export class Product {
    id: number;
    description: string;
    brand: string;
    unitOfMeasure: string;
    unitPrice: number;
    quantity: number;
    supplierId: number

    constructor(id: number, description: string, brand: string, unitOfMeasure: string, unitPrice: number, quantity: number, supplierId: number) {
        this.id = id;
        this.description = description;
        this.brand = brand;
        this.unitOfMeasure = unitOfMeasure;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.supplierId = supplierId;
    }
}
