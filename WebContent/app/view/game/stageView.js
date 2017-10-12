/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "app/view/game/cinematiqueView",
        "app/data/stages.js",
        "app/view/game/playerView"],
function($, _, Utils, CinematiqueView, Stages, PlayerView) {
	'use strict';

	return function(parent, Textes, difficulty) {
		this.init = function(parent, Textes, difficulty) {
			this.el = ".game";
			this.Textes = Textes;
			this.parent = parent;
			this.mediatheque = parent.mediatheque;
			this.pause = false;
			this.player = new PlayerView(this);
			this.player.difficulty = difficulty;
		};

		this.go = function(lieu, stage, save) {
			$("#cinematique").show();
			if (!this.cinematique) this.cinematique = new CinematiqueView(this.Textes);
			this.map = Stages.get(lieu, stage);
			
			if (this.map.end) {
				if (this.map.cinematique) {
					this.cinematique.load(this.map.cinematique);
				}else {
					$("#cinematique").hide();
				}
				parent.gameOver(this.player.flag.point);
			}else {
				this.mediatheque.stopAllMusic();
				if (this.map.music) this.mediatheque.play(this.map.music);
				
				$(".game .background").attr("class", "plan background "+lieu);
				$(".game .frontground").attr("class", "plan frontground "+lieu);
				
				var listeElements = this.map.elements[this.player.difficulty];
				for (var index in listeElements) {
					var element = listeElements[index];
					$(".game .stage").append(this.createElement(element, index));
				}
				for (var index in this.map.back) {
					var element = this.map.back[index];
					$(".game .stage").append(this.createElement(element, index, "back"));
				}
				
				var player = this.player;
				if (save) {
					$("#cinematique").hide();
					player.load(save);
				}else {
					//Initialisation du stage
					if (this.map.cinematique) {
						this.cinematique.load(this.map.cinematique);
					}else {
						$("#cinematique").hide();
					}
					player.position.x = this.map.start.x;
					player.position.y = this.map.start.y;
				}
				player.savePosition(lieu, stage);
				player.reset();
				player.render();

				if (!this.alreadyLoop) {
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
			if (save.difficulty) this.player.difficulty = save.difficulty;
			else this.player.difficulty = "moyen";
			this.go(save.lieu, save.stage, save);
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
					player.flag.deathNb++;
					this.mediatheque.playSound("/slurp.mp3");
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
			}, 30);
		};
		
		this.togglePause = function(save, point, deathNb) {
			
			this.pause = !this.pause;
			if (this.pause) {
				var code = Utils.encode(JSON.stringify(save));
				$("#pause #code").html(code);
				$("#pause #point").html(point);
				$("#pause #deathNb").html(deathNb);
				$("#pause").show();
			}else {
				$("#pause").hide();
			}
		};
		
		this.moveStage = function() {
			if ($("#player").length == 0) return;
			
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
		
		this.init(parent, Textes, difficulty);
	};
});