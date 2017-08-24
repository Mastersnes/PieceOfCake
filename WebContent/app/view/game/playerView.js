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
					point : 0,
					deathNb : 0,
					dead : false,
					glisse : false
				};
				this.save = {
					position : null,
					lieu : null,
					stage : null,
					point : 0,
					deathNb : 0
				};
				this.delay = [];
				
				this.alreadyLoad = false;

				this.init = function(stage) {
					this.el = ".game";
					this.stage = stage;
					this.delay["refresh"] = 0;
					
					this.moveEngine = new MoveEngine();
				};

				this.load = function(save) {
					if (save) {
						this.save = save;
						this.position.x = this.save.position.x;
						this.position.y = this.save.position.y;
						this.flag.point = this.save.point;
						this.flag.deathNb = this.save.deathNb;
					}
				};
				
				this.render = function() {
					$(".game .stage").append(stage.createElement({
						id : "player",
						x : this.position.x,
						y : this.position.y
					}));
					
					if (!this.alreadyLoad) this.makeEvents();
				};
				
				this.stopSound = function (key) {
					this.stage.mediatheque.stopSound(key);
				};
				this.playSound = function (key) {
					this.stage.mediatheque.playSound(key);
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
					
					/**
					 * On calcul le deplacement
					 */
					this.moveEngine.move(this.acceleration, this.flag.move);

					/**
					 * On recupere les colision
					 */
					var colision = ColisionUtils.check(this.acceleration, this.position, this);
					
					/**
					 * Si il n'y a rien en dessous, on tombe
					 */
					if (!colision.haut) {
						this.moveEngine.flag.tombe = true;
						$("#player").addClass("saute");
					}else {
						var colisionAction = colision.haut.action;
						
						var playSound = colisionAction.dom.attr("playSound");
						if (!playSound) {
							colisionAction.dom.attr("playSound", true);
							this.playSound(colision.haut.sound);
						}
						
						this.moveEngine.flag.tombe = false;
						$("#player").removeClass("saute");
						colision.haut.action.dom.addClass("saut");
					}
					
					if (colision.gauche && colision.gauche.action.useX) colision.gauche.action.useX(this);
					if (colision.droite && colision.droite.action.useX) colision.droite.action.useX(this);
					if (colision.haut && colision.haut.action.useY) colision.haut.action.useY(this);
					if (colision.bas && colision.bas.action.useY) colision.bas.action.useY(this);
					
					/**
					 * Le personnage est pose sur une plateforme et n'a rien devant lui
					 * Il peut donc marcher
					 */
					this.moveEngine.oriente(this.flag.move);
					if (tick && !colision.gauche && !colision.droite && colision.haut) this.moveEngine.marche(this.flag.move);

					/**
					 * On bouge le personnage
					 */
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
					this.save.point = this.flag.point;
					this.save.deathNb = this.flag.deathNb;
					console.log("save : ", this.save);
					window.localStorage.setItem(Utils.name, Utils.encode(JSON.stringify(this.save)));
				};

				this.makeEvents = function() {
					this.alreadyLoad = true;
					
					var that = this;
					$(document).keydown(function(e) {
						e.preventDefault();
						var code = e.keyCode || e.which;
						console.log(code);
						switch (code) {
							case 39: // DROITE
							case 68: // DROITE
								if (!that.flag.glisse)that.flag.move = 1;
								break;
							case 37: // GAUCHE
							case 81: // GAUCHE
							case 65: // GAUCHE
								if (!that.flag.glisse)that.flag.move = -1;
								break;
							case 32: // SAUTE
							case 90: // SAUTE
							case 87: // SAUTE
							case 38:
								if (!that.moveEngine.flag.tombe)
									that.moveEngine.saute();
								break;
							case 16: // COURS
								that.moveEngine.flag.cours = true;
								break;
							case 20: // COURS
								if (!that.moveEngine.flag.lockCours) {
									that.moveEngine.flag.cours = true;
									that.moveEngine.flag.lockCours = true;
								}else {
									that.moveEngine.flag.cours = false;
									that.moveEngine.flag.lockCours = false;
								}
								break;
							case 27: // PAUSE
								that.stage.togglePause(that.save, that.flag.point, that.flag.deathNb);
								break;
						};
						
					});
					$(document).keyup(function(e) {
						var code = e.keyCode || e.which;
						switch (code) {
						case 39: // DROITE
						case 68: // DROITE
						case 37: // GAUCHE
						case 81: // GAUCHE
						case 65: // GAUCHE
							if (!that.flag.glisse)that.flag.move = 0;
							break;
						case 16: // MARCHE
							if (!that.moveEngine.flag.lockCours) {
								that.moveEngine.flag.cours = false;
							}
							break;
						}
						;
					});
				};

				this.init(stage);
			};
		});