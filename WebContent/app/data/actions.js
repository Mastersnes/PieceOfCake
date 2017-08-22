'use strict';
define(["jquery"], function($){
	var data = {
		"ralenti" : { // Ralenti
			useY : function(player) {
				var dom = this.dom;
				dom.attr("soundPlay", true);
				var vitesse = 0.2;
				if (dom.attr("vitesse")) vitesse = parseFloat(dom.attr("vitesse"));
				player.moveEngine.acceleration.x = vitesse;
			},
			reset : function(player) {
				var dom = this.dom;
				if (dom.attr("soundPlay")) {
					dom.removeAttr("soundPlay");
					player.stopSound("/cat.mp3");
				}
				player.moveEngine.acceleration.x = 1;
			}
		},
		"glisse" : { // GLISSE
			useY : function(player) {
				var dom = this.dom;
				var vitesse = 2;
				var acceleration = 0;
				if (dom.attr("vitesse")) vitesse = parseFloat(dom.attr("vitesse"));
				if (dom.attr("acceleration")) acceleration = parseFloat(dom.attr("acceleration"));
				player.moveEngine.acceleration.x = vitesse;
				player.flag.move = player.moveEngine.marche.direction;
				player.flag.glisse = true;
				dom.attr("vitesse", vitesse + acceleration);
			},
			reset : function(player) {
				player.moveEngine.acceleration.x = 1;
				player.flag.glisse = false;
			}
		},
		"bouge-verticale" : { // BOUGE VERTICALEMENT
			useY : function(player, onReset) {
			    var dom = this.dom;
                
                var move = -1;
                if (dom.attr("move")) move = parseInt(dom.attr("move"));
                else {
                    dom.attr("move", move);
                    dom.attr("start", dom.position().top);
                }
                var start = parseFloat(dom.attr("start"));
                
                var speed = 2000;
                if (dom.attr("vitesse")) speed = parseInt(dom.attr("vitesse"));
                var distance = 50;
                if (dom.attr("distance")) distance = parseInt(dom.attr("distance"));
                
                if (!dom.attr("inMove")) {
                    dom.attr("inMove", true);
                    dom.animate({
                        top : (start + (distance*move))+"px"
                    }, speed, function() {
                        dom.removeAttr("inMove");
                        dom.attr("move", -1 * move)
                    });
                }else if (!onReset) {
                    player.position.y = dom.position().top - 60;
                }
			},
			reset : function(player) {this.useY(player, true);}
		},
		"explose" : {
			useY : function(player) {
				var dom = this.dom;

				var delay = 0;
				if (dom.attr("delay")) delay = parseInt(dom.attr("delay"));
				
				dom.attr("soundPlay", true);
				
				delay++;
				dom.attr("delay", delay);
				if (delay >= 10) {
					dom.attr("delay", 0);
					var saut = 1;
					if (dom.attr("saut")) saut = parseInt(dom.attr("saut"));
					saut++;
					
					dom.attr("saut", saut);
					dom.removeClass(function (index, className) {
					    return (className.match (/\bsaut-\S+/g) || []).join(' ');
					});
					dom.addClass("saut-"+saut);
					
					if (saut == 4) {
						dom.removeAttr("soundPlay");
						player.stopSound("/effort.mp3");
						player.playSound("/boom.mp3");
						dom.attr("delay", 9);
					}
					
					if (saut > 4) {
						dom.removeClass(function (index, className) {
						    return (className.match (/\bsaut-\S+/g) || []).join(' ');
						});
						dom.removeAttr("saut");
						player.flag.dead = true;
					}
				}
			},
			reset : function(player) {
				var dom = this.dom;
				
				if (dom.attr("soundPlay")) {
					dom.removeAttr("soundPlay");
					player.stopSound("/psss.mp3");
				}
				
				dom.attr("delay", 0);
				dom.removeClass(function (index, className) {
				    return (className.match (/\bsaut-\S+/g) || []).join(' ');
				});
				dom.removeAttr("saut");
			}
		},
		"tombe" : {
			useY : function(player) {
				var dom = this.dom;
				
				var delay = 0;
				if (dom.attr("delay")) delay = parseInt(dom.attr("delay"));
				
				dom.attr("soundPlay", true);
				
				delay++;
				dom.attr("delay", delay);
				if (!dom.hasClass("shake")) dom.addClass("shake");
				
				if (delay == 15) {
					dom.removeAttr("soundPlay");
					player.stopSound("/effort.mp3");
					player.playSound("/pouah.mp3");
					
					dom.attr("lastTop", dom.position().top);
					dom.animate({
						top : "1500px"
					}, 1000);
				}
			},
			reset : function(player) {
				var dom = this.dom;
				
				dom.attr("delay", 0);
				dom.removeClass("shake");
				var lastTop = dom.attr("lastTop");
				if (dom.attr("soundPlay")) {
					dom.removeAttr("soundPlay");
					player.stopSound("/effort.mp3");
				}
				if (lastTop) {
					dom.removeAttr("lastTop");
					dom.animate({
						top : lastTop
					});
				}
			}
		},
		"rebondi" : { // REBONDIT
			useY : function(player) {
				if (!player.moveEngine.flag.tombe) player.moveEngine.saute(2);
			}
		},
		"bouge-tue" : { // BOUGE ET TUE
			useY : function(player) {
				player.flag.dead = true;
			},
			useX : function(player) {
				this.useY(player);
			},
			reset : function(player) {
			    var dom = this.dom;
			    
			    var speed1 = 2000;
				if (dom.attr("vitesse")) speed1 = dom.attr("vitesse");
				var speed2 = 2000;
				if (dom.attr("descente")) speed2 = dom.attr("descente");
				var distance = 100;
				if (dom.attr("distance")) distance = dom.attr("distance");
				
				var move = -1;
				if (dom.attr("move")) move = dom.attr("move");
				else {
					dom.attr("move", move);
					dom.attr("start", dom.position().top);
				}
				var start = parseFloat(dom.attr("start"));
				
				if (!dom.attr("inMove")) {
                    dom.attr("inMove", true);
                    
                    var speed = speed1;
                    if (move > 0) {
                        speed = speed2;
                        distance = 0;
                    } 
                    
                    dom.animate({
                        top : (start + (distance*move))+"px"
                    }, speed, function() {
                        dom.removeAttr("inMove");
                        dom.attr("move", -1 * move)
                    });
                }
			}
		},
		"bouton" : { // BOUTON
			useY : function(player) {
				var dom = this.dom;
				var cibleId = dom.attr("cible");
				var cible = $(".stage .element[ref="+cibleId+"]");
				if (cible.length > 0) {
					cible.attr("active", true);
				}
			}
		},
		"porte" : {
			useX : function(player) {
				var dom = this.dom;
				if (dom.hasClass("mortel")) {
					player.flag.dead = true;
				}
			},
			useY : function(player) {
				var dom = this.dom;
				if (dom.hasClass("mortel")) {
					player.flag.dead = true;
				}
			},
			reset : function(player) {
				var dom = this.dom;
				if (!dom.attr("active")) return;
				
				if (!dom.attr("soundPlay")) {
					dom.attr("soundPlay", true);
					player.playSound("/tremor.mp3");
				}
				
				var speed1 = 1;
				if (dom.attr("vitesse")) speed1 = dom.attr("vitesse");
				var speed2 = 1;
				if (dom.attr("descente")) speed2 = dom.attr("descente");
				
				var move = -1 * speed1;
				if (dom.attr("move")) move = dom.attr("move");
				else {
					dom.attr("delay", 0);
					dom.addClass("ouverture");
					dom.attr("move", move);
					dom.attr("start", dom.position().top);
				}
				
				var start = parseFloat(dom.attr("start"));
				
				dom.css({
					top : "+="+move+"px"
				});
				if (dom.position().top < start - 100) {
					player.stopSound("/tremor.mp3");
					var delay = 0;
					if (dom.attr("delay")) delay = parseInt(dom.attr("delay"));
					delay++;
					dom.attr("delay", delay);
					if (delay == 1) {
						dom.addClass("shake");
						dom.addClass("mortel");
					}
					if (delay >= 10) {
						dom.removeClass("ouverture");
						dom.attr("move", 1 * speed2);
					}else {
						dom.attr("move", 0);
					}
				}
				else if (dom.position().top >= start) {
					dom.removeAttr("soundPlay");
					player.playSound("/boom.mp3");
					dom.attr("delay", 0);
					dom.css({
						top : "="+start+"px"
					});
					dom.removeClass("shake");
					dom.removeAttr("active");
					dom.removeClass("mortel");
					dom.removeAttr("move");
				}
			}
		},
		"checkpoint" : {
			useY : function(player) {
				var dom = this.dom;
				if (!dom.hasClass("active")) {
					dom.addClass("active");
					player.savePosition();
				}
			}
		}
	};
	
	return {
		/**
		* Permet d'appeler un WS
		**/
		get : function(key) {
			return $.extend(true, {}, data[key]);
		}
	};
});