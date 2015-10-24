var expect = require( 'chai' ).expect,
	Board = require( '../js/board' ),
	Tile = require( '../js/tile' ),
	Colors = require( '../js/colors' ),
	Shapes = require( '../js/shapes' );

describe( 'Board', function () {

	describe( '#getTurnsRemaining', function () {

		it( 'returns board size for new board', function () {
			var b = new Board( 6, 6 );
			expect( b.getTurnsRemaining() ).to.equal( 36 );
		} );

	} );

	describe( '#placeTile', function () {

		it( 'reduces the number of turns', function () {
			var b = new Board( 6, 6 );
			b.placeTile( 0, 0, new Tile() );
			expect( b.getTurnsRemaining() ).to.equal( 35 );
		} );

		it( 'creates an error when cell is already full', function () {
			var b = new Board( 6, 6 );
			b.placeTile( 0, 0, new Tile() );
			expect( function() {
				b.placeTile( 0, 0, new Tile() );
			} ).to.throw( 'Cell not empty' );
		} );

		it( 'sets the position of the tile', function () {
			var b = new Board( 6, 6 ),
				tile = new Tile( );
			b.placeTile( 1, 2, tile );
			expect( tile.row ).to.equal( 1 );
			expect( tile.col ).to.equal( 2 );
		} );

	} );

	describe( '#getAdjacentTiles', function () {

		var northTile = new Tile( Colors.RED, Shapes.SQUARE ),
			southTile = new Tile( Colors.RED, Shapes.CIRCLE ),
			westTile = new Tile( Colors.RED, Shapes.TRIANGLE ),
			eastTile = new Tile( Colors.BLUE, Shapes.SQUARE),
			centerTile = new Tile( Colors.GREEN, Shapes.CIRCLE );

		it( 'returns null for empty board', function () {
			var b = new Board( 6, 6 );
			expect( b.getAdjacentTiles( 1, 1 ) ).to.deep.equal({
				C: null,
				N: null,
				S: null,
				E: null,
				W: null
			});
		} );

		it( 'returns adjacent elements', function () {
			var b = new Board( 6, 6 );
			b.placeTile( 1, 1, centerTile );
			b.placeTile( 0, 1, northTile );
			b.placeTile( 2, 1, southTile );
			b.placeTile( 1, 0, westTile );
			b.placeTile( 1, 2, eastTile );
			expect( b.getAdjacentTiles( 1, 1 ) ).to.deep.equal({
				C: centerTile,
				N: northTile,
				S: southTile,
				W: westTile,
				E: eastTile
			});
		} );

		it( 'returns null on board corners', function () {
			var b = new Board( 6, 6 );
			// bottom right corner
			b.placeTile( 5, 5, centerTile );
			b.placeTile( 4, 5, northTile );
			b.placeTile( 5, 4, westTile );
			// top left corner
			b.placeTile( 1, 0, southTile );
			b.placeTile( 0, 1, eastTile );
			expect( b.getAdjacentTiles( 0, 0 ) ).to.deep.equal({
				C: null,
				N: null,
				S: southTile,
				W: null,
				E: eastTile
			});
			expect( b.getAdjacentTiles( 5, 5 ) ).to.deep.equal({
				C: centerTile,
				N: northTile,
				S: null,
				W: westTile,
				E: null
			});
		} );

	} );

} );
