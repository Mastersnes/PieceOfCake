'use strict';
define(["jquery"], function($){
	var data = {
		/**
		 * Plateformes
		 */
		"eclair-choco" : {
			useY : function(player) {
				player.moveEngine.changeVitesse = 0.2;
			},
			reset : function(player) {
				player.moveEngine.changeVitesse = 0;
			}
		},
		"eclair-cafe" : {},
		"eclair-vanille" : {
			useY : function(player) {
				player.moveEngine.changeVitesse = 1.5;
				player.flag.move = player.moveEngine.marche.direction;
			},
			reset : function(player) {
				player.moveEngine.changeVitesse = 0;
			}
		},
		"eclair-fraise" : {
			useY : function(player) {
				var dom = this.dom;
				var index = dom.attr("index");
				if (player.delay["eclair-fraise"+index] == undefined) player.delay["eclair-fraise"+index] = 0;
				
				var delay = ++player.delay["eclair-fraise"+index];
				if (delay >= 10) {
					dom.attr("lastTop", dom.position().top);
					dom.animate({
						top : "1000px"
					});
				}
			},
			reset : function(player) {
				var dom = this.dom;
				var index = dom.attr("index");
				player.delay["eclair-fraise"+index] = 0;
				var lastTop = dom.attr("lastTop");
				if (lastTop) {
					dom.animate({
						top : lastTop
					});
				}
			}
		},
		"choux" : {},
		"macaron" : {
			useY : function(player) {
				if (player.flag.sautAllowed) player.flag.saute = -1.75;
			}
		},
		"muffin" : {
			hitbox : {
				x : 94,
				y : 80,
				w : 180,
				h : 180
			},
			useY : function(player) {
				var dom = this.dom;
				var index = dom.attr("index");
				if (player.delay["muffin"+index] == undefined) player.delay["muffin"+index] = 0;
				
				var delay = ++player.delay["muffin"+index];
				if (delay >= 10) {
					player.delay["muffin"+index] = 0;
					var saut = dom.attr("saut");
					if (!saut) saut = 0;
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