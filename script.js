    //hangman game architecture
class HangmanGame{
    constructor(dados){
        this.dados = dados;
        this.boxWord = document.querySelector("#box-word");
        this.boxLetters = this.boxWord.children;
        this.tema = this.dados[parseInt(Math.random()* this.dados.length)];
        this.currentTema = this.tema.tema;
        this.currentWord = this.tema.array[parseInt(Math.random()*this.tema.array.length)];
        this.lives = 5;
    }

    // Word
    createWord(){
        document.querySelector("h1").textContent = this.currentTema;
        for(let i=0; i<this.currentWord.length; i++){
            let letter = document.createElement('div');
            letter.className = 'letter';
            this.boxWord.appendChild(letter);
        }
    }

    deleteWord(){
       let word = this.boxWord.querySelectorAll('.letter');
       for(let letter of word){
            letter.remove();
       }
    }

    // Menu
    createMenu(text){
        let body = document.querySelector('body');
        let menu = document.createElement('div');
        let h2Button = document.createElement('h2');
        let menuButton = document.createElement('button');
        let overlay = document.createElement('div');

        overlay.className = 'overlay';
        menu.id = 'menu';

        h2Button.innerHTML = text;
        menuButton.textContent = 'Restart';

        body.insertBefore(menu, body.firstChild);
        body.insertBefore(overlay,menu);
        document.querySelector('#menu').appendChild(h2Button);
        document.querySelector('#menu').appendChild(menuButton);

        menuButton.addEventListener('click', () => this.restart())
    }

    deleteMenu(){
        document.querySelector('.overlay').remove();
        document.querySelector('#menu').remove();
    }

    //Letters
    clearLetters(){
        let allKLetters = document.querySelectorAll(".t-letter");
        for(let kLetter of allKLetters){
            kLetter.classList.remove('btn-win');
            kLetter.classList.remove('btn-loss');
        }
    }

    restart(){
        this.deleteWord();
        this.clearLetters();
        this.deleteMenu();
        this.tema = this.dados[parseInt(Math.random()* this.dados.length)];
        this.currentTema = this.tema.tema;
        this.currentWord = this.tema.array[parseInt(Math.random()*this.tema.array.length)];
        this.createWord();
        this.lives = 5;
        document.querySelector('#lives h2').textContent = this.lives;
    }

    // Verificações letras
    checkLetter(letter, btn){
        let alternator = false;

        for(let i=0; i<this.currentWord.length; i++){
            if(letter == this.currentWord[i]){
                this.boxWord.children[i].textContent = letter;
                alternator = true;
                btn.classList.add('btn-win')
            }else{
                if(i == (this.currentWord.length -1) && alternator == false){
                    btn.classList.add('btn-loss');
                    this.lives --;
                    document.querySelector('#lives h2').textContent = this.lives;
                    alternator = false;
                }
            }
        } 
    }
}

    //Keyboard architecture
class Keyboard{
    constructor(game){
        this.game = game;
        this.button = null;
        this.lastkey = null;
    }
   
    btnPress(event){
        this.button = event.target;
        this.lastkey = event.target.textContent;
        this.game.checkLetter(this.lastkey, this.button) 
        let victory = Array.from(this.game.boxLetters).every(letter => letter.textContent.trim() !== '')

        if(this.game.lives == 0){
            this.game.createMenu(`${this.game.currentWord}<br> Game over`);
        }

        if(victory){
            this.game.createMenu('Parabéns');
        }    
    }
}

    //Hangman and Keyboard instance
window.addEventListener('DOMContentLoaded',function(){
    fetch("dados.json")
    .then(response => response.json())
        .then((dados) => {
            const hang = new HangmanGame(dados);
            const keyb = new Keyboard(hang);

            hang.createWord();

            //Keyboard
            const btnLetters = document.querySelectorAll('.t-letter');
            for(let i=0; i<btnLetters.length; i++){
                 btnLetters[i].addEventListener('click', keyb.btnPress.bind(keyb));
            }   
        })
})



