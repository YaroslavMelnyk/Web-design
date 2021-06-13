export default class Profile{
    constructor(_id, _name, _surname, _gender, _birthdate, _email, _password){
        this.id = _id;
        this.name = _name;
        this.surname = _surname;
        this.gender = _gender;
        this.birthdate = _birthdate;
        this.email = _email;
        this.password = _password;

        this.learningEngWords = [];
        this.learningUAWords = [];

        this.learnedEngWords = [];
        this.learnedUAWords = [];
    }
}