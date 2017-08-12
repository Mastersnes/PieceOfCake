/*global define */
define(
		[ "jquery", 'underscore', "app/utils/utils", "app/utils/colisionUtils",
		  "app/utils/moveEngine"],
		function($, _, Utils, ColisionUtils, MoveEngine) {
			'use strict';

			return function(stage) {
				this.acceleration = {
						x : 0,
						y : 0,
				};
				this.position = {
					x : 0,
					y : 0,
				};
				this.flag = {
					move : 0,
					dead : false
				};
				this.save = {
					position : null,
					lieu : null,
					stage : null
				};
				this.delay = [];

				this.init = function(stage) {
					this.el = ".game";
					this.stage = stage;
					this.delay["refresh"] = 0;
					
					this.moveEngine = new MoveEngine();
				};

				this.load = function(save) {
					if (save) this.save = save;
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
					
					var delayMax = 1;
					if (this.moveEngine.flag.cours) delayMax = 2;
					
					if (this.delay["refresh"] > delayMax) {
						this.delay["refresh"] = 0;
						tick = true;
					}
					
					this.moveEngine.move(this.acceleration, this.flag.move);

					/**
					 * On recupere les colision
					 */
					var colision = ColisionUtils.check(this.acceleration, this.position, this.stage.map, this);
					
					/**
					 * Si il n'y a rien en dessous, on tombe
					 * Si il existe une plateforme, on le fait tomber tres legerement pour tester les colisions en dessous continuellement
					 */
					if (!colision.y || colision.y.haute) {
						this.moveEngine.flag.tombe = true;
						$("#player").addClass("saute");
					}else {
						this.moveEngine.flag.tombe = false;
						$("#player").removeClass("saute");
					}
					
					/**
					 * Si il existe une action avec les plateformes
					 */
					if (colision.x && colision.x.action && colision.x.action.useX) colision.x.action.useX(this);
					if (colision.y && colision.y.action){
						var colisionAction = colision.y.action;
						var playSound = colisionAction.dom.attr("playSound");
						if (!playSound) {
							colisionAction.dom.attr("playSound", true);
							this.stage.mediatheque.playSound(colision.y.sound);
						}
						if (colisionAction.useY) colisionAction.useY(this);
					}
					
					/**
					 * Le personnage est posé sur une plateforme et n'a rien devant lui
					 * Il peut donc marcher
					 */
					this.moveEngine.oriente(this.flag.move);
					if (tick && !colision.x && colision.y) this.moveEngine.marche(this.flag.move);

					$("#player").css({
						left : this.position.x + "px",
						top : this.position.y + "px"
					});

					if (this.position.y >= 730) this.flag.dead = true;
				};
				
				this.gagne = function() {
					this.stage.gagne();
				};

				this.reset = function() {
					if (this.save.position) {
						this.position.x = this.save.position.x;
						this.position.y = this.save.position.y;
					}
				};
				
				this.savePosition = function(lieu, stage) {
					if (lieu && stage) {
						this.save.lieu = lieu;
						this.save.stage = stage;
					}
					this.save.position = Utils.clone(this.position);
					window.localStorage.setItem(Utils.name, Utils.encode(JSON.stringify(this.save)));
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
							if (!that.moveEngine.flag.tombe)
								that.moveEngine.saute();
							break;
						case 16: // COURS
							that.moveEngine.flag.cours = true;
							break;
						case 27: // PAUSE
							that.stage.togglePause(that.save);
							break;
						};
						
					});
					$(document).keyup(function(e) {
						var code = e.keyCode || e.which;
						switch (code) {
						case 39: // DROITE
						case 37: // GAUCHE
							that.flag.move = 0;
							break;
						case 16: // MARCHE
							that.moveEngine.flag.cours = false;
							break;
						}
						;
					});
				};

				this.init(stage);
			};
		});