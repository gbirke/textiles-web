var expect = require( 'chai' ).expect,
	Tile = require( '../js/tile' ),
	Colors = require( '../js/colors' ),
	Shapes = require( '../js/shapes' );

describe( 'Tile', function () {

	describe( '#sameColor', function () {

		it( 'compares Tiles with the same color', function () {
			var t1 = new Tile( Colors.RED, Shapes.SQUARE ),
				t2 = new Tile( Colors.RED, Shapes.SQUARE );
			expect( t1.sameColor( t2 ) ).to.be.true;
		} );

		it( 'compares Tiles with different colors', function () {
			var t1 = new Tile( Colors.RED, Shapes.SQUARE ),
				t2 = new Tile( Colors.BLUE, Shapes.SQUARE );
			expect( t1.sameColor( t2 ) ).to.be.false;
		} );

	} );

	describe( '#sameShape', function () {

		it( 'compares Tiles with the same shape', function () {
			var t1 = new Tile( Colors.RED, Shapes.SQUARE ),
				t2 = new Tile( Colors.RED, Shapes.SQUARE );
			expect( t1.sameShape( t2 ) ).to.be.true;
		} );

		it( 'compares Tiles with different shapes', function () {
			var t1 = new Tile( Colors.RED, Shapes.CIRCLE ),
				t2 = new Tile( Colors.RED, Shapes.SQUARE );
			expect( t1.sameShape( t2 ) ).to.be.false;
		} );
	} );

} );
