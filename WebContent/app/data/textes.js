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
        "facile" : {
			fr : "Facile",
			en : "Easy"
		},
		"moyen" : {
			fr : "Normal",
			en : "Normal"
		},
		"difficile" : {
			fr : "Difficile",
			en : "Hard"
		},
		"hardcore" : {
			fr : "Suicidaire",
			en : "HardCore"
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
        "fullscreen" : {
            fr : "Plein &eacutecran (appuyez sur echap pour revenir)",
            en : "Fullscreen (press escape for return)"
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
        "musique" : {
            fr : "Musiques",
            en : "Musics"
        },
        "textes" : {
            fr : "Textes",
            en : "Texts"
        },
        "followUs" : {
            fr : "Suivez-nous sur <a target='_blank' alt='Facebook' href='https://www.facebook.com/lesjeuxdebebel/'>Facebook</a> ou <a target='_blank' alt='Twitter' href='http://twitter.com/lesjeuxdebebel'>Twitter</a>.",
            en : "Follow us on <a target='_blank' alt='Facebook' href='https://www.facebook.com/lesjeuxdebebel/'>Facebook</a> or <a target='_blank' alt='Twitter' href='http://twitter.com/lesjeuxdebebel'>Twitter</a>."
        },
        "followUs2" : {
            fr : "Soutenez-nous sur <a target='_blank' alt='Tipeee' href='https://www.tipeee.com/les-jeux-de-bebel/'>Tipeee</a>.",
            en : "Support us on <a target='_blank' alt='Tipeee' href='https://www.tipeee.com/les-jeux-de-bebel/'>Tipeee</a>."
        },
        "followUs3" : {
            fr : "Nos autres jeux sur <a target='_blank' alt='Kongregate' href='http://www.kongregate.com/games/JeuxBebel'>Kongregate</a>.",
            en : "Our other games on <a target='_blank' alt='Kongregate' href='http://www.kongregate.com/games/JeuxBebel'>Kongregate</a>."
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
        "point" : {
            fr : "Point",
            en : "Point"
        },
        "deathNb" : {
            fr : "Compteur de mort",
            en : "Death counter"
        },
        "end0" : {
            fr : "F&eacute;licitation, vous avez termin&eacute; le jeu avec : <span id='point'></span> Points",
            en : "Congratulations, you won with : <span id='point'></span> Points"
        },
        "end1" : {
            fr : "Venez tester nos autres jeux sur <a target='_blank' alt='Kongregate' href='http://www.kongregate.com/games/JeuxBebel'>Kongregate</a> !",
            en : "Let's try our others games on <a target='_blank' alt='Kongregate' href='http://www.kongregate.com/games/JeuxBebel'>Kongregate</a> !"
        },
        "end2" : {
            fr : "Vous pouvez également nous soutenir sur <a target='_blank' alt='Tipeee' href='https://www.tipeee.com/les-jeux-de-bebel/'>Tipeee</a>.",
            en : "You can also support us on <a target='_blank' alt='Tipeee' href='https://www.tipeee.com/les-jeux-de-bebel/'>Tipeee</a>."
        },
        "end3" : {
            fr : "Vous pouvez aussi retenter votre chance en lancant une nouvelle partie.",
            en : "You can also retry by launching a new game."
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