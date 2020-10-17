'use strict';
define(["jquery"], function($){
	var data = {
		/**
		 * Stages
		 */
		"1" : [
			  //PARTIE 1
			  {id: "eclair-cafe", x: -30, y: 500},
			  {id: "coeur", x: 150, y: 450},
			  {id: "choux", x: 170, y: 450, vitesse : 2},
			  {id: "eclair-choco", x: 250, y: 360},
			  {id: "eclair-cafe", x: 450, y: 340},
			  {id: "gateau-fraise", x: 700, y: 340},
			  {id: "coeur", x: 780, y: 300},
			  //AU DESSUS
			  {id: "eclair-vanille", x: 850, y: 300},
			  {id: "eclair-cafe", x: 1050, y: 300},
			  {id: "coeur", x: 1110, y: 270},
			  {id: "citron", x: 1150, y: 270, vitesse : 3, descente : 3},
			  {id: "eclair-choco", x: 1250, y: 300},
			  //EN DESSOUS
			  {id: "eclair-cafe", x: 850, y: 500},
			  {id: "coeur", x: 940, y: 450},
			  {id: "eclair-fraise", x: 1050, y: 500},
			  {id: "coeur", x: 1110, y: 470},
			  {id: "fraise", x: 1150, y: 470, vitesse : 3, descente : 3},
			  {id: "coeur", x: 1210, y: 470},
			  {id: "eclair-fraise", x: 1250, y: 500},
			  {id: "coeur", x: 1310, y: 470},
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
			  {id: "choux", x: 3700, y: 400, vitesse : 4},
			  {id: "fraise", x: 3850, y: 400, vitesse : 3, descente : 2, distancee : 150},
			  {id: "choux", x: 3900, y: 350, vitesse : 2},
			  {id: "coeur", x: 4060, y: 340},
			  {id: "choux", x: 4100, y: 300, vitesse : 5, distance : 100},
			  {id: "macaron", x: 4300, y: 500},
			  {id: "macaron", x: 4600, y: 300},
			  {id: "macaron", x: 5025, y: 300},
			  //EN DESSOUS
			  {id: "eclair-choco", x: 4900, y: 600},
			  {id: "coeur", x: 4990, y: 550},
			  {id: "coeur", x: 5160, y: 550},
			  {id: "eclair-vanille", x: 5100, y: 600},
			  {id: "fraise", x: 5200, y: 550, vitesse : 2, descente : 4},
			  {id: "coeur", x: 5260, y: 550},
			  {id: "eclair-choco", x: 5300, y: 600},
			  {id: "coeur", x: 5410, y: 550},
			  //SUITE
			  {id: "coeur", x: 5400, y: 250},
			  {id: "muffin", x: 5450, y: 450},
			  {id: "eclair-vanille", x: 5800, y: 460},
			  {id: "coeur", x: 6020, y: 420},
			  {id: "citron", x: 6025, y: 460, vitesse: 2, descente: 3},
			  {id: "gateau-fraise", x: 6100, y: 440},
			  {id: "coeur", x: 6305, y: 400},
			  {id: "banane", x: 6350, y: 420}
			],
		"2" : [
			  //PARTIE 1
			  {id: "eclair-cafe", x: -30, y: 250},
			  {id: "eclair-vanille", x: 300, y: 300},
			  {id: "eclair-vanille", x: 650, y: 350},
			  {id: "coeur", x: 750, y: 300},
			  {id: "fraise", x: 880, y: 360, vitesse: 3, descente : 4, distance : 150},
			  {id: "eclair-vanille", x: 1000, y: 400},
			  {id: "eclair-vanille", x: 1290, y: 350},
			  {id: "coeur", x: 1525, y: 320},
			  {id: "eclair-vanille", x: 1590, y: 300},
			  {id: "eclair-vanille", x: 1880, y: 250},
			  {id: "macaron", x: 2300, y: 450},
			  {id: "coeur", x: 2500, y: 250},
			  {id: "macaron", x: 2600, y: 350},
			  {id: "choux", x: 3000, y: 300, vitesse : 5, distance : 100},
			  {id: "choux", x: 3200, y: 350, vitesse : 3},
			  {id: "choux", x: 3400, y: 400, vitesse : 4},
			  {id: "coeur", x: 3550, y: 380},
			  {id: "eclair-vanille", x: 3600, y: 400},
			  {id: "fraise", x: 3700, y: 380, vitesse : 2, descente : 3, distance : 150},
			  {id: "eclair-choco", x: 3800, y: 350},
			  {id: "citron", x: 3900, y: 340, vitesse : 3, descente : 2, distance : 150},
			  {id: "eclair-vanille", x: 4000, y: 300},
			  {id: "eclair-cafe", x: 4200, y: 300},
			  {id: "eclair-cafe", x: 4400, y: 300},
			  {id: "gateau-choco", x: 4250, y: 280, cible : "porte2"},
			  {id: "brownie", x: 4400, y: 180, vitesse : 5, descente : 5, ref : "porte2"},
			  {id: "gaufrette", x: 4500, y: 300},
			  
			  {id: "eclair-cafe", x: 4700, y: 300},
			  {id: "gateau-choco", x: 4750, y: 280},
			  
			  {id: "eclair-cafe", x: 4900, y: 250},
			  {id: "gateau-choco", x: 4950, y: 230, cible : "porte3"},
			  
			  {id: "eclair-cafe", x: 5100, y: 250},
			  {id: "brownie", x: 5100, y: 130, vitesse : 5, descente : 5, ref : "porte3"},
			  {id: "coeur", x: 5200, y: 150},
			  {id: "fraise", x: 5300, y: 200, vitesse : 2, descente : 3},
			  
			  {id: "eclair-cafe", x: 5300, y: 300},
			  {id: "gateau-choco", x: 5400, y: 280, cible : "porte5"},
			  
			  {id: "eclair-cafe", x: 5500, y: 300},
			  
			  {id: "eclair-cafe", x: 5750, y: 280},
			  {id: "brownie", x: 5800, y: 140, vitesse : 2, descente : 4, ref : "porte5"},
			  
			  {id: "eclair-fraise", x: 6000, y: 230},
			  {id: "eclair-fraise", x: 6200, y: 200},
			  {id: "eclair-fraise", x: 6500, y: 180},
			  {id: "eclair-fraise", x: 6700, y: 150},
			  {id: "coeur", x: 6800, y: 100},
			  {id: "eclair-vanille", x: 6900, y: 130},
			  {id: "banane", x: 7400, y: 500}
			]
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