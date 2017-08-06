'use strict';
define(["jquery", "app/data/elements"], function($, ElementsData){
	return {
		/**
		* Permet d'appeler un WS
		**/
		check : function(start, move, map, player) {
			var colision = {
				x : false,
				y : false
			};
			
			var x0 = start.x + 20;
			var x1 = x0 + move.x;
			var y0 = start.y;
			var y1 = start.y + move.y;
			var w1 = $("#player").width() - 40;
			var h1 = $("#player").height() - 20;
			
			$(".hitbox").css({
				left : x0,
				top : y0,
				width : w1,
				height : h1
			});
			
			if (y1 < 0 || y1 > 768) colision.y = true;
			if (x1 < 0) colision.x = true;
			$(".stage .element:not(#player)").each(function() {
				$(this).removeClass("saut");
				var id = $(this).attr("id");
				var element = ElementsData.get(id);
				element.dom = $(this);
				var x2 = $(this).position().left; var y2 = $(this).position().top;
				var w2 = $(this).width(); var h2 = $(this).height();
				
				if (element && element.hitbox) {
					x2 = x2 + element.hitbox.x; y2 = y2 + element.hitbox.y;
					w2 = element.hitbox.w; h2 = element.hitbox.h;
				}
				
				if (x1 + w1 > x2 && x1 < x2 + w2) { // Collision X potentiel
					if (y0 + h1 > y2 && y0 < y2 + h2) { //Collision X certaine
						console.log("colisionx");
						colision.x = element;
					}
				}
				if (y1 + h1 > y2 && y1 < y2 + h2) { //Collision Y potentiel
					if (x0 + w1 > x2 && x0 < x2 + w2) { // Collision Y certaine
						colision.y = element;
						colision.y.haute = y1 > y2;
					}
				}
				
				if (colision.y == element) {
					$(".hitbox").css({
						left : x2,
						top : y2,
						width : w2,
						height : h2
					});
					$(this).addClass("saut");
				}else if (element.reset) {
					element.reset(player);
				}
			});
			
			if (!colision.x) start.x += move.x;
			if (!colision.y) start.y += move.y;
			else if (!colision.y.haute) {
				var dom = colision.y.dom;
				if (dom && dom.position) {
					var y2 = dom.position().top;
					if (colision.y && colision.y.hitbox) {
						y2 = y2 + colision.y.hitbox.y;
					}
					
					start.y = y2 - 58;
				}
			}
			return colision;
		}
	};
});