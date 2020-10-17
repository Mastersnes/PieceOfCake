/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "app/utils/kongregateUtils",
        "app/data/textes",
        "app/utils/mediatheque",
        "text!app/template/menu/menu.html",
        "app/view/game/gameView",
        "app/view/menu/loadView",
        "app/view/menu/optionView",
        "app/view/menu/creditView",
        "app/view/menu/partenaireView",
        "app/view/menu/difficultyView"], 
function($, _, Utils, Kongregate, Textes, Mediatheque, page, GameView, LoadView, OptionView, CreditView, PartenaireView, DifficultyView) {
	'use strict';

	return function() {
		this.init = function() {
		    this.el = $("#app");
            this.mediatheque = new Mediatheque();
            this.mediatheque.play("/music/menu.mp3");
			this.kongregateUtils = new Kongregate(Textes);
			
			var that = this;
			if (window.location.href.indexOf("kongregate") > -1) {
	            console.log("kongregate Load");
				this.kongregateUtils.load(function() {
	            	that.render();
	            });
			}else {
				console.log("Pas sur kongregate !");
				this.render();
			}
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					text : Textes
			};
			this.el.html(template(templateData));
			
			this.kongregateUtils.render();
			this.makeEvents();
			
			setTimeout(function() {
				$(".bebel").fadeOut("slow");
			}, 2000);
		};
		
		this.makeEvents = function() {
			var that = this;
			$("#new").click(function() {
			    new DifficultyView(that, Textes).show();
			});
			$("#load").click(function() {
				new LoadView(that, Textes).show();
			});
			$("#option").click(function() {
				new OptionView(that, Textes).show();
			});
			$("#credit").click(function() {
				new CreditView(Textes).show();
			});
			$("#partenaire").click(function() {
				new PartenaireView(Textes).show();
			});
			$("#login").click(function() {
				that.kongregateUtils.login();
			});
		};
		
		this.newGame = function(difficulty) {
			new GameView(this, false, null, Textes, this.mediatheque, difficulty);
		};
		this.loadGame = function(code) {
			new GameView(this, true, code, Textes, this.mediatheque, null);
		};
		
		this.init();
	};
});