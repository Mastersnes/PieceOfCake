'use strict';
define(["jquery", 
        "app/data/stages/boulangerie/facile", 
        "app/data/stages/boulangerie/moyen",
        "app/data/stages/boulangerie/difficile"], function($, Facile, Moyen, Difficile){
	var data = {
		/**
		 * Stages
		 */
		"1" : {
			"levelNumber" : 0,
			"music" : "/music/boulangerie.mp3",
			"gagne" : {lieu : "boulangerie", stage : 2},
			"cinematique" : ["cinematique-didactitiel", "boulangerie1", "boulangerie2", "boulangerie3", "boulangerie4"],
			"start" : {
				x : 100,
				y : 400
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
			"elements" : {
				"facile" : Facile.get("1"),
				"moyen" : Moyen.get("1"),
				"difficile" : Difficile.get("1")
			}
		},
		"2" : {
			"levelNumber" : 1,
			"music" : "/music/boulangerie.mp3",
			"gagne" : {lieu : "cuisine", stage : 1},
			"cinematique" : null,
			"start" : {
				x : 100,
				y : 150
			},
			"back" : [
			  {id: "niche-vide2", x: 50, y: 200},
			  {id: "etagere1", x: 275, y: 200},
			  {id: "lustre", x: 300, y: 0},
			  {id: "etagere-vide", x: 500, y: 200},
			  {id: "niche-pain1", x: 1000, y: 100},
			  {id: "niche-pain3", x: 1225, y: 100},
			  {id: "niche-baguette", x: 1450, y: 100},
			  {id: "niche-vide2", x: 1100, y: 300},
			  {id: "etagere3", x: 1300, y: 300},
			  {id: "boulanger", x: 1800, y: 100},
			  {id: "lustre", x: 1800, y: 0},
			  {id: "etagere-pain1", x: 2000, y: 250},
			  {id: "niche-pain1", x: 2500, y: 100},
			  {id: "niche-pain3", x: 2700, y: 150},
			  {id: "etagere-pain2", x: 3300, y: 200},
			  {id: "boulanger", x: 3600, y: 100},
			  {id: "etagere2", x: 4200, y: 100},
			  {id: "niche-baguette", x: 4600, y: 200},
			  {id: "etagere4", x: 4900, y: 300},
			  {id: "etagere-pain3", x: 5300, y: 200},
			  {id: "etagere-pain4", x: 5500, y: 100},
			  {id: "lustre", x: 5900, y: 0},
			  {id: "etagere-pain1", x: 6400, y: 250},
			  {id: "niche-pain2", x: 6800, y: 100}
			],
			"elements" : {
				"facile" : Facile.get("2"),
				"moyen" : Moyen.get("2"),
				"difficile" : Difficile.get("2")
			}
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