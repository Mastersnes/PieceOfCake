'use strict';
define(["jquery", "app/data/elements"], function($, ElementsData){
	return {
		/**
		* Permet d'appeler un WS
		**/
		check : function(acceleration, position, map, player) {
			var colision = {
				haut : false,
				bas : false,
				gauche : false,
				droite : false
			};
			
			var x0 = position.x; var x1 = x0 + acceleration.x;
			var y0 = position.y; var y1 = y0 + acceleration.y;
			var w0 = $("#player").width(); var w1 = w0;
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
				
				$(this).removeClass("saut");
				var id = $(this).attr("id");
				var element = ElementsData.get(id);
				if (element.action) {
					element.action.dom = $(this);
					element.action.parent = element;
				}
				
				var x2 = $(this).position().left; var y2 = $(this).position().top;
				var w2 = $(this).width(); var h2 = $(this).height();
				
				if (x1 + w1 > x2 && x1 < x2 + w2) {
					if (y1 + h1 > y2 && y1 < y2 + h2) { // COLLISION !
						
						if (x0 + w0 < x2 && x1 + w1 > x2) colision.gauche = element;
						if (x0 > x2 + w2 && x1 < x2 + w2) colision.droite = element;
						
						if (y0 + h0 < y2 && y1 + h1 > y2) colision.haut = element;
						if (y0 < y2 + h2 && y1 < y2 + h2) colision.bas = element;
					}
				}
				
				if (colision.bas == element || colision.haut == element) {
					$(".hitbox.y").show();
					$(".hitbox.y").css({
						left : x2,
						top : y2,
						width : w2,
						height : h2
					});
				}else {
					$(".hitbox.y").hide();
				}
				if (colision.gauche == element || colision.droite == element) {
					$(".hitbox.x").show();
					$(".hitbox.x").css({
						left : x2,
						top : y2,
						width : w2,
						height : h2
					});
				}else {
					$(".hitbox.y").hide();
				}
				
				if (colision.haut == element) $(this).addClass("saut");
				else if (element && element.action) {
					element.action.dom.removeAttr("playSound");
					if (element.action.reset) element.action.reset(player);
				}
			});
			
			if (!colision.gauche && !colision.droite) position.x = position.x + acceleration.x;
			if (!colision.haut && !colision.bas) position.y = position.y + acceleration.y;
			
			if (position.x < 0) position.x = 0;
			if (position.y < 0) position.y = 1;
			return colision;
		}
	};
});