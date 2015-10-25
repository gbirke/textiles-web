var Game = require( './game' ),
    CardSelectionView = require( './views/card_selection' ),
    BoardView = require( './views/board' ),
    ScoreView = require( './views/score' ),
	$ = require( 'jquery' ),
	eventEmitter = $({}),
	game = new Game( eventEmitter ),
	cardSelection, tileStack, boardView, scoreCalculator;


cardSelection = new CardSelectionView( game.tileStack, $( '#cardSelectionContainer' ), eventEmitter );
boardView = new BoardView( game.board, $( '#boardContainer' ), eventEmitter );
new ScoreView( game, $( '#scoreContainer' ), eventEmitter );