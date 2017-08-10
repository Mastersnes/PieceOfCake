/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "text!app/template/game/game.html",
        "app/view/game/stageView"],
function($, _, Utils, page, StageView) {
	'use strict';

	return function() {
		this.init = function() {
			this.el = $("#app");
			Utils.load("track", {"where" : "Lancement du jeu"}, function(data) {}, "POST");
			
			this.stageView = new StageView();
			this.render();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {};
			this.el.html(template(templateData));
			
			this.stageView.load("cuisine", 1);
		};
		
		this.init();
	};
});