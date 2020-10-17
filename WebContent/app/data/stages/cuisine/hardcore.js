'use strict';
define(["jquery"], function($){
	var data = {
		/**
		 * Stages
		 */
		"1" : [
          {id: "coeur", x: 160, y: 450},
          {id: "rouleau", x: -30, y: 500},
          {id: "beurre", x: 250, y: 450},
          {id: "raisin-blanc", x: 340, y: 420, vitesse: 1, descente: 3},
          {id: "beurre", x: 500, y: 380},
          {id: "raisin-noir", x: 590, y: 350, vitesse: 2, descente: 2},
          {id: "beurre", x: 750, y: 310},
          {id: "raisin-blanc", x: 840, y: 280, vitesse: 2, descente: 3},
          {id: "beurre", x: 1000, y: 240},
          {id: "raisin-noir", x: 1090, y: 210, vitesse: 4, descente: 1},
          {id: "pomme", x: 1400, y: 500},
          {id: "coeur", x: 1500, y: 400},
          {id: "pomme", x: 1600, y: 300},
          {id: "raisin-blanc", x: 2000, y: 200, vitesse: 6, descente:1},
          {id: "yahourt", x: 1850, y: 100},
          {id: "pate", x: 2200, y: 120},
          {id: "chocolat", x: 2400, y: 120},
          {id: "noisette1", x: 2450, y: 110, vitesse: 3, descente: 8},
          {id: "noisette2", x: 2470, y: 110, vitesse: 5, descente: 5},
          {id: "noisette3", x: 2490, y: 110, vitesse: 4, descente: 7},
          {id: "noisette4", x: 2510, y: 110, vitesse: 2, descente: 8},

          //AU DESSUS
          {id: "coeur", x: 2650, y: 50},
          {id: "rouleau", x: 2700, y: 130},
          {id: "mochi", x: 2800, y: 110, cible : "porte1"},
          {id: "rouleau", x: 2900, y: 130},
          {id: "farine", x: 2900, y: 10, vitesse : 5, descente : 5, ref : "porte1"},
          {id: "sucre", x: 3050, y: 120},
          {id: "beurre", x: 3100, y: 140},
          {id: "coeur", x: 3300, y: 120},
          {id: "raisin-noir", x: 3200, y: 110, vitesse : 2, descente : 3},
          {id: "pate", x: 3300, y: 130},
          {id: "raisin-blanc", x: 3370, y: 130, vitesse : 3, descente : 4},
          {id: "beurre", x: 3450, y: 140},
          {id: "raisin-noir", x: 3530, y: 110, vitesse : 1, descente : 2},
          {id: "poire", x: 3600, y: 140},
          //EN DESSOUS
          {id: "coeur", x: 2700, y: 400},
          {id: "oeuf", x: 3000, y: 500, cible:"coquille1"},
          {id: "coquille", x: 3000, y: 500, ref:"coquille1", vitesse : 4, distance : 300},
          {id: "oeuf", x: 3500, y: 500, cible:"coquille2"},
          {id: "coquille", x: 3500, y: 500, ref:"coquille2", vitesse : 5, distance : 350},
          {id: "raisin-blanc", x: 3150, y: 550, vitesse : 2, descente : 3, distance : 150},
          {id: "coeur", x: 3175, y: 500},
          {id: "noisette1", x: 3200, y: 550, vitesse : 4, descente : 2, distance : 150},
          {id: "coeur", x: 3225, y: 500},
          {id: "noisette2", x: 3250, y: 550, vitesse : 2, descente : 4, distance : 150},
          {id: "coeur", x: 3275, y: 500},
          {id: "noisette3", x: 3300, y: 550, vitesse : 4, descente : 1, distance : 150},
          {id: "raisin-noir", x: 3350, y: 550, vitesse : 5, descente : 1, distance : 150},
          {id: "coeur", x: 3375, y: 500},
          {id: "noisette4", x: 3400, y: 550, vitesse : 2, descente : 4, distance : 150},
          {id: "coeur", x: 3425, y: 500},
          {id: "noisette1", x: 3450, y: 550, vitesse : 2, descente : 5, distance : 150},
          {id: "coeur", x: 3475, y: 500},
          {id: "date", x: 3600, y: 450, vitesse : 3, descente: 2},
          {id: "date", x: 3800, y: 300, vitesse : 5, descente: 5, distance : 100},
          {id: "raisin-blanc", x: 3940, y: 280, vitesse : 3, descente: 2, distance : 100},
          {id: "date", x: 4000, y: 280, vitesse: 3, distance : 100},
          {id: "raisin-blanc", x: 4140, y: 260, vitesse : 5, descente: 3, distance : 100},
          {id: "date", x: 4200, y: 260, vitesse: 5},
          {id: "raisin-blanc", x: 4340, y: 240, vitesse : 2, descente: 4, distance : 150},
          {id: "date", x: 4400, y: 240, vitesse: 2},
          {id: "raisin-blanc", x: 4540, y: 220, vitesse : 5, descente: 5, distance : 100},
          {id: "date", x: 4600, y: 220, vitesse: 3},
          {id: "coeur", x: 4750, y: 180},
          {id: "raisin-blanc", x: 4740, y: 200, vitesse : 2, descente: 2, distance : 100},
          {id: "date", x: 4800, y: 200},
          {id: "raisin-blanc", x: 4940, y: 180, vitesse : 1, descente: 5, distance : 150},
          {id: "date", x: 5000, y: 200, vitesse: 4},

          {id: "pomme", x: 5300, y: 500},
          {id: "banane", x: 5550, y: 250}
        ],
    "2" : [
          {id: "rouleau", x: -30, y: 200},
          {id: "pate", x: 250, y: 250},
          {id: "beurre", x: 450, y: 300},
          {id: "raisin-blanc", x: 650, y: 400, vitesse : 4, descente: 8, distance : 300},
          {id: "raisin-noir", x: 650, y: 400, vitesse : 7, descente: 5, distance : 300},
          {id: "yahourt", x: 700, y: 300},
          {id: "chocolat", x: 1000, y: 400},
          {id: "noisette1", x: 1050, y: 390, vitesse: 1, descente: 4},
          {id: "mochi", x: 1060, y: 370, cible : "farine2"},
          {id: "noisette2", x: 1100, y: 390, vitesse: 3, descente: 5},
          {id: "noisette3", x: 1150, y: 390, vitesse: 4, descente: 2},
          {id: "noisette4", x: 1200, y: 390, vitesse: 3, descente: 4},
          {id: "chocolat", x: 1200, y: 400},
          {id: "coeur", x: 1250, y: 350},
          {id: "farine", x: 1300, y: 270, vitesse : 2, descente : 3, ref : "farine2"},

          {id: "date", x: 1500, y: 350, vitesse : 5, descente : 7},
          {id: "poire", x: 1600, y: 500},
          {id: "coeur", x: 1610, y: 450},
          {id: "raisin-noir", x: 1700, y: 480, vitesse : 4, descente : 6},
          {id: "rouleau", x: 1800, y: 450},
          {id: "raisin-blanc", x: 1900, y: 420, vitesse : 2, descente : 5},
          {id: "rouleau", x: 2000, y: 400},
          {id: "raisin-noir", x: 2100, y: 370, vitesse : 3, descente : 7},

          {id: "date", x: 2250, y: 390, vitesse: 3, descente: 4, distance : 200},

          //DESSUS
          {id: "rouleau", x: 2400, y: 200},
          {id: "mochi", x: 2500, y: 180, cible : "farine3"},
          {id: "rouleau", x: 2600, y: 200},
          {id: "farine", x: 2600, y: 80, ref : "farine3", vitesse : 3, descente : 4},
          {id: "coeur", x: 2700, y: 150},
          {id: "beurre", x: 2800, y: 200},
          {id: "raisin-blanc", x: 2890, y: 180, vitesse: 2, descente: 6},
          {id: "chocolat", x: 3000, y: 200},
          {id: "noisette1", x: 3050, y: 190, vitesse: 3, descente: 8},
          {id: "noisette2", x: 3070, y: 190, vitesse: 5, descente: 5},
          {id: "coeur", x: 3080, y: 150},
          {id: "noisette3", x: 3090, y: 190, vitesse: 4, descente: 7},
          {id: "noisette4", x: 3110, y: 190, vitesse: 2, descente: 8},
          {id: "beurre", x: 3200, y: 200},
          {id: "raisin-noir", x: 3290, y: 180, vitesse: 4, descente: 2},

          //DESSOUS
          {id: "rouleau", x: 2400, y: 500},
          {id: "mochi", x: 2500, y: 480, cible : "farine4"},
          {id: "rouleau", x: 2600, y: 500},
          {id: "farine", x: 2600, y: 380, ref : "farine4", vitesse : 3, descente : 4},
          {id: "coeur", x: 2700, y: 450},
          {id: "beurre", x: 2800, y: 500},
          {id: "raisin-blanc", x: 2890, y: 480, vitesse: 2, descente: 6},
          {id: "beurre", x: 3000, y: 500},
          {id: "coeur", x: 3000, y: 450},
          {id: "raisin-noir", x: 3090, y: 480, vitesse: 4, descente: 2},
          {id: "rouleau", x: 3200, y: 500},

          {id: "banane", x: 3500, y: 500}
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