'use strict';
define(["jquery", "app/data/actions"], function($, Actions){
	var data = {
		/**
		 * Plateformes
		 */
		"newGame" : {
			fr : "Nouvelle partie",
			en : "New Game"
		},
		"loadGame" : {
			fr : "Charger une partie",
			en : "Load a game"
		},
		"fromCode" : {
			fr : "Veuillez entrer votre code de sauvegarde :",
			en : "Please enter your save code :"
		},
		"codeHolder" : {
			fr : "Code de sauvegarde",
			en : "Save code"
		},
		"codeError" : {
			fr : "Code de sauvegarde invalide",
			en : "Invalide save code"
		},
		"load" : {
			fr : "Charger",
			en : "Load"
		},
		"or" : {
			fr : "...Ou...",
			en : "...Or..."
		},
		"fromNavigateur" : {
			fr : "Charger depuis la sauvegarde navigateur",
			en : "Load from browser save"
		},
		"options" : {
			fr : "Options",
			en : "Options"
		},
		"langage" : {
			fr : "Langage :",
			en : "Language :"
		},
		"credits" : {
			fr : "Credits",
			en : "Credits"
		},
		"illustration" : {
			fr : "Illustrations",
			en : "Illustrations"
		},
		"developpement" : {
			fr : "D&eacuteveloppement",
			en : "Development"
		},
		"partenaires" : {
			fr : "Partenaires",
			en : "Partners"
		},
		"copyright-licence" : {
			fr : "Cette oeuvre est sous license ",
			en : "This work is licensed by "
		},
		"copyright-donot" : {
			fr : "Merci de ne pas la modifier ou la partager de fa&ccedil;on commerciale sans notre accord.",
			en : "Please don't modify and share it commercially without our consent."
		},
		"end0" : {
			fr : "F&eacute;licitation, vous avez termin&eacute; le jeu !",
			en : "Congratulations, you won !"
		},
		"end1" : {
			fr : "N&apos;h&eacute;sitez pas &agrave; donner votre avis sur notre page <a target='_blank' alt='Les jeux de Bebel' href='https://www.facebook.com/lesjeuxdebebel/'>Les jeux de Bebel</a>.",
			en : "Give us your opinion about the game on our page : <a target='_blank' alt='Les jeux de Bebel' href='https://www.facebook.com/lesjeuxdebebel/'>Les jeux de Bebel</a>."
		},
		"end2" : {
			fr : "Ou bien sur <a target='_blank' alt='Diaspora' href='https://framasphere.org/tags/bebel'>Diaspora</a>.",
			en : "Or on <a target='_blank' alt='Diaspora' href='https://framasphere.org/tags/bebel'>Diaspora</a>."
		},
		"end3" : {
			fr : "Vous pouvez aussi retenter votre chance en lancant une nouvelle partie.",
			en : "You can also retry by launching a new game."
		},
		"end4" : {
			fr : "D&eacute;couvrez nos autres jeux sur notre <a target='_blank' alt='Site internet' href='http://lesjeuxdebebel.fr.nf/Bebel'>Site internet</a>.",
			en : "Discover our other games on our <a target='_blank' alt='Website' href='http://lesjeuxdebebel.fr.nf/Bebel'>Website</a>."
		}
	};
	
	return {
		local : null,
		
		/**
		* Permet d'appeler un WS
		**/
		get : function(key) {
			if (!this.local) {
				this.local = navigator.language || navigator.userLanguage;
			}
			var text = $.extend(true, {}, data[key]);
			if (!text[this.local]) return text.en;
			return text[this.local];
		}
	};
});