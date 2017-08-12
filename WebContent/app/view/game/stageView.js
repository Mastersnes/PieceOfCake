/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "app/view/game/cinematiqueView",
        "app/data/stages.js",
        "app/view/game/playerView"],
function($, _, Utils, CinematiqueView, Stages, PlayerView) {
	'use strict';

	return function(parent, Textes) {
		this.init = function(parent, Textes) {
			this.el = ".game";
			this.Textes = Textes;
			this.parent = parent;
			this.mediatheque = parent.mediatheque;
			this.pause = false;
			this.player = new PlayerView(this);
		};

		this.go = function(lieu, stage, position) {
			if (!this.cinematique) this.cinematique = new CinematiqueView(this.Textes);
			this.map = Stages.get(lieu + stage);
			
			if (this.map.end) {
				parent.gameOver();
			}else {
				this.mediatheque.stopAll();
				if (this.map.music) this.mediatheque.play(this.map.music);
				
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
				if (position) {
					player.position.x = position.x;
					player.position.y = position.y;
				}else {
					//Initialisation du stage
					if (this.map.cinematique) {
						this.cinematique.load(this.map.cinematique);
					}
					player.position.x = this.map.start.x;
					player.position.y = this.map.start.y;
				}
				player.savePosition(lieu, stage);
				player.reset();
				player.load();

				if (!this.alreadyLoop) {
					console.log("startloop");
					this.loop();
				}
			}
		};
		
		this.gagne = function() {
			$(".game .stage").empty();
			$(".game").css({
				left : "0px"
			});
			this.go(this.map.gagne.lieu, this.map.gagne.stage);
		};

		this.load = function(save) {
			this.go(save.lieu, save.stage, save.position);
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
			if (element.sound) dom.attr("sound", element.sound);
			dom.attr("index", index);
			dom.attr("class", type + " "+ element.id);
			dom.css({
				left : element.x,
				top : element.y
			});
			return dom;
		};
		
		this.loop = function() {
			this.alreadyLoop = true;
			if (!this.pause && this.cinematique.empty()) {
				var player = this.player;
				player.refresh();
				
				this.moveStage();
				
				if (player.flag.dead) {
					player.flag.dead = false;
					player.reset();
					
					player.flag.move = 0;
					
					var position = -1*(player.position.x - 300);
					if (position > 0) position = 0;
					
					$(".game").css({
						left : position + "px"
					}, 1000);
				}
			}
			
			var that = this;
			setTimeout(function() {
				that.loop();
			}, 40);
		};
		
		this.togglePause = function(save) {
			
			this.pause = !this.pause;
			if (this.pause) {
				var code = Utils.encode(JSON.stringify(save));
				$("#pause #code").html(code);
				$("#pause").show();
			}else {
				$("#pause").hide();
			}
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
		
		this.init(parent, Textes);
	};
});