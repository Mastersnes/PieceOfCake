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
			this.map = Stages.get("boulangerie");
			this.player = new PlayerView(this);
		};

		this.load = function(id) {
			$(".game .background").attr("class", "plan background "+id);
			$(".game .frontground").attr("class", "plan frontground "+id);
			
			for (var index in this.map.elements) {
				var element = this.map.elements[index];
				$(".game .stage").append(this.createElement(element, index));
			}
			for (var index in this.map.back) {
				var element = this.map.back[index];
				$(".game .stage").append(this.createElement(element, index, "back"));
			}
			
			this.player.load();
			
			this.loop();
		};
		
		this.createElement = function(element, index, type) {
			if (!type) type = "element";
			var dom = $("<div></div>");
			dom.attr("id", element.id);
			dom.attr("index", index);
			dom.attr("class", type + " "+ element.id);
			dom.css({
				left : element.x,
				top : element.y
			});
			return dom;
		};
		
		this.loop = function() {
			this.player.refresh();
			
			this.moveStage();
			
			if (this.player.flag.dead) {
				this.player.flag.dead = false;
				this.player.reset();
				$(".game").animate({
					left : "0px"
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
			
			if (playerXR > Utils.percent(screenW, 60)) {
				$(".game").css({
					left : "-=5px"
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