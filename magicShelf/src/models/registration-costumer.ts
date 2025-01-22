class RegistrazioneCliente {
    id: String;
    name: String;
    surname: String;
    email: String;
    phoneNumber: String;
    cap: BigInt;
    town: String;
    password: String;
    constructor(id, name, surname, email, phoneNumber, cap, town, password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.cap = cap;
        this.town = town,
        this.password = password;
    }

    // getNomeCompleto() {
    //     return `${this.nome} ${this.cognome}`;
    // }
}