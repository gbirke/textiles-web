function Tile( color, shape, row, col ) {
	this.color = color;
	this.shape = shape;
	this.row = row;
	this.col = col;
	this.type = 'default';
}

Tile.prototype.sameColor = function( tile ) {
	return this.color == tile.color;
};

Tile.prototype.sameShape = function( tile ) {
	return this.shape == tile.shape;
};

module.exports = Tile;