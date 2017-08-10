'use strict';
define(["jquery", "app/data/actions"], function($, Actions){
	var data = {
		/**
		 * Plateformes
		 */
		"eclair-choco" : {action: Actions.get("ralenti")},
		"eclair-vanille" : {action : Actions.get("glisse")},
		"eclair-fraise" : { // TOMBE
			action : {
				useY : function(player) {
					var dom = this.dom;
					var index = dom.attr("index");
					if (player.delay["eclair-fraise"+index] == undefined) player.delay["eclair-fraise"+index] = 0;
					
					var delay = ++player.delay["eclair-fraise"+index];
					if (!dom.hasClass("shake")) dom.addClass("shake");
					
					if (delay == 15) {
						dom.attr("lastTop", dom.position().top);
						dom.animate({
							top : "1500px"
						}, 1000);
					}
				},
				reset : function(player) {
					var dom = this.dom;
					var index = dom.attr("index");
					player.delay["eclair-fraise"+index] = 0;
					dom.removeClass("shake");
					var lastTop = dom.attr("lastTop");
					if (lastTop) {
						dom.removeAttr("lastTop");
						dom.animate({
							top : lastTop
						});
					}
				}
			}
		},
		"choux" : {action : Actions.get("bouge-verticale")},
		"macaron" : {action : Actions.get("rebondi")},
		"muffin" : { // EXPLOSE
			hitbox : {
				x : 94,
				y : 80,
				w : 180,
				h : 180
			},
			action : {
				useY : function(player) {
					var dom = this.dom;
					var index = dom.attr("index");
					if (player.delay["muffin"+index] == undefined) player.delay["muffin"+index] =0;
					
					var delay = ++player.delay["muffin"+index];
					if (delay >= 10) {
						player.delay["muffin"+index] = 0;
						var saut = dom.attr("saut");
						if (!saut) saut = 1;
						saut++;
						
						dom.attr("saut", saut);
						dom.removeClass(function (index, className) {
						    return (className.match (/\bsaut-\S+/g) || []).join(' ');
						});
						dom.addClass("saut-"+saut);
						
						if (saut > 4) {
							player.flag.dead = true;
							player.delay["muffin"+index] = 0;
							dom.removeClass(function (index, className) {
							    return (className.match (/\bsaut-\S+/g) || []).join(' ');
							});
							dom.removeAttr("saut");
						}
					}
				},
				reset : function(player) {
					var dom = this.dom;
					var index = dom.attr("index");
					player.delay["muffin"+index] = 0;
					dom.removeClass(function (index, className) {
					    return (className.match (/\bsaut-\S+/g) || []).join(' ');
					});
					dom.removeAttr("saut");
				}
			}
		},
		"fraise" : {action : Actions.get("bouge-tue")},
		"citron" : {action : Actions.get("bouge-tue")},
		"gateau-choco" : {action : Actions.get("bouton")},
		"brownie" : { // S'OUVRE ET DEVIENT MORTEL EN TOMBANT
			action : {
				useY : function(player) {
					var dom = this.dom;
					if (dom.hasClass("mortel")) {
						player.flag.dead = true;
					}
				},
				reset : function(player) {
					var dom = this.dom;
					if (!dom.attr("active")) return;
					var index = dom.attr("index");
					
					var speed1 = 1;
					if (dom.attr("vitesse")) speed1 = dom.attr("vitesse");
					var speed2 = 1;
					if (dom.attr("descente")) speed2 = dom.attr("descente");
					
					var move = -1 * speed1;
					if (dom.attr("move")) move = dom.attr("move");
					else {
						player.delay["brownie"+index] = 0;
						dom.addClass("ouverture");
						dom.attr("move", move);
						dom.attr("start", dom.position().top);
					}
					
					var start = parseFloat(dom.attr("start"));
					
					dom.css({
						top : "+="+move+"px"
					});
					if (dom.position().top < start - 100) {
						var delay = ++player.delay["brownie"+index];
						if (delay == 1) {
							dom.addClass("shake");
							dom.addClass("mortel");
						}
						if (delay >= 10) {
							dom.removeClass("ouverture");
							dom.attr("move", 1 * speed2);
						}else {
							dom.attr("move", 0);
						}
					}
					else if (dom.position().top >= start) {
						player.delay["brownie"+index] = 0;
						dom.css({
							top : "="+start+"px"
						});
						dom.removeClass("shake");
						dom.removeAttr("active");
						dom.removeClass("mortel");
						dom.removeAttr("move");
					}
				}
			}
		},
		"gaufrette" : { // S'OUVRE ET DEVIENT MORTEL EN TOMBANT
			hitbox : {
				x : 0,
				y : 0,
				w : 60,
				h : 30
			},
			action : {
				useY : function(player) {
					var dom = this.dom;
					if (!dom.hasClass("active")) {
						dom.addClass("active");
						player.savePosition();
					}
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
		"pate" : {
			hitbox : {
				x : 0,
				y : 50,
				w : 170,
				h : 50
			},
			action : Actions.get("ralenti")
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