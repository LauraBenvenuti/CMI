/* Copyleft 2015*/
/* L. Benvenuti*/
/* D. de Vries*/
/* J. Faber*/
/* versie 10.2 */
/*globals console, confirm, prompt, document, window*/

window.onload = function () {
    'use strict';

    var game, dobbelsteen, dobbelsteenImg, breedte, haltes;
    var spelersView = []; //bevat de elementen van de DOM-tree die de aapjes representeren
    var spelersModel;     // bevat een Array met de posities van de aapjes, bijv. [0,2,4]
    var audio = new Audio('sfx/shake_dice.mp3');

    /* hulpfunctie moves() verzorgt de animaties van pion met index speler, dat wordt gerepresenteerd door aapje
       spelerImg, terwijl hij een tussenhalte maakt op het veld met index moves
       moves: de tussenhalte van de pion
       speler: index van de pion in Array SpelersModel
       spelerImg: Dom-element dat het aapje representeert*/
    function move(moves, speler, spelerImg){
        //moves = haltes[i], het veld waar de pion een tussenstop maakt


        if(moves == 'teleport'){ //teleport
            spelerImg.classList.remove('teleport');
            setTimeout(function (){ // hack to retrigger
                spelerImg.classList.add('teleport');
            }, 500);
            setTimeout(function (){ // delay
                spelerImg.style.left = -60 + "px";
            }, 750);
        }
        else{
            spelerImg.style.left = moves * 68 + "px";
            //spelerImg.classList.remove('jump');
            //setTimeout(function (){ // hack to retrigger
            //      spelerImg.classList.add('jump');
            //}, 1500);
        }

    }

    /* hulpfunctie rolls() verzorgt de animatie van de Dobbelsteen */
    function rolls(){
        dobbelsteenImg.src = './img/'+dobbelsteen.getImg();

        /* unset and set classes to trigger animation */
        dobbelsteenImg.classList.remove('rotatein');
        dobbelsteenImg.parentElement.classList.remove('slidein');

        setTimeout(function (){ // hack to retrigger
            dobbelsteenImg.classList.add('rotatein');
            dobbelsteenImg.parentElement.classList.add('slidein');
        }, 1);

        audio.pause();
        audio.currentTime = 0;
        audio.play();

    }

    /* functie werpDobbelsteen() is de eventhandler van de dobbelsteen.
       De functie simuleert de worp met de Dobbelsteen en geeft het resultaat weer, bepaalt de route van de pion die
       aan zet is, roept functie moves() aan en toont de ontstane toestand */
    function werpDobbelsteen () {
        var speler = game.getAanZet(); //de speler die aan zet is als deze functie wordt aangeroepen
        var spelerImg = spelersView[game.getAanZet()];
        //var posx = parseInt(spelerImg.style.left.substr(0,spelerImg.style.left.length-2));
        var timeout = -1000;

        dobbelsteen.werp();
        rolls();

        haltes = game.speel(dobbelsteen.getOgen());  //na deze aanroep is de volgende gameer aan zet
        console.log(haltes);

        //move pion
        for (var i=0; i < haltes.length; i++) {
            setTimeout(move, timeout+=1000, haltes[i], speler, spelerImg);
        }

        game.toon();

    }

    /* functie initBord() bouwt de weergave van het bord op */
    function initBord () {
        var bordModel = game.getBord();
        //bordModel is een array symbolen ['N','N','G','N','R']: 5 velden, 3 neutrale, 1 groene en 1 rode
        var bordView = document.getElementById("speelBord");
        var regelsView = document.getElementById("regels");
        var veldView;

        for (var i = 0; i < bordModel.length; i++) {
            veldView = document.createElement('li');


            if (bordModel[i] == 'N'){
                veldView.className='neutraal';
            }

            else if (bordModel[i] == 'G') {
                veldView.className='groen';
            }

            else {
                veldView.className='rood';
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
    spelersModel = game.getPionnen();

    //de interface wordt opgebouwd: eerst het Bord, dan wordt de Array gevuld met img-elementen (de aapjes)
    initBord();

    spelersView[0] = document.getElementById('speler1');
    spelersView[1] = document.getElementById('speler2');
    spelersView[2] = document.getElementById('speler3');


    // Een Dobbelsteen-object wordt aangemaakt en de bijbehorende img wordt getoond
    dobbelsteen = new Dobbelsteen();
    dobbelsteen.setImg();

    dobbelsteenImg = window.document.getElementById("dobbelsteen");
    dobbelsteenImg.src = './img/'+dobbelsteen.getImg();

    // de dobbelsteen wordt gekoppeld aan eventhandler werpDobbelsteen
    dobbelsteenImg.onclick = werpDobbelsteen;

    // weergave in de console voor testdoeleinden
    game.toon();

};
