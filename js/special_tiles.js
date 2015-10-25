var Tile = require( './tile' );

function EmptyTile( row, col ) {
	Tile.call( this, null, null, row, col );
	this.type = 'empty';
}

EmptyTile.prototype = Object.create( Tile );
EmptyTile.prototype.constructor = EmptyTile;


function BlackHole( row, col ) {
	Tile.call( this, 0, 0, row, col );
	this.type = 'blackhole';
}
BlackHole.prototype = Object.create( Tile );
BlackHole.prototype.constructor = BlackHole;

module.exports = {
	EmptyTile: EmptyTile,
	BlackHole: BlackHole
}