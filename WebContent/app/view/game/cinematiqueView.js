/*global define */
define(["jquery",
        'underscore',
        "app/utils/utils"],
function($, _, Utils) {
	'use strict';

	return function(Textes) {
		this.init = function(Textes) {
			this.el = "#cinematique";
			this.screens = [];
			this.Textes = Textes;
			this.makeEvents();
		};

		this.load = function(screens) {
			$(this.el).fadeIn();
			this.screens = screens;
			this.current = 0;
			this.show();
		};
		
		this.next = function() {
			this.current++;
			if (this.current >= this.screens.length) {
				this.screens = [];
				$(this.el).fadeOut("slow");
			}else {
				this.show();
			}
		};
		
		this.show = function() {
			var local = this.Textes.local;
			if (local != "fr" && local != "en") local = "en";
			
			
			var screen = this.screens[this.current];
			screen = screen + "-" + local;
			$(this.el).find("#current").attr("class", "page " + screen);
			if (this.current+1 < this.screens.length) {
				var nextScreen = this.screens[this.current+1];
				nextScreen = nextScreen + "-" + local;
				$(this.el).find("#next").attr("class", "page " + nextScreen);
			}
		};
		
		this.makeEvents = function() {
			var that = this;
			$(this.el).click(function() {
				console.log("next");
				that.next();
			});
		};
		
		this.empty = function() {
			return this.screens.length == 0;
		};
		
		this.init(Textes);
	};
});