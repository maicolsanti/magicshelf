export class Supplier {
    public id: number;
    public name: string;
    public surname: string;
    public companyName: string;
    public vatNumber: string;
    public fiscalCode: string;
    public phoneNumber: string | null;
    public email: string;
    public cap: number;
    public istatCode: number;

    constructor(id: number, name: string, surname: string, companyName: string, vatNumber: string, fiscalCode: string, phoneNumber: string | null, email: string, cap: number, istatCode: number) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.companyName = companyName;
        this.vatNumber = vatNumber;
        this.fiscalCode = fiscalCode;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.cap = cap;
        this.istatCode = istatCode;
    }
}
