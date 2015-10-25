var TileStack = require( './tile_stack' ),
	CardSelectionView = require( './views/card_selection' ),
	Colors = require( './colors' ),
    Shapes = require( './shapes' ),
	$ = require( 'jquery'),
	eventEmitter = $({}),
	parent = $('#displayContainer'),
	cardSelection, tileStack;


tileStack = new TileStack( Colors, Shapes, 36);
cardSelection = new CardSelectionView( tileStack, parent, eventEmitter );
