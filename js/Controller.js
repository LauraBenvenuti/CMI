/* Copyleft 2015*/
/* L. Benvenuti*/
/* D. de Vries*/
/* versie 12 Progressive Enhancement */
/*globals console, confirm, prompt, document, window*/

window.onload = function () {
    'use strict';

    var game, dobbelsteen, dobbelsteenImg, breedte, haltes;
    var spelersView = []; //bevat de elementen van de DOM-tree die de aapjes representeren
    var bordView = document.querySelector(".fields");
    
    var bordModel = [];    // bevat een array symbolen ['N','N','G','N','R']: 5 velden, 3 neutrale, 1 groene en 1 rode
    var spelersModel = []; // bevat een Array met de posities van de aapjes, bijv. [0,2,4]

    //var audio = new Audio('sfx/shake_dice.mp3');

    /* hulpfunctie move() verzorgt de verplaatsing van pion met index speler, dat wordt gerepresenteerd door aapje
       spelerImg
       moves: de tussenhalte van de pion (zonder animaties in deze versie zonder CSS)
       speler: index van de pion in Array SpelersModel
       spelerImg: Dom-element dat het aapje representeert*/
    function move(moves,speler){
        let velden = bordView.children; // array met velden
        
        if(moves == 'teleport'){ //teleport
            moves = 0;
        }

        spelersModel[speler] = moves;
   
        velden[moves].appendChild(spelersView[speler]);

    }

    /* hulpfunctie rolls() verzorgt het rollen van de Dobbelsteen, in deze versie zonder css zonder animatie */
    function rolls(){
        dobbelsteenImg.src = './images/'+dobbelsteen.getImg();

        //audio.pause();
        //audio.currentTime = 0;
        //audio.play();

    }

    /* functie werpDobbelsteen() is de eventhandler van de dobbelsteen.
       De functie simuleert de worp met de Dobbelsteen en geeft het resultaat weer, bepaalt de route van de pion die
       aan zet is, roept functie moves() aan en toont de ontstane toestand */
    function werpDobbelsteen () {
        let speler = game.getAanZet(); //de speler die aan zet is als deze functie wordt aangeroepen
    
        let zetten = '';
        let resultaatTekst = document.querySelector('#resultaat');
    
        //var spelerImg = spelersView[game.getAanZet()];
    
        dobbelsteen.werp();
        rolls();

        haltes = game.speel(dobbelsteen.getOgen());  //na deze aanroep is de volgende gameer aan zet
        console.log(haltes);

        //move pion
        for (let i=0; i < haltes.length; i++) {
            setTimeout(move, 1000, haltes[i], speler);
            zetten += haltes[i] + ' '
        }

        game.toon();
        resultaatTekst.textContent = 'speler '+ speler + ' gaat naar ' + zetten;

    }

    /* functie initBord() bouwt de weergave van het bord op */
    function initBord () {
        let regelsView = document.querySelector("aside");
        let veldView;

        for (let i = 0; i < bordModel.length; i++) {
            veldView = document.createElement('li');


            if (bordModel[i] == 'N'){
                veldView.className='neutraal';
                veldView.textContent = '-';
            }

            else if (bordModel[i] == 'G') {
                veldView.className = 'groen';
                veldView.textContent = 'G';
            }

            else {
                veldView.className='rood';
                veldView.textContent = 'R';
            }

            breedte = Math.floor((window.innerWidth-30) / bordModel.length);

            veldView.width = breedte;

            //veldView.width = 82;
            bordView.appendChild(veldView);

        }

        regelsView.value = game.getRegels();

    }

    game = new CMI(3,15);
 
    // Hier wordt een spel aangemaaakt met 3 pionnen en 15 velden. De velden worden random gevuld door game.init()
    game.init();

    bordModel = game.getBord();
    spelersModel = game.getPionnen();

    //de interface wordt opgebouwd: eerst het Bord, dan wordt de Array gevuld met img-elementen (de aapjes)
    initBord();

    spelersView[0] = document.getElementById('speler1');
    spelersView[1] = document.getElementById('speler2');
    spelersView[2] = document.getElementById('speler3');


    // Een Dobbelsteen-object wordt aangemaakt en de bijbehorende img wordt getoond
    dobbelsteen = new Dobbelsteen();
    dobbelsteen.setImg();

    dobbelsteenImg = document.querySelector("figure img");
    dobbelsteenImg.src = './images/'+dobbelsteen.getImg();

    // // de dobbelsteen wordt gekoppeld aan eventhandler werpDobbelsteen
    dobbelsteenImg.onclick = werpDobbelsteen;

    // weergave in de console voor testdoeleinden
    game.toon();

};
