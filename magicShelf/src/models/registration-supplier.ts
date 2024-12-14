class RegistrazioneFornitore {
    id: String;
    name: String;
    surname: String;
    companyName: String;
    vatNumber: String;
    fiscalCode: String;
    email: String;
    phoneNumber: String;
    cap: BigInt;
    town: String;
    password: String;
    constructor(id, name, surname, companyName, vatNumber, fiscalCode, email, phoneNumber, cap, town, password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.companyName = companyName;
        this.vatNumber = vatNumber;
        this.fiscalCode = fiscalCode;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.cap = cap;
        this.town = town,
        this.password = password;
    }
}