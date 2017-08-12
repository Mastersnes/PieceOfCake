/*global define */
define(["jquery",
        'underscore',
        "text!app/template/game/end.html"],
function($, _, page) {
	'use strict';

	return function(Textes) {
		this.init = function(Textes) {
			this.el = "#end";
			this.Textes = Textes;
		};

		this.render = function() {
			_.templateSettings.variable = "data";
			var template = _.template(page);
			var templateData = {
					text : this.Textes
			};
			$(this.el).html(template(templateData));
			$(this.el).show();
			
			this.makeEvents();
		};
		
		this.makeEvents = function() {
		};
		
		this.init(Textes);
	};
});