var expect = require( 'chai' ).expect,
	TileStack = require( '../js/tile_stack' ),
	Colors = require( '../js/colors' ),
	Shapes = require( '../js/shapes' );

describe( 'TileStack', function () {

	describe( '#getNext', function () {

		it( 'returns different tiles', function () {
			var boardSize = 36,
				s = new TileStack( Colors, Shapes, boardSize ),
				tileTypes = {},
				i, currentTile, tileType;
			for ( i = 0; i < boardSize; i++ ) {
				currentTile = s.getNext();
				tileType =[ currentTile.color, currentTile.shape ].join( ' ' );
				if ( !( tileType in tileTypes ) ) {
					tileTypes[ tileType ] = 1;
				}
				else {
					tileTypes[ tileType ]++;
				}
			}
			expect( Object.keys( tileTypes ).length ).to.equal( 9 );
			
		} );

	} );

} );