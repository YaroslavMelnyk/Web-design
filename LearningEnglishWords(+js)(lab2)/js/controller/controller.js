export default class Controller{
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.model.wordsForLearning();
        this.exitFromProfile();
        this.signUp();
        this.signIn();
        this.onProfile();
        this.onclickLearningWord();
        this.onTestingPage();
    }

    exitFromProfile(){
        if(document.querySelector('#singOut')){
            document.querySelector('#singOut').addEventListener('click', (e)=>this.model.exitFromProfile(e));
        }
    }

    signUp(){
        if(document.querySelector('#signUpButton')){
            document.querySelector('#signUpButton').addEventListener('click', (e)=>this.model.singUp(e));
        }
    }

    signIn(){
        if(document.querySelector('#signInButton')){
            document.querySelector('#signInButton').addEventListener('click', (e)=>this.model.signIn(e));
        }
    }

    onProfile(){
        if(document.querySelector('#profile')){
            document.querySelector('#profile').addEventListener('load', this.view.onProfilePage(this.model.getVariableFromLocalStore("profiles")));
        }
    }

    onclickLearningWord(){
        for(let i = 0; i < this.model.allEngishWords.length; i++){
            if(document.querySelector(`#learningWord${i}`)){
                document.querySelector(`#learningWord${i}`).addEventListener('click', (e)=>this.model.onclickLearningWord(i));
            }
        }
    }

    onTestingPage(){
        if(document.querySelector('#testingCard')){
            if(localStorage.numberactiveProfile){
                let profile = this.model.getArrayFromLocalStore("profiles")[localStorage.numberactiveProfile];
                let arraysWords = {
                arrayEngWords: profile.learningEngWords,
                arrayUAWords: profile.learningUAWords
                }
                document.querySelector('#testingCard').addEventListener('load', this.model.onTestingPage(arraysWords, profile));
                document.querySelector('#nextWord').addEventListener('click', (e)=>this.model.onTestingPage(arraysWords, profile));

                document.querySelector('#trueAnswer').addEventListener('click', (e)=>this.model.onclickTrueAnswer(profile));
            } else {
                alert("Ви не зареестровані або не ввійшлив профіль");
            }
        }
    }
}

