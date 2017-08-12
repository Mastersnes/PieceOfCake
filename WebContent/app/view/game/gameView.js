/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "app/utils/mediatheque",
        "text!app/template/game/game.html",
        "app/view/game/stageView",
        "app/view/game/endView"],
function($, _, Utils, Mediatheque, page, StageView, EndView) {
	'use strict';

	return function(parent, load, code, Textes) {
		this.init = function(parent, load, code, Textes) {
			this.el = $("#app");
			this.Textes = Textes;
			this.mediatheque = new Mediatheque();
			this.stageView = new StageView(this, Textes);
			this.render(load, code);
			this.endView = new EndView(Textes);
		};

		this.render = function(load, code) {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					text : this.Textes
			};
			this.el.html(template(templateData));
			
			var save;
			if (code) {
				save = JSON.parse(Utils.decode(code));
			}else if (load) {
				var saveSession = window.localStorage.getItem(Utils.name);
				if (saveSession) save = JSON.parse(Utils.decode(saveSession));
			}
			
			if (save) this.stageView.load(save);
			else this.stageView.go("boulangerie", 1);
		};
		
		this.gameOver = function() {
			this.pause = true;
			
			this.endView.render();
			
			$(".game").fadeOut();
		};
		
		this.init(parent, load, code, Textes);
	};
});