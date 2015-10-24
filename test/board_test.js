var expect = require( 'chai' ).expect,
	Board = require( '../js/board' ),
	Tile = require( '../js/tile' );

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

	} );

} );
