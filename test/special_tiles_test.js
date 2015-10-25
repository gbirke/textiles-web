var expect = require( 'chai' ).expect,
	SpecialTiles = require( '../js/special_tiles' ),
	Colors = require( '../js/colors' ),
	Shapes = require( '../js/shapes' );

describe( 'EmptyTile', function () {

	it( 'has no color or shape', function () {
		var t = new SpecialTiles.EmptyTile();
		expect( t.color ).to.be.null;
		expect( t.color ).to.be.null;
	} );

	it( 'has empty type', function () {
		var t = new SpecialTiles.EmptyTile();
		expect( t.type ).to.equal( 'empty' );
	} );

} );


describe( 'BlackHole', function () {

		it( 'has zero as color and shape', function () {
			var t = new SpecialTiles.BlackHole();
			expect( t.color ).to.equal( 0 );
			expect( t.color ).to.equal( 0 );
		} );

		it( 'has blackhole type', function () {
			var t = new SpecialTiles.BlackHole();
			expect( t.type ).to.equal( 'blackhole' );
		} );

} );
