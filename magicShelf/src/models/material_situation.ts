export class MaterialSituation {
    public materialId: number;
    public materialQuantity: number

    constructor(
        materialId: number,
        materialQuantity: number,
    ) {
        this.materialId = materialId;
        this.materialQuantity = materialQuantity;
    }
}
