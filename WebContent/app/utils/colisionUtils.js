'use strict';
define(["jquery", "app/data/elements", "app/utils/elementUtils"], function($, ElementsData, ElementUtils){
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
				}else element.action = {dom : $(this)};
				
				var hitbox = ElementUtils.getHitbox(element);
				
				if (x1 + w1 > hitbox.x && x1 < hitbox.x + hitbox.w) {
					if (y1 + h1 > hitbox.y && y1 < hitbox.y + hitbox.h) { // COLLISION !
					    if (y1 + h1 <= hitbox.y + (hitbox.h/2)) col = {
                                element : element,
                                sens : "haut"
                        };
                        if (col.element == null && y1 > hitbox.y + (hitbox.h/2)) col = {
                                element : element,
                                sens : "bas"
                        };
						if (col.element == null && x1 + w1 <= hitbox.x + (hitbox.w/2)) col = {
						        element : element,
						        sens : "gauche"
						};
						if (col.element == null && x1 > hitbox.x + (hitbox.w/2)) col = {
                                element : element,
                                sens : "droite"
                        };
					}
				}
				
				if (col.element) {
				    colision[col.sens] = col.element;
				    $(".hitbox."+col.sens).show();
				    $(".hitbox."+col.sens).css({
	                    left : hitbox.x,
	                    top : hitbox.y,
	                    width : hitbox.w,
	                    height : hitbox.h
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
			    var hitbox = ElementUtils.getHitbox(colision.haut);
			    position.y = hitbox.y - (h1 - 10);
			    player.moveEngine.vitesse.y = 1;
			}else if (colision.bas && !colision.bas.float) {
			    var hitbox = ElementUtils.getHitbox(colision.bas);
			    position.y = hitbox.y + hitbox.h + 10;
                player.moveEngine.vitesse.y = 1;
			}
			
			if (position.x < 0) position.x = 0;
			if (position.y < 0) position.y = 1;
			return colision;
		}
	};
});