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
		return tile == null ? prev + 1 : prev; 
	}, 0 );
	return r;
};

/* return a "NSWEC" object with the adjacent Tiles.
 * "C" conatins the center tile (for which the position is given).
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
}

module.exports = Board;