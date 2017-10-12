'use strict';
define(["jquery",
        "app/data/stages/boulangerie",
        "app/data/stages/cuisine"], function($, Boulangerie, Cuisine){
	
	var data = {
			"fin" : {
				"end" : true,
				"cinematique" : ["end1", "end2", "end3", "end4", "end5"],
				"start" : {},
				"back" : [],
				"elements" : []
			}
		};
	
	return {
		/**
		* Permet d'appeler un WS
		**/
		get : function(lieu, stage) {
			var stage;
			switch(lieu) {
				case "boulangerie":
					return Boulangerie.get(stage);
				case "cuisine":
					return Cuisine.get(stage);
				case "fin":
				default:
					return $.extend(true, {}, data[lieu]);
			}
		}
	};
});