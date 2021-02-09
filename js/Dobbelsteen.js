/* Copyleft 2014*/
/* L. Benvenuti*/
/*globals console, confirm, prompt, document, window*/

/* constructor */
function Dobbelsteen() {
    this.ogen = Math.floor(6 * Math.random()) + 1;
    // this.imgArray = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"]; zie opm. regel 25
    this.img = "";

}

Dobbelsteen.prototype = {

    /* setImg() slaat de illustratie, die hoort bij this.ogen, op in this.img */
    setImg: function() {

        // this.img = imgArray[this.ogen]; Werkt niet, Weet niet waarom

        switch (this.ogen) {
        case 1:
            this.img = "one.png";
            break;
        case 2:
            this.img = "two.png";
            break;
        case 3:
            this.img = "three.png";
            break;
        case 4:
            this.img = "four.png";
            break;
        case 5:
            this.img = "five.png";
            break;
        case 6:
            this.img = "six.png";
            break;
        }

    },

    getOgen: function() {

        return this.ogen;
    },

    getImg: function() {

        return this.img;
    },

    /* werp() genereert een random getal tussen 1 en 6 en slaat de naam van de bijgehorende afbeeding op in attribuut this.img*/
    werp: function() {

        this.ogen = Math.floor(6 * Math.random()) + 1;
        this.setImg();
     },

    /* isEven() bepaalt of this.ogen even is.
    return: true als this.ogen even is, false als this.ogen oneven is */
    isEven: function() {

        return (this.ogen % 2 === 0);
    }

};
