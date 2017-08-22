'use strict';
define(["jquery", "app/data/elements"], function($, ElementsData){
	return {
		/**
		* Permet de renvoyer la hitbox 
		**/
		getHitbox : function(element) {
		    var dom = element.action.dom;
		    var x2 = dom.position().left; var y2 = dom.position().top;
            var w2 = dom.width(); var h2 = dom.height();
            if (element.hitbox) {
                x2 = x2 + element.hitbox.x; y2 = y2 + element.hitbox.y;
                w2 = element.hitbox.w; h2 = element.hitbox.h;
            }
            
            return {
                x : x2, y : y2, w : w2, h : h2
            };
		}
	};
});