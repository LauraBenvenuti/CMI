/* Copyleft 2014*/
/* L. Benvenuti*/
/*globals console, confirm, prompt, document, window*/

function Dobbelsteen() {
    this.ogen = Math.floor(6 * Math.random()) + 1;
    this.imgArray = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"];
    this.img = "";

    /* werp() genereert een random getal tussen 1 en 6 en slaat de naam van de bijgehorende afbeeding op in attribuut this.img*/
    this.werp = function() {

        this.ogen = Math.floor(6 * Math.random()) + 1;
        this.setImg();
    };

    /* setImg() slaat de illustratie, die hoort bij this.ogen, op in this.img */
    this.setImg = function() {

        this.img = imgArray[this.ogen];
    }; 

    /* setImgArray() is een hulpfunctie, waarmee de afbeeldingen kunnen worden aagepast. 
    dobbelsteenAgfbeeldingen: array namen van nieuwe afbeeldingen. Deze afbeeldingen bevinden zich in de images-map */ 
    this.setImgArray = function(dobbelsteenAfbeeldingen) {

        this.imgArray = dobbelsteenAfbeeldingen;
    };

    this.getOgen = function() {

        return this.ogen;
    };

    this.getImg = function() {

        return this.img;
    };

    /* isEven() bepaalt of this.ogen even is.
    return: true als this.ogen even is, false als this.ogen oneven is */
    this.isEven = function() {
        
        return (this.ogen % 2 === 0);
    }
}
