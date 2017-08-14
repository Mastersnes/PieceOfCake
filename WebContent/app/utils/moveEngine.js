/*global define */
define(
		[ "jquery", 'underscore', "app/utils/utils"],
		function($, _, Utils) {
			'use strict';

			return function() {
				this.acceleration = {
						x : 1,
						y : 2
				};
				this.vitesse = {
						x : 4,
						y : 0
				};
				this.v0 = {
						x : 0,
						y : -15
				};
				this.max = {
						x : 3,
						y : 15
				};
				this.flag = {
						tombe : true,
						cours : false,
						lockCours : false
				};
				this.move = function(accelerationPerso, signe) {
					var acceleration = Utils.clone(this.acceleration); var vitesse = this.vitesse;
					var v0 = Utils.clone(this.v0); var max = Utils.clone(this.max);
					
					if (this.flag.cours) acceleration.x *= 2;
					
					accelerationPerso.x = signe * vitesse.x * acceleration.x;
					accelerationPerso.y = vitesse.y;
					
					vitesse.y += acceleration.y;
					if (vitesse.y > max.y) vitesse.y = max.y;
					
				};
				
				this.saute = function(multiple) {
					if (!multiple) multiple = 1;
					this.vitesse.y = this.v0.y * multiple;
				};

				this.marche = {
					anim : 0,
					incr : 0,
					direction : 1
				};
				this.marche = function(direction) {
					if (direction == 0) {
						this.marche.anim = 0;
						this.marche.incr = 0;
					}else {
						if (!this.marche.incr) this.marche.incr = 1;
						
						this.marche.anim += this.marche.incr;
						if (this.marche.anim == 3) this.marche.incr = -1;
						if (this.marche.anim == 1) this.marche.incr = 1;
					}
					$("#player").removeClass(function (index, className) {
					    return (className.match (/\bmarche-\S+/g) || []).join(' ');
					});
					$("#player").removeClass(function (index, className) {
						return (className.match (/\bcours-\S+/g) || []).join(' ');
					});
					
					var mouvement = this.flag.cours?"cours":"marche";
					$("#player").addClass(mouvement+"-"+this.marche.anim);
				};
				this.oriente = function(direction) {
					if (direction != 0) direction = direction>0?1:-1;
						
					if (direction && this.marche.direction != direction) {
						this.marche.direction = direction;
						$("#player").css({
							"-moz-transform": "scaleX("+this.marche.direction+")",
						    "-o-transform": "scaleX("+this.marche.direction+")",
						    "-webkit-transform": "scaleX("+this.marche.direction+")",
						    transform: "scaleX("+this.marche.direction+")"
						});
					}
				};
			};
		});