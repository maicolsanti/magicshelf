import { Product } from "./product";
import { Supplier } from "./supplier";

export class ProductSearched {
  product: Product;
  distanceInKm: number;

  constructor(product: Product, distanceInKm: number) {
    this.product = product;
    this.distanceInKm = distanceInKm;
  }
}
