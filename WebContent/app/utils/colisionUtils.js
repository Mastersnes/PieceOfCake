'use strict';
define(["jquery", "app/data/elements"], function($, ElementsData){
	return {
		/**
		* Permet d'appeler un WS
		**/
		check : function(acceleration, position, map, player) {
			var colision = {
				x : false,
				y : false
			};
			
			var move = {
					x : 0,
					y : 0
			};
			if (acceleration.x != 0) move.x = Math.abs(acceleration.x) / acceleration.x;
			if (acceleration.y != 0) move.y = Math.abs(acceleration.y) / acceleration.y;
			
			var x0 = position.x + 20; var x1 = x0 + move.x;
			var y0 = position.y; var y1 = y0 + move.y;
			var w0 = $("#player").width(); var w1 = w0 - 40;
			var h0 = $("#player").height(); var h1 = h0 - 20;
			
			$(".hitbox").css({
				left : x1,
				top : y1,
				width : w1,
				height : h1
			});
			
			if (y1 < 0 || y1 > 768) colision.y = true;
			$(".stage .element:not(#player)").each(function() {
				$(this).removeClass("saut");
				var id = $(this).attr("id");
				var element = ElementsData.get(id);
				if (element.action) element.action.dom = $(this);
				
				var x2 = $(this).position().left; var y2 = $(this).position().top;
				var w2 = $(this).width(); var h2 = $(this).height();
				if ($(this).attr("newHitbox")) {
					var hitbox = JSON.parse($(this).attr("newHitbox"));
					x2 = parseInt(hitbox.x); y2 = parseInt(hitbox.y);
					w2 = parseInt(hitbox.w); h2 = parseInt(hitbox.h);
				}else if (element && element.hitbox) {
					x2 = x2 + element.hitbox.x; y2 = y2 + element.hitbox.y;
					w2 = element.hitbox.w; h2 = element.hitbox.h;
				}
				
				if ((y1 + h1 > y2 && y1 < y2 + h2)) { //Collision Y potentiel
					if (x0 + w1 > x2 && x0 < x2 + w2) { // Collision Y certaine
						colision.y = element;
						if (y1 < y2) position.y = y2 - h1;
						y0 = position.y;
					}
				}
				
				if ((x1 + w1 > x2 && x1 < x2 + w2)) { // Collision X potentiel
					if (y0 + h1 > y2 && y0 < y2 + h2) { //Collision X certaine
						colision.x = element;
						if (x1 > x2+(w2/2)) position.x = x2 + w2;
						else position.x = x2 - w0 - 10;
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
				}else if (element && element.action && element.action.reset) {
					element.action.reset(player);
				}
			});
			
			if (!colision.x) position.x = position.x + acceleration.x;
			if (!colision.y) position.y = position.y + acceleration.y;
			
			if (position.x < 0) position.x = 0;
			return colision;
		}
	};
});