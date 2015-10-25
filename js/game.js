var Board = require( './board' ),
	TileStack = require( './tile_stack' ),
	Colors = require( './colors' ),
	Shapes = require( './shapes' );

function Game( eventEmitter ) {
	var self = this;
	this.init();
	this.eventEmitter = eventEmitter;
	this.players = [ 'Player 1', 'Player 2' ];
	eventEmitter.trigger( 'textile:activePlayerChanged', { playerName: self.getActivePlayer() } );

	eventEmitter.on( 'textile:tileWasPlaced', function () {
		this.switchActivePlayer();
		eventEmitter.trigger( 'textile:activePlayerChanged', { playerName: self.getActivePlayer() } );
	} );
}

Game.prototype.init = function() {
	this.board = new Board( 6, 6 );
	this.tileStack = new TileStack( Colors, Shapes, this.board.getSize() );
}

Game.prototype.getActivePlayer = function () {
	return this.players[ 0 ];
}

Game.prototype.switchActivePlayer = function () {
	var firstPlayer = this.players.shift();
	this.players.push( firstPlayer );
	return this;
}


module.exports = Game