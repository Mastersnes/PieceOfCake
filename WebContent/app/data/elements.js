'use strict';
define(["jquery"], function($){
	var data = {
		/**
		 * Plateformes
		 */
		"eclair-choco" : { // Ralenti
			useY : function(player) {
				player.moveEngine.changeVitesse = 0.2;
			},
			reset : function(player) {
				player.moveEngine.changeVitesse = 0;
			}
		},
		"eclair-cafe" : {}, // RIEN
		"eclair-vanille" : { // GLISSE
			useY : function(player) {
				var dom = this.dom;
				dom.attr("boost", true);
				player.moveEngine.changeVitesse = 2;
				player.flag.move = player.moveEngine.marche.direction;
			},
			reset : function(player) {
				player.moveEngine.changeVitesse = 0;
			}
		},
		"eclair-fraise" : { // TOMBE
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
		},
		"choux" : {
			useY : function(player) {
				var dom = this.dom;
				var move = dom.attr("move");
				if (move == undefined) {
					dom.attr("lastTop", dom.position().top);
					move = -1;
				}
				
				if (move < 0) {
					dom.attr("move", 0);
					dom.animate({
						top : "+=10px"
					}, "slow", function() {
						dom.attr("move", 1);
					});
				}else if (move > 0) {
					dom.attr("move", 0);
					dom.animate({
						top : "-=10px"
					}, "slow", function() {
						dom.attr("move", -1);
					});
				}
			},
			reset : function(player) {
				var dom = this.dom;
				dom.removeAttr("move");
				var lastTop = dom.attr("lastTop");
				if (lastTop) {
					dom.css({
						top : lastTop
					});
				}
			}
		},
		"macaron" : { // REBONDIT
			useY : function(player) {
				if (player.flag.sautAllowed) player.flag.saute = -1.75;
			}
		},
		"muffin" : { // EXPLOSE
			hitbox : {
				x : 94,
				y : 80,
				w : 180,
				h : 180
			},
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
		},
		"gateau-fraise" : {}, // RIEN
		"fraise" : { // BOUGE ET TUE
			useY : function(player) {
				player.flag.dead = true;
			},
			useX : function(player) {
				player.flag.dead = true;
			},
			reset : function(player) {
				var dom = this.dom;
				if (dom.position().top == 0) return;
				
				var move = -3;
				if (dom.attr("move")) move = dom.attr("move");
				else {
					dom.attr("move", move);
					dom.attr("start", dom.position().top);
				}
				
				var start = parseFloat(dom.attr("start"));
				
				dom.css({
					top : "+="+move+"px"
				});
				if (dom.position().top < start - 100) dom.attr("move", 5);
				else if (dom.position().top > start) dom.attr("move", -3);
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