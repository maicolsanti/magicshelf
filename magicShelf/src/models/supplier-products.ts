import { Product } from "./product";
import { Supplier } from "./supplier";

export class SupplierPorducts {
    public supplier: Supplier;
    public products: Product[];

    constructor(supplier: Supplier, products: Product[]) {
        this.supplier = supplier;
        this.products = products;
    }
}
