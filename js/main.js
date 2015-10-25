var TileStack = require( './tile_stack' ),
	Board = require( './board' ),
	Colors = require( './colors' ),
    Shapes = require( './shapes' ),
    CardSelectionView = require( './views/card_selection' ),
    BoardView = require( './views/board' ),
	$ = require( 'jquery' ),
	eventEmitter = $({}),
	board = new Board( 6, 6 ),
	cardSelection, tileStack, boardView;


tileStack = new TileStack( Colors, Shapes, board.getSize() );
cardSelection = new CardSelectionView( tileStack, $( '#cardSelectionContainer' ), eventEmitter );
boardView = new BoardView( board, $( '#boardContainer' ), eventEmitter );
