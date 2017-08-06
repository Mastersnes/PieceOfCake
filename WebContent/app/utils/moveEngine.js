/*global define */
define(
		[ "jquery", 'underscore', "app/utils/utils"],
		function($, _, Utils) {
			'use strict';

			return function() {
				this.ACCELERATION = {
						x : 2,
						y : 5
					};
				this.ACCELERATION_MAX = {
					x : 5,
					y : 18
				};
				this.cours = 0;
				this.changeVitesse = 0;
				this.increment = function(dir, vecteur, signe) {
					if (!signe && signe != 0) signe = 1;
					
					var acceleration = Utils.clone(this.ACCELERATION);
					var accelerationMax = Utils.clone(this.ACCELERATION_MAX);
					if (dir == "x" && this.cours) {
						acceleration.x *= this.cours;
						accelerationMax.x *= this.cours;
					}
					if (dir == "x" && this.changeVitesse) {
						acceleration.x *= this.changeVitesse;
						accelerationMax.x *= this.changeVitesse;
					}
					if (dir == "y" && Math.abs(signe) > 1) {
						acceleration[dir] *= Math.abs(signe);
						accelerationMax[dir] *= Math.pow(Math.abs(signe), 2);
						signe = signe / Math.abs(signe);
					}
					
					vecteur[dir] += signe * acceleration[dir];
					
					if (Math.abs(vecteur[dir]) > Math.abs(accelerationMax[dir])) {
						vecteur[dir] = (signe * accelerationMax[dir]);
						return true;
					}
					return false;
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
						direction = direction>0?1:-1;
						
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
					
					var mouvement = this.cours?"cours":"marche";
					$("#player").addClass(mouvement+"-"+this.marche.anim);
					
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