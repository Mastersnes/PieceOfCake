/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "text!app/template/menu/menu.html",
        "app/view/game/gameView",
        "app/view/menu/loadView",
        "app/view/menu/optionView",
        "app/view/menu/creditView",
        "app/view/menu/partenaireView"], 
function($, _, Utils, page, GameView, LoadView, OptionView, CreditView, PartenaireView) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $("#app");
			Utils.load("track", {"where" : "Menu"}, function(data) {}, "POST");
			this.render();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$("#new").click(function() {
				new GameView(this);
			});
			$("#load").click(function() {
				if (!that.loadView) that.loadView = new LoadView();
				that.loadView.show();
			});
			$("#option").click(function() {
				if (!that.optionView) that.optionView = new OptionView();
				that.optionView.show();
			});
			$("#credit").click(function() {
				if (!that.creditView) that.creditView = new CreditView();
				that.creditView.show();
			});
			$("#partenaire").click(function() {
				if (!that.partenaireView) that.partenaireView = new PartenaireView();
				that.partenaireView.show();
			});
		};
		
		this.init();
	};
});