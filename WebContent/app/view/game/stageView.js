/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "app/data/stages.js",
        "app/view/game/playerView"],
function($, _, Utils, Stages, PlayerView) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = ".game";
			this.player = new PlayerView(this);
		};

		this.load = function(lieu, id) {
			this.map = Stages.get(lieu + id);
			$(".game .background").attr("class", "plan background "+lieu);
			$(".game .frontground").attr("class", "plan frontground "+lieu);
			
			for (var index in this.map.elements) {
				var element = this.map.elements[index];
				$(".game .stage").append(this.createElement(element, index));
			}
			for (var index in this.map.back) {
				var element = this.map.back[index];
				$(".game .stage").append(this.createElement(element, index, "back"));
			}
			
			var player = this.player;
			if (player.save.lieu != (lieu + id)) {
				player.position.x = this.map.start.x;
				player.position.y = this.map.start.y;
				player.savePosition(lieu + id);
			}else {
				player.reset();
			}
			
			player.load();
			
//			$(".game").animate({
//				left : (player.position.x - 100) + "px"
//			}, 1000);
			
			this.loop();
		};
		
		this.createElement = function(element, index, type) {
			if (!type) type = "element";
			var dom = $("<div></div>");
			dom.attr("id", element.id);
			if (element.ref) dom.attr("ref", element.ref);
			if (element.cible) dom.attr("cible", element.cible);
			if (element.vitesse) dom.attr("vitesse", element.vitesse);
			if (element.descente) dom.attr("descente", element.descente);
			if (element.distance) dom.attr("distance", element.distance);
			if (element.sens) dom.attr("sens", element.sens);
			dom.attr("index", index);
			dom.attr("class", type + " "+ element.id);
			dom.css({
				left : element.x,
				top : element.y
			});
			return dom;
		};
		
		this.loop = function() {
			var player = this.player;
			player.refresh();
			
			this.moveStage();
			
			if (player.flag.dead) {
				player.flag.dead = false;
				player.reset();
				
				var position = -1*(player.position.x - 300);
				if (position > 0) position = 0; 
				
				$(".game").animate({
					left : position + "px"
				}, 1000);
			}
			
			var that = this;
			setTimeout(function() {
				that.loop();
			}, 45);
		};
		
		this.moveStage = function() {
			var screenW = $(window).width();
			var playerX = $("#player").position().left;
			var stageX = $(".game").position().left;
			// On calcul la position relative du joueur par rapport au stage
			var playerXR = playerX + stageX;
			
			if (playerXR > Utils.percent(screenW, 50)) {
				var incr = playerXR - Utils.percent(screenW, 50);
				$(".game").css({
					left : "-="+incr+"px"
				});
			}else if (playerXR < Utils.percent(screenW, 30)) {
				if (stageX < 0) {
					$(".game").css({
						left : "+=5px"
					});
				}
			}
		};
		
		this.init();
	};
});