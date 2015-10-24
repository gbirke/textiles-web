function Tile( color, shape ) {
	this.color = color;
	this.shape = shape;
}

Tile.prototype.sameColor = function( tile ) {
	return this.color == tile.color;
};

Tile.prototype.sameShape = function( tile ) {
	return this.shape == tile.shape;
};

module.exports = Tile;