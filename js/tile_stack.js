var Tile = require( './tile' );

function shuffle( o ){
    for(var j, x, i = o.length; i; j = Math.floor( Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x );
    return o;
}


function TileStack( colors, shapes, boardSize ) {
	var piecesPerColorAndShape = ( boardSize / Object.keys( colors ).length ) / Object.keys( shapes ).length,
		color, shape, i;

	this.tiles = [];
	for ( color in colors ) {
		for ( shape in shapes ) {
			for ( i =0; i < piecesPerColorAndShape; i++ ) {
				this.tiles.push( new Tile( colors[ color ], shapes[ shape] ) );	
			}
		}
	}
	shuffle( this.tiles );
}

TileStack.prototype.getNext = function () {
	return this.tiles.shift();
}

module.exports = TileStack;