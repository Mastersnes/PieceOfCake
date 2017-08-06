/*global define */
define(
		[ "jquery", 'underscore', "app/utils/utils", "app/utils/colisionUtils",
		  "app/utils/moveEngine"],
		function($, _, Utils, ColisionUtils, MoveEngine) {
			'use strict';

			return function(stage) {
				this.acceleration = {
					x : 0,
					y : 0
				};
				this.position = {
					x : 0,
					y : 0
				};
				this.flag = {
					move : 0,
					saute : false,
					sautAllowed : true,
					dead : false
				};
				this.delay = [];

				this.init = function(stage) {
					this.el = ".game";
					this.stage = stage;
					this.delay["refresh"] = 0;
					this.moveEngine = new MoveEngine();
					this.reset();
				};

				this.load = function() {
					$(".game .stage").append(stage.createElement({
						id : "player",
						x : this.position.x,
						y : this.position.y
					}));

					this.makeEvents();
				};

				this.refresh = function() {
					this.delay["refresh"] ++;
					var tick = false;
					if (this.delay["refresh"] > 2) {
						this.delay["refresh"] = 0;
						tick = true;
					}
					
					if (this.flag.saute) {
						var max = this.moveEngine.increment("y", this.acceleration, this.flag.saute);
						if (max) {
							this.flag.saute = false;
						}
					}else this.moveEngine.increment("y", this.acceleration);
					
					this.moveEngine.increment("x", this.acceleration, this.flag.move, this.flag.cours);

					/**
					 * On recupere les colision
					 */
					var colision = ColisionUtils.check(this.position, this.acceleration, this.stage.map, this);
					
					/**
					 * Si il existe une plateforme, le joueur peut sauter
					 */
					this.flag.sautAllowed = (colision.y != false);
					if (this.flag.sautAllowed) $("#player").removeClass("saute");
					else $("#player").addClass("saute");
					
					/**
					 * Si il existe une action avec les plateformes
					 */
					if (colision.x && colision.x.useX) colision.x.useX(this);
					if (colision.y && colision.y.useY) colision.y.useY(this);
					
					/**
					 * Le personnage est posé sur une plateforme et n'a rien devant lui
					 * Il peut donc marcher
					 */
					if (tick && !colision.x && colision.y) this.moveEngine.marche(this.flag.move);

					$("#player").css({
						left : this.position.x + "px",
						top : this.position.y + "px"
					});

					if (this.position.y >= 730) this.flag.dead = true;
				};

				this.reset = function() {
					this.position.x = 100;
					this.position.y = 300;
				};

				this.makeEvents = function() {
					var that = this;
					$(document).keydown(function(e) {
						var code = e.keyCode || e.which;
						console.log(code);
						switch (code) {
						case 39: // DROITE
							that.flag.move = 1;
							break;
						case 37: // GAUCHE
							that.flag.move = -1;
							break;
						case 32: // SAUTE
							if (that.flag.sautAllowed)
								that.flag.saute = -1;
							break;
						case 16: // COURS
							that.moveEngine.cours = 2;
							break;
						};
						
					});
					$(document).keyup(function(e) {
						var code = e.keyCode || e.which;
						switch (code) {
						case 39: // DROITE
						case 37: // GAUCHE
							that.flag.move = 0;
							that.acceleration.x = 0;
							break;
						case 16: // MARCHE
							that.moveEngine.cours = 0;
							break;
						}
						;
					});
				};

				this.init(stage);
			};
		});