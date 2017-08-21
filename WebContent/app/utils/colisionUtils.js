'use strict';
define(["jquery", "app/data/elements"], function($, ElementsData){
	return {
		/**
		* Permet d'appeler un WS
		**/
		check : function(acceleration, position, player) {
			var colision = {
				haut : null,
				bas : null,
				gauche : null,
				droite : null
			};
			
			var x0 = position.x; var x1 = x0 + acceleration.x + 15;
			var y0 = position.y; var y1 = y0 + acceleration.y;
			var w0 = $("#player").width(); var w1 = w0 - 30;
			var h0 = $("#player").height(); var h1 = h0;
			
			$(".hitbox.perso").css({
				left : x1,
				top : y1,
				width : w1,
				height : h1
			});
			
			if (y1 > 768) colision.haut = true;
			$(".stage .element:not(#player):visible").each(function() {
			    if ($(this).offset().left - $(this).width() < -1000) return true;
				if ($(this).offset().left > $(".game").width() + 1000) return true;
				
				var col = {
				        element : null,
				        sens : null
				};
				
				$(this).removeClass("saut");
				var id = $(this).attr("id");
				var element = ElementsData.get(id);
				if (element.action) {
					element.action.dom = $(this);
					element.action.parent = element;
				}else {
				    element.action = {
				            dom : $(this)
				    };
				}
				
				var x2 = $(this).position().left; var y2 = $(this).position().top;
				var w2 = $(this).width(); var h2 = $(this).height();
				if (element.hitbox) {
                    x2 = x2 + element.hitbox.x; y2 = y2 + element.hitbox.y;
                    w2 = element.hitbox.w; h2 = element.hitbox.h;
                }
				
				if (x1 + w1 > x2 && x1 < x2 + w2) {
					if (y1 + h1 > y2 && y1 < y2 + h2) { // COLLISION !
					    if (y1 + h1 <= y2 + (h2/2)) col = {
                                element : element,
                                sens : "haut"
                        };
                        if (col.element == null && y1 > y2 + (h2/2)) col = {
                                element : element,
                                sens : "bas"
                        };
						if (col.element == null && x1 + w1 <= x2 + (w2/2)) col = {
						        element : element,
						        sens : "gauche"
						};
						if (col.element == null && x1 > x2 + (w2/2)) col = {
                                element : element,
                                sens : "droite"
                        };
					}
				}
				
				if (col.element) {
				    colision[col.sens] = col.element;
				    $(".hitbox."+col.sens).show();
				    $(".hitbox."+col.sens).css({
	                    left : x2,
	                    top : y2,
	                    width : w2,
	                    height : h2
	                });
				}
				else if (element.action.reset) element.action.reset(player);
			});
			
			/**
             * DEBUG
             */
            if (!colision.bas) $(".hitbox.bas").hide();
            if (!colision.haut) $(".hitbox.haut").hide();
            if (!colision.gauche) $(".hitbox.gauche").hide();
            if (!colision.droite) $(".hitbox.droite").hide();
            /**
             *  -- END DEBUG
             */
			
            /**
             * Si pas de colision on bouge
             */
			if ((!colision.gauche || colision.gauche.float) && (!colision.droite || colision.droite.float)) position.x = position.x + acceleration.x;
			if ((!colision.haut || colision.haut.float)) position.y = position.y + acceleration.y;
			
			/**
			 * Si colision haute ou basse on rectifie le tir
			 */
			if (colision.haut && !colision.haut.float) {
			    position.y = colision.haut.action.dom.position().top - (h1 - 10);
			    player.moveEngine.vitesse.y = 1;
			}else if (colision.bas && !colision.bas.float) {
			    position.y = colision.bas.action.dom.position().top + colision.bas.action.dom.height();
                player.moveEngine.vitesse.y = 1;
			}
			
			if (position.x < 0) position.x = 0;
			if (position.y < 0) position.y = 1;
			return colision;
		}
	};
});