/* Copyleft 2015*/
/* L. Benvenuti*/
/* J. Faber*/
/* versie 12 */
/*globals console, confirm, prompt, document, window*/


/*constructor voor CMI-object. Object bevat de spelregels: hoe wordt het spel gespeeld en hoe wordt de toestand getoond.
aantalPionnen: het aantal pionnen waarmee wordt gespeeld
omvangBord: aantal velden */
function CMI(aantalPionnen, omvangBord) {
    this.positiesPionnen = []; //bevat de posities van de pionnen, bijv. [0,4,2]: pionnen resp. op positie 0, 4 en 2.
    this.bord = [];    //bevat de opbouw van het bord: ['N','N','G','N','R']: 5 velden, 3 neutrale, 1 groene 1 rode
    this.regels = "Spelregels: Groen: stap vooruit; Rood: 2 stappen achteruit; Neutraal (beige): geen invloed";
    this.aanZet = 0;    //index in pionnen-array. 0<=aanZet<pionnen.length
    this.aantal = aantalPionnen;
    this.omvang = omvangBord;

}


CMI.prototype = {

    /* init() initialiseert het spel: maakt een Array pionnen aan en vult Array bord met velden die opdrachten bevatten.
    Er zijn 2 velden met echte opdrachten en een veld met een (lege)neutrale opdracht*/
    init: function() {

        let worp;
        let arrayVelden = [];


        for (let i = 0; i < this.omvang; i++) {
            worp = Math.random();

            if (worp < 0.65 ){
                arrayVelden[i] = 'N';
            }
            else if ((worp < 0.85 )&&(i != this.omvang-1)){ //laatst veld is noooit Groen
                arrayVelden[i] = 'G';
            }
            else if ((worp >= 0.85)&&(i<=1)){
                arrayVelden[i] = 'N';
            }
            else { // (worp >= 0.85)&&(i>1), eerste/tweede zijn nooit Rood (ivm -2 stappen)
                arrayVelden[i] = 'R';
            }
        }

        this.bord = arrayVelden;

        for (let i=0; i<this.aantal; i++){
            this.positiesPionnen[i] = 0;
        }

        this.aanZet=0;
    },

    /* getPionnen() geeft het Array terug met de posities van de pionnen */
    getPionnen: function() {

        return this.positiesPionnen;
    },

    /* getBord() geeft het Array terug met de configuratie van het bord */
    getBord: function() {

        return this.bord;
    },

    /* getRegels() geeft een String terug met de regels*/
    getRegels: function() {

        return this.regels;
    },

    /* getAanZet() geeft terug, welke pion aan zet is.
    return: de index van de pion aan zet is*/
    getAanZet: function() {

        return this.aanZet;
    },

    /* zet() laat een pion een aantal stappen zetten.
     Als pion daarmee "uit" het bord loopt, loopt hij aan de andere kant weer het bord in.
     wordt aangeroepen door speel(). 
     pion: bevat de index van de pion uit Array pionnen dat moet worden verzet
     stappen: geeft aan, hoeveel stappen de pion moet zetten*/
    zet: function (pion,stappen) {

        this.positiesPionnen[pion]= (this.positiesPionnen[pion]+stappen) % this.bord.length;
    },

    /* speel() geeft een Array terug met de velden die pion aanZet aandoet.
     Deze methode verwerkt een worp met de dobbelsteen. De pion die op dat moment aan zet is, wordt eerst
     verzet, waarna een eventuele opdracht wordt verwerkt van het veld waar de pion op terecht is gekomen*/
    speel: function(worp) {
        let veld;
        //let positie;
        let stappen;
        let haltes = [];

        // de worp wordt verwerkt

        //hier wordt gekeken, of de pion met deze zet uit het bord loopt
        if (this.positiesPionnen[this.aanZet]+worp > this.bord.length-1) {
                         haltes[0] = 'teleport';
            }

        //dan wordt de zet verwerkt
        this.zet(this.aanZet, worp);
        haltes.push(this.positiesPionnen[this.aanZet]);


        // hier wordt gekeken of nog zetten moet worden gedaan:
        // Het laatste element van haltes bevat altijd de index van een veld.
        veld = this.bord[haltes[haltes.length-1]];

        // dan wordt bepaald, welke opdracht veld bevat, dus hoeveel stappen de pion nog moet maken.
        if (veld == 'G') {

            stappen = 1;

        } else if (veld == 'R') {

            stappen = -2;

        } else {

            stappen = 0;
        }
        
        // en worden eventuele aanvullende stappen gezet
        if (stappen != 0) {

            //er wordt gekeken, of de pion met deze zet uit het bord loopt
            if (this.positiesPionnen[this.aanZet]+stappen > this.bord.length-1) {
                             haltes.push('teleport');
                }

            //en wordt de zet verwerkt
            this.zet(this.aanZet,stappen);
            haltes.push(this.positiesPionnen[this.aanZet]);
        }


        // tot slot wordt bepaald, welke pion aan zet is
        this.aanZet = (this.aanZet+1) % this.positiesPionnen.length;

        return haltes;
    },

    /* toon() toont de toestand van het bord in de console, en de positie van alle pionnen
       deze methode wordt alleen gebruikt voor testdoeleinden*/
    toon: function() {
        let stringPion = "";
        let stringBord = "";

        //voor iedere Pion wordt een stringPion opgebouwd
        for (let i = 0; i < this.positiesPionnen.length; i++) {

            //string Pion bevat een spatie voor ieder veld waar geen pion op staat
            for (let j = 0; j < this.positiesPionnen[i] ; j++) {
                stringPion = stringPion + " .  ";
            };

            //de laatste plaatsen van stringPion bevatten het symbool van de pion
            stringPion = stringPion + " "+ i;

            //stringPion wordt weergegeven en weer leeg gemaakt (voor de volgende Pion)
            console.log(stringPion);
            stringPion = "";
        }

        // stringBord geeft het bord weer
        for (let i = 0; i < this.bord.length ; i++) {
            stringBord = stringBord + i + ":" + this.bord[i] + " ";
        };
        console.log(stringBord);

        console.log( "Aan zet pion" + this.aanZet + ": " + this.positiesPionnen[this.aanZet] );
    }

};
