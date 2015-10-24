function Board( width, height ) {
	var i;
	this.width = width;
	this.height = height;
	this.tiles = Array( width * height );
	for ( i=0; i < this.tiles.length; i++ ) {
		this.tiles[ i ] = null;
	}
}


Board.prototype.placeTile = function( row, col, tile ) {
	var pos = row * this.height + col;
	this.tiles[ pos ] = tile;
}

Board.prototype.getTurnsRemaining = function() {
	return this.tiles.reduce( function (prev, tile) { 
		return tile == null ? prev + 1 : prev; 
	}, 0 );
	return r;
} 

module.exports = Board;