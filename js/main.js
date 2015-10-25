var Tile = require( './tile' ),
	TileView = require( './views/tile' ),
	Colors = require( './colors' ),
	Shapes = require( './shapes' ),
	$ = require( 'jquery'),
	eventEmitter = $({}),
	dummyTile, parent = $('#displayContainer');



dummyTile = new Tile( Colors.RED, Shapes.TRIANGLE );
new TileView( dummyTile, parent, eventEmitter );


dummyTile = new Tile( Colors.GREEN, Shapes.CIRCLE );
new TileView( dummyTile, parent, eventEmitter );

dummyTile = new Tile( Colors.BLUE, Shapes.SQUARE );
new TileView( dummyTile, parent, eventEmitter );
