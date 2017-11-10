'use strict';
define(["jquery", 
        "app/data/stages/cuisine/facile", 
        "app/data/stages/cuisine/moyen",
        "app/data/stages/cuisine/difficile"], function($, Facile, Moyen, Difficile){
	var data = {
		/**
		 * Stages
		 */
		"1" : {
			"levelNumber" : 2,
			"music" : "/music/cuisine.mp3",
			"gagne" : {lieu : "cuisine", stage: "2"},
			"cinematique" : ["cuisine1", "cuisine2"],
			"start" : {
				x : 50,
				y : 400
			},
			"back" : [
			  {id: "meuble", x: 100, y: 50},
			  {id: "meuble", x: 300, y: 50},
			  {id: "lavabo", x: 500, y: 250},
			  {id: "meuble", x: 700, y: 50},
			  {id: "meuble", x: 900, y: 50},
			  {id: "lustre-cuisine", x: 1200, y: 0},
			  {id: "etagere-cuisine-vide1", x: 1300, y: 250},
			  {id: "etagere-cuisine-epice", x: 1600, y: 250},
			  {id: "etagere-cuisine-pate", x: 2500, y: 190},
			  {id: "frigo", x: 2800, y: 300},
			  {id: "etagere-cuisine-sopalin", x: 3000, y: 200},
			  {id: "etagere-cuisine-vide2", x: 3500, y: 200},
			  {id: "lustre-cuisine", x: 4500, y: 0},
			  {id: "meuble", x: 5400, y: 300},
			  {id: "meuble", x: 5620, y: 300},
			  {id: "meuble", x: 5840, y: 300}
			],
			"elements" : {
				"facile" : Facile.get("1"),
				"moyen" : Moyen.get("1"),
				"difficile" : Difficile.get("1")
			}
		},
		"2" : {
			"levelNumber" : 3,
			"music" : "/music/cuisine.mp3",
			"gagne" : {lieu : "fin", stage: "0"},
			"cinematique" : null,
			"start" : {
				x : 50,
				y : 150
			},
			"back" : [
				{id: "meuble", x: 100, y: 50},
				{id: "meuble", x: 300, y: 50},
				{id: "lavabo", x: 500, y: 200},
				{id: "meuble", x: 700, y: 50},
				{id: "meuble", x: 900, y: 50},
				{id: "lustre-cuisine", x: 1200, y: 0},
				{id: "etagere-cuisine-vide1", x: 1300, y: 250},
				{id: "etagere-cuisine-epice", x: 1600, y: 250},
				{id: "etagere-cuisine-pate", x: 2500, y: 190},
				{id: "frigo", x: 2800, y: 300},
				{id: "etagere-cuisine-sopalin", x: 3000, y: 200},
				{id: "etagere-cuisine-vide2", x: 3500, y: 200}
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