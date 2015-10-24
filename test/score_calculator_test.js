var expect = require( 'chai' ).expect,
	Board = require( '../js/board' ),
	Tile = require( '../js/tile' ),
	Colors = require( '../js/colors' ),
	Shapes = require( '../js/shapes' ),
	ScoreCalculator = require( '../js/score_calculator' );

describe( 'ScoreCalculator', function () {

	describe( '#calcSore', function () {

		var cards = {}, 
			color, colorId, shape, shapeId, i;
		for ( color in Colors ) {
			colorId = color.toLowerCase();
			cards[ colorId ] = {};
			for ( shape in Shapes ) {
				shapeId = shape.toLowerCase();
				cards[ colorId ][ shapeId ] = {};
				for ( i =0; i < 4; i++ ) {
					cards[ colorId ][ shapeId ][ i ] = new Tile( color, shape );
				}
			}
		}

		it( 'counts pieces with no adjacent tiles as 2', function () {
			var b = new Board( 6, 6 ),
				calculator = new ScoreCalculator( b );
			b.placeTile( 1, 1, cards.blue.square[0] );
			expect( calculator.scoreFor( 1, 1 ) ).to.equal( 2 );			
		} );

		it( 'counts two pieces with same shape and different color as 3', function () {
			var b = new Board( 6, 6 ),
				calculator = new ScoreCalculator( b );
			b.placeTile( 1, 1, cards.blue.square[0] );
			b.placeTile( 1, 2, cards.red.square[0] );
			expect( calculator.scoreFor( 1, 2 ) ).to.equal( 3 );			
		} );

		it( 'counts three pieces with same shape and different color as 4', function () {
			var b = new Board( 6, 6 ),
				calculator = new ScoreCalculator( b );
			b.placeTile( 1, 1, cards.blue.square[0] );
			b.placeTile( 1, 2, cards.red.square[0] );
			b.placeTile( 1, 3, cards.green.square[0] );
			b.placeTile( 1, 4, cards.green.circle[0] );
			expect( calculator.scoreFor( 1, 2 ) ).to.equal( 4);			
		} );

		it( 'counts two pieces with different shape and same color as 3', function () {
			var b = new Board( 6, 6 ),
				calculator = new ScoreCalculator( b );
			b.placeTile( 1, 1, cards.blue.square[0] );
			b.placeTile( 1, 2, cards.blue.circle[0] );
			expect( calculator.scoreFor( 1, 2 ) ).to.equal( 3 );			
		} );

		it( 'counts three pieces with different shape and same color as 4', function () {
			var b = new Board( 6, 6 ),
				calculator = new ScoreCalculator( b );
			b.placeTile( 1, 1, cards.blue.square[0] );
			b.placeTile( 1, 2, cards.blue.circle[0] );
			b.placeTile( 1, 3, cards.blue.triangle[0] );
			b.placeTile( 1, 4, cards.red.triangle[0] );
			expect( calculator.scoreFor( 1, 2 ) ).to.equal( 4);			
		} );

		it( 'counts two pieces with same shape and same color as 4', function () {
			var b = new Board( 6, 6 ),
				calculator = new ScoreCalculator( b );
			b.placeTile( 1, 1, cards.blue.square[0] );
			b.placeTile( 1, 2, cards.blue.square[1] );
			expect( calculator.scoreFor( 1, 2 ) ).to.equal( 4 );			
		} );

		it( 'counts four pieces with same shape and same color as 8', function () {
			var b = new Board( 6, 6 ),
				calculator = new ScoreCalculator( b );
			// A "T" shape
			b.placeTile( 1, 1, cards.blue.square[0] );
			b.placeTile( 1, 2, cards.blue.square[1] );
			b.placeTile( 1, 3, cards.blue.square[2] );
			b.placeTile( 2, 2, cards.blue.square[3] );
			expect( calculator.scoreFor( 1, 2 ) ).to.equal( 8 );			
		} );

		it( 'ignores pieces that don\'t continue the shape or color', function () {
			var b = new Board( 6, 6 ),
				calculator = new ScoreCalculator( b );
			// A "T" shape
			b.placeTile( 1, 1, cards.blue.square[0] );
			b.placeTile( 1, 2, cards.blue.square[1] );
			b.placeTile( 1, 3, cards.blue.square[2] );
			b.placeTile( 2, 2, cards.blue.square[3] );
			// Surround the edges with nonmatching pieces
			b.placeTile( 1, 0, cards.red.circle[0] ); // one on the left
			b.placeTile( 1, 4, cards.red.circle[1] ); // one on the right
			b.placeTile( 0, 2, cards.red.circle[2] ); // on on top
			b.placeTile( 3, 2, cards.red.circle[2] ); // on on the bottom
			b.placeTile( 2, 1, cards.green.circle[0] ); // left of stem
			b.placeTile( 2, 3, cards.green.circle[1] ); // right of stem
			expect( calculator.scoreFor( 1, 2 ) ).to.equal( 8 );			
		} );

	} );

} );