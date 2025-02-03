export class Profile {
    public id: number;
    public name: string;
    public surname: string;
    public companyName: string | null;
    public vatNumber: string | null;
    public fiscalCode: string | null;
    public cap: number;
    public istatCode: number;
    public address: string | null;
    public email: string;
    public phoneNumber: string | null;
    public role: number;

    constructor(id: number, name: string, surname: string, companyName: string | null, vatNumber: string | null, fiscalCode: string | null,  cap: number, istatCode: number, address: string | null, email: string, phoneNumber: string | null, role: number) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.companyName = companyName;
        this.vatNumber = vatNumber;
        this.fiscalCode = fiscalCode;
        this.cap = cap;
        this.istatCode = istatCode;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }
}
