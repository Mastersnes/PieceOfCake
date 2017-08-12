'use strict';
define(["jquery", "app/data/actions"], function($, Actions){
	var data = {
		/**
		 * Plateformes
		 */
		"eclair-choco" : {action: Actions.get("ralenti")},
		"eclair-vanille" : {action : Actions.get("glisse")},
		"eclair-fraise" : {action : Actions.get("tombe")},
		"choux" : {action : Actions.get("bouge-verticale")},
		"macaron" : {action : Actions.get("rebondi")},
		"muffin" : { // EXPLOSE
			hitbox : {
				x : 94,
				y : 80,
				w : 180,
				h : 180
			},
			action : Actions.get("explose")
		},
		"fraise" : {action : Actions.get("bouge-tue")},
		"citron" : {action : Actions.get("bouge-tue")},
		"gateau-choco" : {action : Actions.get("bouton")},
		"brownie" : {action : Actions.get("porte")},
		"gaufrette" : { // S'OUVRE ET DEVIENT MORTEL EN TOMBANT
			hitbox : {
				x : 0,
				y : 0,
				w : 60,
				h : 30
			},
			action : Actions.get("checkpoint")
		},
		"banane" : {
			hitbox : {
				x : 10,
				y : 50,
				w : 185,
				h : 50
			},
			action : {
				useY : function(player) {
					player.gagne();
				}
			}
		},
		"beurre" : {action : Actions.get("glisse")},
		"oeuf" : { // S'OUVRE ET LANCE SA COQUILLE
			action : {
				useY : function(player) {
					var dom = this.dom;
					if (dom.position().top == 0) return;
					if (dom.offset().left - dom.width() < -500) return;
					if (dom.offset().left > $(".game").width() + 500) return;
					
					var cibleId = dom.attr("cible");
					var cible = $(".stage .element[ref="+cibleId+"]");
					
					var index = dom.attr("index");
					if (player.delay["oeuf"+index] == undefined) {
						cible.hide();
						player.delay["oeuf"+index] =0;
					}
					
					var coquilleActive = cible.attr("coquille-active");
					var delay = ++player.delay["oeuf"+index];
					if (delay >= 5 && !coquilleActive) {
						player.delay["oeuf"+index] = 0;
						var etape = 1;
						if (dom.attr("etape")) etape = parseInt(dom.attr("etape"));
						etape++;
						
						dom.attr("etape", etape);
						dom.removeClass(function (index, className) {
						    return (className.match (/\betape-\S+/g) || []).join(' ');
						});
						dom.addClass("etape-"+etape);
						
						if (etape > 4) {
							cible.show();
							player.delay["oeuf"+index] = 0;
							dom.removeAttr("etape");
							cible.attr("coquille-active", true);
						}
					}
				},
				reset : function(player) {
					this.useY(player);
				}
			}
		},
		"coquille" : { // BOUGE DE GAUCHE A DROITE ET TUE LE PERSONNAGE SI IL LE TOUCHE
			action : {
				useX : function(player) {
					player.flag.dead = true;
				},
				useY : function(player, dontMove) {
					var dom = this.dom;
					if (dom.position().top == 0) return;
					if (dom.offset().left - dom.width() < -500) return;
					if (dom.offset().left > $(".game").width() + 500) return;
					
					if (!dom.attr("start")) dom.attr("start", dom.position().left);
					
					var coquilleActive = dom.attr("coquille-active");
					if (coquilleActive) {
						var move = -1;
						if (dom.attr("move")) move = dom.attr("move");
						else {
							dom.attr("move", move);
						}
						
						var start = parseFloat(dom.attr("start"));
						
						move = parseInt(move);
						var speed = 1;
						if (dom.attr("vitesse")) speed = parseInt(dom.attr("vitesse"));
						
						var distance = 200;
						if (dom.attr("distance")) distance = parseInt(dom.attr("distance"));
						
						var sens = 1;
						if (dom.attr("sens")) sens = parseInt(dom.attr("sens"));
						
						dom.css({
							left : "+="+sens*(move*speed)+"px"
						});
						if (!dontMove) player.position.x += sens*(move*speed);
						
						if (dom.position().left < start - distance) dom.attr("move", 1);
						else if (dom.position().left > start) {
							dom.css({
								left : "="+start+"px"
							});
							
							dom.hide();
							dom.removeAttr("move");
							dom.removeAttr("coquille-active");
						}
					}
				},
				reset : function(player) {
					this.useY(player, true);
				}
			}
		},
		"noisette1" : {action : Actions.get("bouge-tue")},
		"noisette2" : {action : Actions.get("bouge-tue")},
		"noisette3" : {action : Actions.get("bouge-tue")},
		"noisette4" : {action : Actions.get("bouge-tue")},
		"pomme" : {action : Actions.get("rebondi")},
		"poire" : {
			hitbox : {
				x : 20,
				y : 20,
				w : 130,
				h : 120
			}
		},
		"pate" : {
			hitbox : {
				x : 0,
				y : 50,
				w : 170,
				h : 50
			},
			action : Actions.get("ralenti")
		},
		"mochi" : {action : Actions.get("bouton")},
		"farine" : { // S'OUVRE ET DEVIENT MORTEL EN TOMBANT
			hitbox : {
				x : 0,
				y : 0,
				w : 70,
				h : 145
			},
			action : Actions.get("porte")
		},
		"sucre" : {action : Actions.get("checkpoint")},
		"coeur" : {
			action : { 
				useX : function(player) {
					var dom = this.dom;
					player.flag.point++;
					dom.hide();
				},
				useY : function(player) {
					var dom = this.dom;
					player.flag.point++;
					dom.hide();
				}
			}
		},
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