var SpecialTiles = require( './special_tiles' );

function Board( width, height ) {
	var i;
	this.width = width;
	this.height = height;
	this.tiles = Array( width * height );
	for ( i = 0; i < this.tiles.length; i++ ) {
		this.tiles[ i ] = null;
	}
}

Board.prototype.placeTile = function( row, col, tile ) {
	var pos = row * this.height + col;
	if ( this.tiles[ pos ] !== null ) {
		throw Error( 'Cell not empty' );
	}
	tile.row = row;
	tile.col = col;
	this.tiles[ pos ] = tile;
};

Board.prototype.getTurnsRemaining = function() {
	return this.tiles.reduce( function (prev, tile) { 
		return tile === null ? prev + 1 : prev; 
	}, 0 );
};

Board.prototype.getSize = function () {
	return this.width * this.height;
};

Board.prototype.getTileAt = function ( row, col ) {
	var pos = row * this.height + col;
	if ( this.tiles[ pos ] === null ) {
		return new SpecialTiles.EmptyTile( row, col );
	}
	return this.tiles[ pos ];
};

Board.prototype.distributeBlackholes = function ( numBlackHoles ) {
	var i, row, col;
	for ( i = 0; i < numBlackHoles; i++ ) {
		// do not place at the edges, leftmost col=height-1, 
		row = Math.floor( Math.random() * ( this.height - 2) + 1 ) ; 
		col = Math.floor( Math.random() * ( this.width - 2 ) + 1 ) ;
		
		// Don't use tiles that are already occupied
		if ( this.getTileAt( row, col ).type != 'empty' ) {
			i--;
			continue;
		}
		this.placeTile( row, col, new SpecialTiles.BlackHole( row, col ) );
	}
};

/* return a "NSWEC" object with the adjacent Tiles.
 * "C" contains the center tile (for which the position is given).
 *  Board edges are represented as null.
 */
Board.prototype.getAdjacentTiles = function( row, col ) {
	var adjacent = {
		C: null,
		N: null,
		S: null,
		W: null,
		E: null
	},
	pos = row * this.height + col;
	adjacent.C = this.tiles[ pos ];
	if ( row > 0 ) {
		adjacent.N = this.tiles[ pos - this.width ];
	}
	if ( row < this.height - 1 ) {
		adjacent.S = this.tiles[ pos + this.width ];
	}
	if ( col > 0 ) {
		adjacent.W = this.tiles[ pos - 1 ];	
	}
	if ( col < this.width - 1 ) {
		adjacent.E = this.tiles[ pos + 1 ];	
	}
	return adjacent;
};

module.exports = Board;