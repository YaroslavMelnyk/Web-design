import Profile from "./profile.js"
import View from "../view/view.js"

export default class Model {
    constructor(){
        this.view = new View();

        this.allEngishWords = [
            "way", "life", "child", "world", 
            "school", "state", "family", "student", 
            "group", "time", "information", "people", 
            "thing", "community", "man", "woman"];
        this.allUAWords = [
            "шлях", "життя", "дитина", "світ", 
            "школа", "держава", "родина", "студент", 
            "група", "час", "інформація", "люди", 
            "річ", "спільнота", "чоловік", "жінка"];
        //this.wordsForLearning();

        localStorage.numberactiveProfile;
        this.onOffProfile();
    }

    exitFromProfile(){
        this.inProfile = false;
        localStorage.numberactiveProfile = "";
        this.onOffProfile();
    }

    onOffProfile(){
        let profileMenu = document.getElementById("profileId");
        if(localStorage.numberactiveProfile){
            this.view.onProfile();
        } else {
            this.view.offProfile();
        }
    }

    wordsForLearning(){
        this.view.printWordsForLearning(this.allEngishWords, this.allUAWords);
    }

    singUp(){
        let name = document.getElementById("signUpName").value;
        let surname = document.getElementById("signUpSurname").value; 
        let gender = document.querySelector('input[name="signUpGender"]:checked').value
        let birthdate = document.getElementById("signUpBirthdate").value; 
        let email = document.getElementById("signUpEmail").value; 
        let password = document.getElementById("signUpPassword").value; 
        let repeadPassword = document.getElementById("signUpRepeadPassword").value; 
        if(password == repeadPassword){
            //let profiles = JSON.parse(localStorage.getItem('profiles') || "[]");
            let profiles = this.getArrayFromLocalStore("profiles");
            let newProfile = new Profile(profiles.length, name, surname, gender, birthdate, email, password);
            this.addElementToLocalStoreArray("profiles", newProfile);
        } else {
            alert("Паролі не співпадають");
        }
    }

    signIn(){
        let email = document.getElementById("signInEmail").value; 
        let password = document.getElementById("signInPassword").value; 
        let profiles = this.getArrayFromLocalStore("profiles");
        let inProfile = false;
        for(let i = 0; i < profiles.length; i++){
            if(profiles[i].email == email && profiles[i].password == password){
                localStorage.numberactiveProfile = i;
                //this.setVariableToLocalStore("activeProfile", profiles[i]);
                inProfile = true;
                break;
            }
        }
        if(!inProfile) alert("Логін або пароль неправильні");
    }

    onclickLearningWord(index){
        if(localStorage.numberactiveProfile){
            let profile = this.getArrayFromLocalStore("profiles")[localStorage.numberactiveProfile];
            let inLearningLists = false;
            profile.learningEngWords.forEach(element => {
                if(element == this.allEngishWords[index]) {
                    inLearningLists = true;
                    return;
                }
            });
            if(!inLearningLists){
                    profile.learnedEngWords.forEach(element => {
                    if(element == this.allEngishWords[index]) {
                        inLearningLists = true;
                        return;
                    }
                });
            }
            if(!inLearningLists){
                profile.learningEngWords.push(this.allEngishWords[index]);
                profile.learningUAWords.push(this.allUAWords[index]);
            }
            this.rewriteElementToLocalStoreArray("profiles", profile, localStorage.numberactiveProfile);
        } else {
            alert("Ви не зареестровані або не ввійшлив профіль");
        }
        
    }

    onTestingPage(arraysWords, profile){
        if(arraysWords.arrayEngWords.length){
            /*if(arraysWords.arrayEngWords.length <= 2){
                arraysWords.arrayEngWords = arraysWords.arrayEngWords.concat(profile.learningEngWords);
                arraysWords.arrayUAWords = arraysWords.arrayUAWords.concat(profile.learningUAWords);
            }*/
            this.view.onTestingPage(arraysWords.arrayEngWords.shift(), arraysWords.arrayUAWords.shift(), this.allUAWords[this.getRandomInt(this.allUAWords.length)], 
                this.allUAWords[this.getRandomInt(this.allUAWords.length)]);
        } else {
            this.view.learnedAllWords();
        }
    }

    onclickTrueAnswer(profile){
        let engWord = document.getElementById("testingEnglishWord").innerHTML;
        let UAWord = document.getElementById("trueAnswer").innerHTML;
         
        let inLearniedLists = false;
        profile.learnedEngWords.forEach(element => {
            if(element == engWord) {
                inLearniedLists = true;
                return;
            }
        });
         if(!inLearniedLists){
            profile.learnedEngWords.push(engWord);
            profile.learnedUAWords.push(UAWord);

            profile.learningEngWords.splice(profile.learningEngWords.indexOf(engWord), 1);
            profile.learningUAWords.splice(profile.learningUAWords.indexOf(UAWord), 1);
        }
        this.rewriteElementToLocalStoreArray("profiles", profile, localStorage.numberactiveProfile);
        
        this.view.testAnswer('#00dd00', 'Правильно!!!')
    }

    addElementToLocalStoreArray(localStorageVariable, newElement){
        var array = JSON.parse(localStorage.getItem(localStorageVariable) || "[]");
        array.push(newElement);
        localStorage.setItem(localStorageVariable, JSON.stringify(array));
    }

    rewriteElementToLocalStoreArray(localStorageVariable, newElement, index){
        var array = JSON.parse(localStorage.getItem(localStorageVariable) || "[]");
        array[index] = newElement;
        localStorage.setItem(localStorageVariable, JSON.stringify(array));
    }

    deleteElementFromLocalStoreArray(localStorageVariable, elem){
        var array = JSON.parse(localStorage.getItem(localStorageVariable) || "[]");
        array.splice(array.indexOf(elem, 0), 1);
        localStorage.setItem(localStorageVariable, JSON.stringify(array));
    }

    getArrayFromLocalStore(localStorageVariable){
        return JSON.parse(localStorage.getItem(localStorageVariable) || "[]");
    }

    getVariableFromLocalStore(localStorageVariable){
        return JSON.parse(localStorage.getItem(localStorageVariable) || "");
    }

    setVariableToLocalStore(localStorageVariable, value){
        localStorage.setItem(localStorageVariable, JSON.stringify(value));
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * (max));
    }

}