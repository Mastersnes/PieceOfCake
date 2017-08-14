'use strict';
define(["jquery"], function($){
	var data = {
		/**
		 * Stages
		 */
		"boulangerie1" : {
			"music" : "/music/boulangerie.mp3",
			"gagne" : {lieu : "cuisine", stage : 1},
			"cinematique" : ["cinematique-didactitiel", "boulangerie1", "boulangerie2", "boulangerie3", "boulangerie4"],
			"start" : {
				x : 100,
				y : 450
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
			  {id: "niche-pain2", x: 6800, y: 100}
			],
			"elements" : [
			  //PARTIE 1
			  {id: "eclair-cafe", x: -30, y: 500},
			  {id: "coeur", x: 150, y: 450},
			  {id: "choux", x: 170, y: 450, vitesse : 2},
			  {id: "eclair-choco", x: 300, y: 360},
			  {id: "gateau-fraise", x: 600, y: 340},
			  {id: "coeur", x: 680, y: 300},
			  {id: "fraise", x: 670, y: 325, vitesse: 3, descente: 5},
			  //AU DESSUS
			  {id: "eclair-cafe", x: 850, y: 300},
			  {id: "eclair-vanille", x: 1050, y: 300},
			  {id: "fraise", x: 1100, y: 270, vitesse : 2, descente : 4},
			  {id: "coeur", x: 1160, y: 270},
			  {id: "citron", x: 1200, y: 270, vitesse : 3, descente : 3},
			  {id: "eclair-choco", x: 1250, y: 300},
			  //EN DESSOUS
			  {id: "eclair-vanille", x: 850, y: 500},
			  {id: "coeur", x: 940, y: 450},
			  {id: "eclair-fraise", x: 1050, y: 500},
			  {id: "citron", x: 1050, y: 470, vitesse : 2, descente : 6},
			  {id: "coeur", x: 1110, y: 470},
			  {id: "fraise", x: 1150, y: 470, vitesse : 3, descente : 3},
			  {id: "coeur", x: 1210, y: 470},
			  {id: "eclair-fraise", x: 1250, y: 500},
			  {id: "citron", x: 1250, y: 470, vitesse : 4, descente : 1},
			  {id: "coeur", x: 1310, y: 470},
			  {id: "fraise", x: 1350, y: 470, vitesse : 3, descente : 5},
			  //SUITE
			  {id: "choux", x: 1500, y: 400, vitesse: 3, distance : 100},
			  {id: "muffin", x: 1700, y: 400},
			  {id: "coeur", x: 1900, y: 320},
			  {id: "muffin", x: 1900, y: 350},
			  {id: "macaron", x: 2200, y: 340},
			  {id: "coeur", x: 2270, y: 50},
			  {id: "muffin", x: 2500, y: 200},
			  {id: "eclair-cafe", x: 2800, y: 220},
			  {id: "eclair-cafe", x: 3000, y: 220},
			  {id: "gateau-choco", x: 2850, y: 200, cible : "porte1"},
			  {id: "brownie", x: 2950, y: 90, vitesse : 3, descente : 5, ref : "porte1"},
			  {id: "gaufrette", x: 3100, y: 220},
			  
			  //PARTIE 2
			  {id: "coeur", x: 3270, y: 370},
			  {id: "choux", x: 3300, y: 400, vitesse : 3},
			  {id: "fraise", x: 3450, y: 400, vitesse : 5, descente : 3},
			  {id: "choux", x: 3500, y: 450, vitesse : 2},
			  {id: "coeur", x: 3660, y: 430},
			  {id: "citron", x: 3650, y: 450, vitesse : 4, descente : 5, distance : 150},
			  {id: "choux", x: 3700, y: 400, vitesse : 4},
			  {id: "fraise", x: 3850, y: 400, vitesse : 3, descente : 2},
			  {id: "choux", x: 3900, y: 350, vitesse : 2},
			  {id: "coeur", x: 4060, y: 340},
			  {id: "citron", x: 4050, y: 350, vitesse : 5, descente : 4, distance : 150},
			  {id: "choux", x: 4100, y: 300, vitesse : 5, distance : 100},
			  {id: "macaron", x: 4300, y: 500},
			  {id: "macaron", x: 4600, y: 300},
			  {id: "macaron", x: 5050, y: 300},
			  //EN DESSOUS
			  {id: "eclair-choco", x: 4900, y: 600},
			  {id: "coeur", x: 4990, y: 550},
			  {id: "citron", x: 5100, y: 550, vitesse : 3, descente : 4},
			  {id: "coeur", x: 5160, y: 550},
			  {id: "eclair-vanille", x: 5100, y: 600},
			  {id: "fraise", x: 5200, y: 550, vitesse : 2, descente : 4},
			  {id: "coeur", x: 5260, y: 550},
			  {id: "eclair-choco", x: 5300, y: 600},
			  {id: "citron", x: 5300, y: 550, vitesse : 4, descente : 3},
			  {id: "coeur", x: 5410, y: 550},
			  {id: "fraise", x: 5450, y: 550, vitesse : 5, descente : 3},
			  //SUITE
			  {id: "coeur", x: 5500, y: 250},
			  {id: "muffin", x: 5500, y: 450},
			  {id: "eclair-vanille", x: 5800, y: 460},
			  {id: "coeur", x: 6020, y: 420},
			  {id: "citron", x: 6025, y: 460, vitesse: 2, descente: 3},
			  {id: "gateau-fraise", x: 6100, y: 440},
			  {id: "fraise", x: 6170, y: 425, vitesse: 3, descente: 5},
			  {id: "coeur", x: 6305, y: 400},
			  {id: "citron", x: 6310, y: 425, vitesse: 3, descente: 4},
			  {id: "banane", x: 6350, y: 420},
			]
		},
		"cuisine1" : {
			"music" : "/music/cuisine.mp3",
			"gagne" : {lieu : "fin", stage: "0"},
			"cinematique" : ["cuisine1", "cuisine2"],
			"start" : {
				x : 50,
				y : 400
			},
			"back" : [
			  {id: "meuble", x: 100, y: 100},
			  {id: "meuble", x: 300, y: 100},
			  {id: "lavabo", x: 500, y: 110},
			  {id: "meuble", x: 700, y: 100},
			  {id: "meuble", x: 900, y: 100},
			  {id: "lustre-cuisine", x: 1200, y: 0},
			  {id: "etagere-cuisine-vide1", x: 1300, y: 200},
			  {id: "etagere-cuisine-epice", x: 1600, y: 250},
			  {id: "etagere-cuisine-vide2", x: 2000, y: 190},
			  {id: "etagere-cuisine-sopalin", x: 2500, y: 200},
			  {id: "lustre-cuisine", x: 2700, y: 0},
			  {id: "etagere-cuisine-pate", x: 2800, y: 200}
			],
			"elements" : [
			  {id: "rouleau", x: -30, y: 450},
			  {id: "oeuf", x: 250, y: 450, cible: "coquille1"},
			  {id: "coquille", x: 250, y: 450, ref : "coquille1", vitesse : 5},
			  {id: "chocolat", x: 400, y: 450},
			  {id: "noisette1", x: 450, y: 440, vitesse: 3, descente: 8},
			  {id: "noisette2", x: 470, y: 440, vitesse: 5, descente: 5},
			  {id: "noisette3", x: 490, y: 440, vitesse: 4, descente: 7},
			  {id: "noisette4", x: 510, y: 440, vitesse: 2, descente: 8},
			  {id: "sucre", x: 530, y: 440},
			  {id: "pomme", x: 650, y: 440},
			  {id: "poire", x: 850, y: 480},
			  {id: "mochi", x: 900, y: 475, cible: "farine1"},
			  {id: "pate", x: 1100, y: 480},
			  {id: "farine", x: 1200, y: 400, ref : "farine1"},
			  {id: "pate", x: 1300, y: 480},
			  {id: "sucre", x: 1400, y: 530},
			  {id: "beurre", x: 1500, y: 550},
			  {id: "raisin-noir", x: 1600, y: 550},
			  {id: "beurre", x: 1800, y: 500},
			  {id: "beurre", x: 2100, y: 450},
			  {id: "pomme", x: 2300, y: 450},
			  {id: "rouleau", x: 2500, y: 300},
			  {id: "sucre", x: 2550, y: 290},
			  {id: "raisin-blanc", x: 2650, y: 280},
			  {id: "yahourt", x: 2700, y: 300},
			  {id: "date", x: 3000, y: 300},
			  {id: "raisin-blanc", x: 3100, y: 280, descente: 2, distance : 100},
			  {id: "date", x: 3200, y: 280, vitesse: 3, distance : 100},
			  {id: "date", x: 3400, y: 260, vitesse: 5},
			  {id: "date", x: 3600, y: 240, vitesse: 2},
			  {id: "date", x: 3800, y: 220, vitesse: 3},
			  {id: "date", x: 4000, y: 200},
			  {id: "date", x: 4200, y: 200, vitesse: 4},
			  {id: "banane", x: 4200, y: 200}
			]
		},
		"fin0" : {
			"end" : true,
			"cinematique" : ["end1", "end2", "end3", "end4", "end5"],
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