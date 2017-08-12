/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "app/data/textes",
        "text!app/template/menu/menu.html",
        "app/view/game/gameView",
        "app/view/menu/loadView",
        "app/view/menu/optionView",
        "app/view/menu/creditView",
        "app/view/menu/partenaireView"], 
function($, _, Utils, Textes, page, GameView, LoadView, OptionView, CreditView, PartenaireView) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $("#app");
			this.render();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					text : Textes
			};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$("#new").click(function() {
				that.newGame();
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
		};
		
		this.newGame = function() {
			new GameView(this, false, null, Textes);
		};
		this.loadGame = function(code) {
			new GameView(this, true, code, Textes);
		};
		
		this.init();
	};
});