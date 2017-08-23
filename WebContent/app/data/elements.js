'use strict';
define(["jquery", "app/data/actions"], function($, Actions){
	var data = {
		/**
		 * Plateformes
		 */
		"eclair-choco" : {action: Actions.get("ralenti")},
		"eclair-vanille" : {
			sound : "/slide.mp3",
			action : Actions.get("glisse")
		},
		"eclair-fraise" : {
			sound : "/effort.mp3",
			action : Actions.get("tombe")
		},
		"choux" : {
		    hitbox : {
		        x : 20,
		        y : 10,
		        w : 80,
		        h : 50
		    },
			sound : "/pouic.mp3",
			action : Actions.get("bouge-verticale")
		},
		"macaron" : {
			sound : "/boing.mp3",
			action : Actions.get("rebondi")
		},
		"muffin" : { // EXPLOSE
			sound : "/psss.mp3",
			hitbox : {
				x : 94,
				y : 80,
				w : 180,
				h : 180
			},
			action : Actions.get("explose")
		},
		"gateau-fraise" : {
			hitbox : {
				x : 0,
				y : 20,
				w : 170,
				h : 100
			},
			sound : "/ahha.mp3",
			action : {}
		},
		"fraise" : {action : Actions.get("bouge-tue")},
		"citron" : {action : Actions.get("bouge-tue")},
		"gateau-choco" : {
			sound : "/pop.mp3",
			action : Actions.get("bouton")
		},
		"brownie" : {action : Actions.get("porte")},
		"gaufrette" : {
			sound : "/crack.mp3",
			hitbox : {
				x : 0,
				y : 0,
				w : 60,
				h : 30
			},
			action : Actions.get("checkpoint")
		},
		"banane" : {
			sound : "/win.mp3",
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
		"beurre" : {
			sound : "/zouip.mp3",
			action : Actions.get("glisse")
		},
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
		"rouleau" : {
			sound : "/rouleau.mp3",
			action : {}
		},
		"chocolat" : {
			hitbox : {
				x : 0,
				y : -10,
				w : 200,
				h : 20
			},
			sound : "/ahh.mp3",
			action : {}
		},
		"noisette1" : {action : Actions.get("bouge-tue")},
		"noisette2" : {action : Actions.get("bouge-tue")},
		"noisette3" : {action : Actions.get("bouge-tue")},
		"noisette4" : {action : Actions.get("bouge-tue")},
		"pomme" : {
			sound : "/boing.mp3",
			action : Actions.get("rebondi")
		 },
		"poire" : {
			sound : "/poire.mp3",
			hitbox : {
				x : 20,
				y : 20,
				w : 130,
				h : 120
			},
			action : {}
		},
		"pate" : {
			sound : "/cat.mp3",
			hitbox : {
				x : 0,
				y : 50,
				w : 170,
				h : 50
			},
			action : Actions.get("ralenti")
		},
		"mochi" : {
			sound : "/cute.mp3",
			action : Actions.get("bouton")
		},
		"farine" : { // S'OUVRE ET DEVIENT MORTEL EN TOMBANT
			hitbox : {
				x : 0,
				y : 0,
				w : 70,
				h : 145
			},
			action : Actions.get("porte")
		},
		"sucre" : {
			sound : "/crack.mp3",
			action : Actions.get("checkpoint")
		},
		"date" : {
			sound : "/date.mp3",
			action : Actions.get("bouge-verticale")
		},
		"raisin-blanc" : {action : Actions.get("bouge-tue")},
		"raisin-noir" : {action : Actions.get("bouge-tue")},
		"yahourt" : { // ENGLOUTI
			sound : "/hmm.mp3",
			hitbox : {
				x : 50,
				y : 60,
				w : 230,
				h : 270
			},
			action : {
				useY : function(player) {
					var dom = this.dom;
					var index = dom.attr("index");
					var delay = 0;
					if (dom.attr("delay")) delay = parseInt(dom.attr("delay"));
					
					delay++;
					dom.attr("delay", delay);
					if (delay >= 10) {
						dom.attr("delay", 0);
						var saut = 1;
						if (dom.attr("saut")) saut = parseInt(dom.attr("saut"));
						
						saut++;
						dom.attr("saut", saut);
						dom.removeClass(function (index, className) {
						    return (className.match (/\bsaut-\S+/g) || []).join(' ');
						});
						dom.addClass("saut-"+saut);
						
						if (saut == 3) {
							dom.attr("delay", 0);
							var hitbox = this.parent.hitbox;
							var top = dom.position().top + hitbox.y;
							dom.css({
								"z-index" : 50
							});
							$("#player").animate({
								top : top + "px"
							}, function() {
								dom.css({
									"z-index" : 0
								});
								player.flag.dead = true;
								dom.removeClass(function (index, className) {
								    return (className.match (/\bsaut-\S+/g) || []).join(' ');
								});
								dom.removeAttr("saut");
							});
						}
					}
				},
				reset : function(player) {
					var dom = this.dom;
					var index = dom.attr("index");
					dom.attr("delay", 0);
					dom.removeClass(function (index, className) {
					    return (className.match (/\bsaut-\S+/g) || []).join(' ');
					});
					dom.removeAttr("saut");
				}
			}
		},
		"coeur" : {
			sound : "coin.mp3",
			float : true,
			action : {
				useY : function(player) {
					var dom = this.dom;
					if (!dom.attr("use")) {
						player.flag.point++;
						dom.attr("use", true);
						dom.addClass("hidden");
					}
				},
				useX : function(player) {
					var dom = this.dom;
					if (!dom.attr("use")) {
						player.flag.point++;
						dom.attr("use", true);
						dom.addClass("hidden");
					}
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