"use strict";
const { Jeu } = require('./jeu');


// garder ce code dans main et importer Jeu
const game = new Jeu({ max: 10 });
game.jouer();
