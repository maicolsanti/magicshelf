export class Costumer {
    public id: number;
    public name: string;
    public surname: string;
    public cap: number;
    public istatCode: number;
    public email: string;
    public phoneNumber: string | null;

    constructor(id: number, name: string, surname: string, cap: number, istatCode: number, email: string, phoneNumber: string | null) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.cap = cap;
        this.istatCode = istatCode;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
