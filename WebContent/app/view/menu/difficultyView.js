/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils",
        "text!app/template/menu/popup/difficulty.html"], 
function($, _, Utils, page) {
	'use strict';

	return function(menu, Textes) {
		this.init = function(menu, Textes) {
			this.el = "#difficulty-popup";
			this.Textes = Textes;
			this.menu = menu;
			this.render();
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					text : this.Textes
			};
			$(this.el).html(template(templateData));
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
			var that = this;
			$(this.el).find(".close").click(function() {
				$(that.el).hide("slow");
			});
			$("#facile, #moyen, #difficile").click(function() {
				var type = $(this).attr("id");
				that.menu.newGame(type);
			});
		};
		
		this.show = function() {
			$(this.el).show("slow");
		};
		
		this.init(menu, Textes);
	};
});