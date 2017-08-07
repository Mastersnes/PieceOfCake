'use strict';
define(["jquery"], function($){
	var data = {
		/**
		 * Stages
		 */
		"boulangerie" : {
			"back" : [
			  {id: "etagere-vide", x: 50, y: 200},
			  {id: "etagere", x: 275, y: 200},
			  {id: "lustre", x: 300, y: 0},
			  {id: "etagere-vide", x: 500, y: 200},
			  {id: "niche-pain", x: 1000, y: 100},
			  {id: "niche-vide", x: 1225, y: 100},
			  {id: "niche-baguette", x: 1450, y: 100},
			  {id: "niche-vide1", x: 1100, y: 300},
			  {id: "niche-vide2", x: 1300, y: 300},
			  {id: "lustre", x: 1800, y: 0},
			  {id: "etagere-pain", x: 2000, y: 250},
			  {id: "niche-vide1", x: 2500, y: 100},
			  {id: "niche-vide2", x: 2700, y: 150},
			  {id: "etagere-pain", x: 3300, y: 200}
			],
			"elements" : [
			  {id: "eclair-cafe", x: -30, y: 455},
			  {id: "eclair-cafe", x: 170, y: 455},
			  {id: "eclair-cafe", x: 270, y: 455},
			  {id: "eclair-cafe", x: 470, y: 455},
			  {id: "gateau-fraise", x: 700, y: 455},
			  {id: "fraise", x: 770, y: 440},
			  {id: "eclair-vanille", x: 900, y: 400},
			  {id: "eclair-choco", x: 1200, y: 400},
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
			  {id: "eclair-cafe", x: 4400, y: 500}
			]
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