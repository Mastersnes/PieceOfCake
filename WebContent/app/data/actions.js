'use strict';
define(["jquery"], function($){
	var data = {
		"ralenti" : { // Ralenti
			useY : function(player) {
				var dom = this.dom;
				var vitesse = 0.2;
				if (dom.attr("vitesse")) vitesse = parseFloat(dom.attr("vitesse"));
				player.moveEngine.acceleration.x = vitesse;
			},
			reset : function(player) {
				player.moveEngine.acceleration.x = 1;
			}
		},
		"glisse" : { // GLISSE
			useY : function(player) {
				var dom = this.dom;
				var vitesse = 2;
				var acceleration = 0;
				if (dom.attr("vitesse")) vitesse = parseFloat(dom.attr("vitesse"));
				if (dom.attr("acceleration")) acceleration = parseFloat(dom.attr("acceleration"));
				player.moveEngine.acceleration.x = vitesse;
				player.flag.move = player.moveEngine.marche.direction;
				dom.attr("vitesse", vitesse + acceleration);
			},
			reset : function(player) {
				player.moveEngine.acceleration.x = 1;
			}
		},
		"bouge-verticale" : { // BOUGE VERTICALEMENT
			useY : function(player) {
				var dom = this.dom;
				if (dom.position().top == 0) return;
				
				var move = -1;
				if (dom.attr("move")) move = dom.attr("move");
				else {
					dom.attr("move", move);
					dom.attr("start", dom.position().top);
				}
				
				var start = parseFloat(dom.attr("start"));
				
				move = parseInt(move);
				var speed = 1;
				if (dom.attr("vitesse")) speed = parseInt(dom.attr("vitesse"));
				
				dom.css({
					top : "+="+(move*speed)+"px"
				});
				player.position.y = dom.position().top - 50;
				if (dom.position().top < start - 50) dom.attr("move", 1);
				else if (dom.position().top > start + 50) dom.attr("move", -1);
			},
			reset : function(player) {
				var dom = this.dom;
				if (dom.position().top == 0) return;
				if (dom.offset().left - dom.width() < -100) return;
				if (dom.offset().left > $(".game").width() + 100) return;
				
				var move = -1;
				if (dom.attr("move")) move = dom.attr("move");
				else {
					dom.attr("move", move);
					dom.attr("start", dom.position().top);
				}
				
				var start = parseFloat(dom.attr("start"));
				
				move = parseInt(move);
				var speed = 1;
				if (dom.attr("vitesse")) speed = parseInt(dom.attr("vitesse"));
				
				dom.css({
					top : "+="+(move*speed)+"px"
				});
				if (dom.position().top < start - 50) dom.attr("move", 1);
				else if (dom.position().top > start + 50) dom.attr("move", -1);
			}
		},
		"rebondi" : { // REBONDIT
			useY : function(player) {
				if (!player.moveEngine.flag.tombe) player.moveEngine.saute(2);
			}
		},
		"bouge-tue" : { // BOUGE ET TUE
			useY : function(player) {
				player.flag.dead = true;
			},
			useX : function(player) {
				this.useY(player);
			},
			reset : function(player) {
				var dom = this.dom;
				if (dom.position().top == 0) return;
				if (dom.offset().left - dom.width() < -100) return;
				if (dom.offset().left > $(".game").width() + 100) return;
				
				var speed1 = 1;
				if (dom.attr("vitesse")) speed1 = dom.attr("vitesse");
				var speed2 = 1;
				if (dom.attr("descente")) speed2 = dom.attr("descente");
				var distance = 100;
				if (dom.attr("distance")) distance = dom.attr("distance");
				
				var move = -1 * speed1;
				if (dom.attr("move")) move = dom.attr("move");
				else {
					dom.attr("move", move);
					dom.attr("start", dom.position().top);
				}
				
				var start = parseFloat(dom.attr("start"));
				
				dom.css({
					top : "+="+move+"px"
				});
				if (dom.position().top < start - distance) dom.attr("move", 1 * speed2);
				else if (dom.position().top > start) dom.attr("move", -1 * speed1);
			}
		},
		"bouton" : { // BOUTON
			useY : function(player) {
				var dom = this.dom;
				var cibleId = dom.attr("cible");
				var cible = $(".stage .element[ref="+cibleId+"]");
				if (cible.length > 0) {
					cible.attr("active", true);
				}
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