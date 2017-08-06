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
			  {id: "etagere-pain", x: 2000, y: 250}
			],
			"elements" : [
			  {id: "eclair-choco", x: -30, y: 455},
			  {id: "eclair-fraise", x: 170, y: 455},
			  {id: "eclair-cafe", x: 480, y: 455},
			  {id: "choux", x: 700, y: 455},
			  {id: "eclair-vanille", x: 900, y: 400},
			  {id: "eclair-choco", x: 1200, y: 400},
			  {id: "macaron", x: 1500, y: 500},
			  {id: "eclair-fraise", x: 1700, y: 460},
			  {id: "eclair-fraise", x: 1850, y: 410},
			  {id: "eclair-fraise", x: 2000, y: 350},
			  {id: "muffin", x: 2100, y: 400}
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