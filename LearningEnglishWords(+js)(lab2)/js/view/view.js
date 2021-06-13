export default class View{
    constructor(){

    }

    printWordsForLearning(englishWords, UAWords){
        let divWordsForLearning = document.getElementById("wordsForLearning");
        if(divWordsForLearning != null){
            for(let i = 0; i < englishWords.length; i++){
                let cardForLearning = `
                    <div class="col mb-4">
                        <div class="card border-primary mb-3  block-opacity">
                            <div class="card-header">Header</div>
                            <div class="card-body text-center text-primary p-0">
                                <p class="card-text pb-4 card-text-language">${englishWords[i]}</p>
                                <p class="card-text card-text-metalanguage">${UAWords[i]}</p>
                            </div>
                            <div class="card-footer text-center">
                                <button type="button" class="btn btn-primary" id = "learningWord${i}">Вивчаю!</button>
                            </div>
                        </div>
                    </div>
                `

                divWordsForLearning.insertAdjacentHTML("beforeend", cardForLearning);
            }
        }
    }

    onProfile(){
        let profileMenuOn = document.getElementById("profileId");

        profileMenuOn.innerHTML = '';

        let profileMenuOnStr = `
            <li class="nav-item">
                <a class="nav-link" id = "singOut" href="index.html">Вийти</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">|</a>
            </li>
            <li class="nav-item pl-1">
                <a class="nav-link" id = "profile" href="profile.html">Профіль</a>
            </li>
        `;
        profileMenuOn.insertAdjacentHTML("beforeend", profileMenuOnStr);
    }

    offProfile(){
        let profileMenuOff = document.getElementById("profileId");

        profileMenuOff.innerHTML = '';

        let profileMenuOffStr = `
            <li class="nav-item">
                <a class="nav-link" href="signup.html">Зареструватися</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">|</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="signin.html">Увійти</a>
            </li>
        `;
        profileMenuOff.insertAdjacentHTML("beforeend", profileMenuOffStr);
    }

    onProfilePage(profiles){
        let profile = profiles[localStorage.numberactiveProfile];

        if(document.getElementById("profileName")){
            document.getElementById("profileName").value = profile.name;
            document.getElementById("profileSurname").value = profile.surname;
            document.getElementById("profileBirthdate").value = profile.birthdate;
            document.getElementById("profileGender").value = profile.gender;
            document.getElementById("profileEmail").value = profile.email;

            let profileLearningWords = document.getElementById("profileLearningWords");
            for(let i = 0; i < profile.learningEngWords.length; i++){
                let listLearning = `
                    <li class="list-group-item">
                        <div class="row px-sm-5">
                            <div class="col-6 text-left">${profile.learningEngWords[i]}</div>
                            <div class="col-6 text-right">${profile.learningUAWords[i]}</div>
                        </div>
                    </li>
                `

                profileLearningWords.insertAdjacentHTML("beforeend", listLearning);
            }

            let profileLearnedWords = document.getElementById("profileLearnedWords");
            for(let i = 0; i < profile.learnedEngWords.length; i++){
                let listLearned = `
                    <li class="list-group-item">
                        <div class="row px-sm-5">
                            <div class="col-6 text-left">${profile.learnedEngWords[i]}</div>
                            <div class="col-6 text-right">${profile.learnedUAWords[i]}</div>
                        </div>
                    </li>
                `

                profileLearnedWords.insertAdjacentHTML("beforeend", listLearned);
            }
        }
    }

    onTestingPage(englishWord, trueAnswer, falseAnswer1, falseAnswer2){
        this.testAnswer('black', 'Як переводиться слово?');
        if(document.getElementById("testingEnglishWord")){
            document.getElementById("testingEnglishWord").innerHTML = englishWord;
            document.getElementById("trueAnswer").innerHTML = trueAnswer;
            document.getElementById("falseAnswer1").innerHTML = falseAnswer1;
            document.getElementById("falseAnswer2").innerHTML = falseAnswer2;
        }
    }

    testAnswer(color, text){
        let testingCard = document.getElementById("testingComment");
        testingCard.style.color = color;
        testingCard.innerHTML = text;
    }

    learnedAllWords(){
        this.onTestingPage("Ви вивчили всі слова", " ", " ", "");
        this.testAnswer('#00dd00', 'Вітаємо!!!');
        document.getElementById("trueAnswer").classList.add("disabled", "border-0");
        document.getElementById("falseAnswer1").classList.add("disabled", "border-0");
        document.getElementById("falseAnswer2").classList.add("disabled", "border-0");
        document.getElementById("nextWord").classList.remove("btn-danger");
        document.getElementById("nextWord").classList.add("disabled", "border-0");
        document.getElementById("nextWord").innerHTML = "";
    }
}