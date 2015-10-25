var Game = require( './game' ),
    CardSelectionView = require( './views/card_selection' ),
    BoardView = require( './views/board' ),
	$ = require( 'jquery' ),
	eventEmitter = $({}),
	game = new Game( eventEmitter ),
	cardSelection, tileStack, boardView;


cardSelection = new CardSelectionView( game.tileStack, $( '#cardSelectionContainer' ), eventEmitter );
boardView = new BoardView( game.board, $( '#boardContainer' ), eventEmitter );
