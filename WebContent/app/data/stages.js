'use strict';
define(["jquery"], function($){
	var data = {
		/**
		 * Stages
		 */
		"boulangerie1" : {
			"gagne" : {lieu : "cuisine", stage : 1},
			"cinematique" : ["cinematique-didactitiel", "cinematique-boulangerie1", "cinematique-boulangerie2"],
			"start" : {
				x : 100,
				y : 350
			},
			"back" : [
			  {id: "etagere-vide", x: 50, y: 200},
			  {id: "etagere1", x: 275, y: 200},
			  {id: "lustre", x: 300, y: 0},
			  {id: "etagere2", x: 500, y: 200},
			  {id: "niche-pain1", x: 1000, y: 100},
			  {id: "niche-vide1", x: 1225, y: 100},
			  {id: "niche-baguette", x: 1450, y: 100},
			  {id: "niche-vide2", x: 1100, y: 300},
			  {id: "niche-vide3", x: 1300, y: 300},
			  {id: "lustre", x: 1800, y: 0},
			  {id: "etagere-pain1", x: 2000, y: 250},
			  {id: "niche-pain2", x: 2500, y: 100},
			  {id: "niche-pain3", x: 2700, y: 150},
			  {id: "etagere-pain2", x: 3300, y: 200},
			  {id: "boulanger", x: 3600, y: 100},
			  {id: "etagere2", x: 4200, y: 100},
			  {id: "etagere3", x: 4600, y: 200},
			  {id: "etagere4", x: 4900, y: 300},
			  {id: "etagere-pain3", x: 5300, y: 200},
			  {id: "etagere-pain4", x: 5500, y: 100},
			  {id: "lustre", x: 5900, y: 0},
			  {id: "etagere-pain1", x: 6400, y: 250},
			  {id: "niche-pain2", x: 6800, y: 100},
			  {id: "etagere2", x: 7300, y: 200},
			  {id: "niche-pain1", x: 7500, y: 100},
			  {id: "niche-vide1", x: 7700, y: 100},
			  {id: "niche-baguette", x: 8000, y: 100},
			  {id: "niche-vide2", x: 7550, y: 300},
			  {id: "niche-vide3", x: 7750, y: 300},
			  {id: "etagere-vide", x: 8000, y: 200},
			  {id: "etagere1", x: 8300, y: 200},
			  {id: "lustre", x: 9000, y: 0},
			  {id: "etagere2", x: 9300, y: 200},
			  {id: "niche-pain1", x: 9300, y: 100},
			  {id: "niche-pain3", x: 9500, y: 150},
			  {id: "etagere-pain2", x: 9700, y: 200},
			  {id: "boulanger", x: 10000, y: 100}
			],
			"elements" : [
			  {id: "eclair-cafe", x: -30, y: 400},
			  {id: "eclair-cafe", x: 140, y: 455},
			  {id: "choux", x: 350, y: 455, vitesse : 3},
			  {id: "eclair-cafe", x: 470, y: 455},
			  {id: "gateau-fraise", x: 700, y: 455},
			  {id: "fraise", x: 770, y: 440, vitesse: 3, descente: 5},
			  {id: "eclair-vanille", x: 900, y: 400},
			  {id: "eclair-choco", x: 1200, y: 400},
			  {id: "gaufrette", x: 1300, y: 390},
			  {id: "macaron", x: 1500, y: 500},
			  {id: "eclair-fraise", x: 1700, y: 460},
			  {id: "eclair-fraise", x: 1850, y: 410},
			  {id: "eclair-fraise", x: 2000, y: 350},
			  {id: "muffin", x: 2100, y: 400},
			  {id: "muffin", x: 2260, y: 350},
			  {id: "muffin", x: 2440, y: 300},
			  {id: "muffin", x: 2620, y: 250},
			  {id: "muffin", x: 2800, y: 200},
			  {id: "muffin", x: 3100, y: 220},
			  {id: "macaron", x: 3500, y: 500},
			  {id: "eclair-vanille", x: 3700, y: 500},
			  {id: "eclair-vanille", x: 3900, y: 500},
			  {id: "eclair-vanille", x: 4100, y: 500},
			  {id: "eclair-cafe", x: 4400, y: 500},
			  {id: "gaufrette", x: 4500, y: 490},
			  {id: "eclair-cafe", x: 4600, y: 500},
			  {id: "gateau-choco", x: 4550, y: 470, cible: "porte1"},
			  {id: "brownie", x: 4700, y: 360, ref: "porte1", vitesse : 3, descente : 5},
			  {id: "eclair-fraise", x: 4800, y: 450},
			  {id: "eclair-fraise", x: 5000, y: 400},
			  {id: "eclair-fraise", x: 5300, y: 400},
			  {id: "eclair-fraise", x: 5500, y: 400},
			  {id: "eclair-vanille", x: 5700, y: 400},
			  {id: "eclair-choco", x: 6050, y: 500},
			  {id: "macaron", x: 6300, y: 500},
			  {id: "macaron", x: 6600, y: 400},
			  {id: "macaron", x: 6900, y: 300},
			  {id: "muffin", x: 7300, y: 400},
			  {id: "choux", x: 7600, y: 350, vitesse : 3},
			  {id: "choux", x: 7700, y: 300, vitesse : 2},
			  {id: "choux", x: 7800, y: 250, vitesse : 4},
			  {id: "choux", x: 7900, y: 200, vitesse : 3},
			  {id: "choux", x: 8000, y: 150, vitesse : 5},
			  {id: "eclair-vanille", x: 8100, y: 500},
			  {id: "fraise", x: 8150, y: 450, vitesse: 2, descente: 3},
			  {id: "eclair-vanille", x: 8300, y: 500},
			  {id: "citron", x: 8350, y: 450, vitesse: 4, descente: 6},
			  {id: "eclair-vanille", x: 8500, y: 500},
			  {id: "fraise", x: 8550, y: 450, vitesse: 2, descente: 4},
			  {id: "eclair-vanille", x: 8700, y: 500},
			  {id: "citron", x: 8750, y: 450, vitesse: 5, descente: 7},
			  {id: "eclair-vanille", x: 8900, y: 500},
			  {id: "fraise", x: 8950, y: 450, vitesse: 4, descente: 5},
			  {id: "eclair-cafe", x: 9150, y: 450},
			  {id: "gaufrette", x: 9200, y: 440},
			  {id: "eclair-cafe", x: 9350, y: 450},
			  {id: "gateau-choco", x: 9450, y: 430, cible: "porte3"},
			  {id: "eclair-cafe", x: 9550, y: 450},
			  {id: "gateau-choco", x: 9600, y: 430, cible: "porte2"},
			  {id: "brownie", x: 9700, y: 310, ref : "porte2", vitesse: 9, descente: 9},
			  {id: "brownie", x: 9750, y: 310, ref : "porte3", vitesse : 4, descente : 8},
			  {id: "eclair-cafe", x: 9750, y: 450, ref : "porte3"},
			  {id: "banane", x: 10000, y: 450}
			]
		},
		"cuisine1" : {
			"gagne" : {lieu : "fin", stage: "0"},
			"start" : {
				x : 100,
				y : 450
			},
			"back" : [
			  {id: "meuble", x: 100, y: 100},
			  {id: "meuble", x: 300, y: 100},
			  {id: "lavabo", x: 500, y: 110},
			  {id: "meuble", x: 700, y: 100},
			  {id: "meuble", x: 900, y: 100},
			  {id: "etagere", x: 1300, y: 200}
			],
			"elements" : [
			  {id: "beurre", x: -30, y: 500},
			  {id: "oeuf", x: 250, y: 450, cible: "coquille1"},
			  {id: "coquille", x: 250, y: 450, ref : "coquille1", vitesse : 5},
			  {id: "chocolat", x: 400, y: 450},
			  {id: "noisette1", x: 450, y: 440, vitesse: 3, descente: 8},
			  {id: "noisette2", x: 470, y: 440, vitesse: 5, descente: 5},
			  {id: "noisette3", x: 490, y: 440, vitesse: 4, descente: 7},
			  {id: "noisette4", x: 510, y: 440, vitesse: 2, descente: 8},
			  {id: "gaufrette", x: 530, y: 440},
			  {id: "pomme", x: 650, y: 440},
			  {id: "poire", x: 850, y: 480},
			  {id: "mochi", x: 900, y: 475, cible: "farine1"},
			  {id: "pate", x: 1100, y: 480},
			  {id: "farine", x: 1200, y: 400, ref : "farine1"},
			  {id: "pate", x: 1300, y: 480},
			  {id: "sucre", x: 1400, y: 530}
			]
		},
		"fin0" : {
			"end" : true,
			"cinematique" : [],
			"start" : {},
			"back" : [],
			"elements" : []
		}
	};
	
	return {
		/**
		* Permet d'appeler un WS
		**/
		get : function(key) {
			return $.extend(true, {}, data[key]);
		}
	};
});