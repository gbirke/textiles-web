var Board = require( './board' ),
	TileStack = require( './tile_stack' ),
	Colors = require( './colors' ),
	Shapes = require( './shapes' );

function Game( eventEmitter ) {
	var self = this;
	this.init();
	this.eventEmitter = eventEmitter;
	this.players = [ 'Player 1', 'Player 2' ];
	this.playerIndex = 0;
	eventEmitter.trigger( 'textile:activePlayerChanged', { 
		playerName: self.getActivePlayer(),
		playerIndex: self.playerIndex
	} );

	eventEmitter.on( 'textile:playerScored', function () {
		self.switchActivePlayer();
		eventEmitter.trigger( 'textile:activePlayerChanged', { 
			playerName: self.getActivePlayer(),
			playerIndex: self.playerIndex
		} );
	} );
}

Game.prototype.init = function() {
	this.board = new Board( 6, 6 );
	this.tileStack = new TileStack( Colors, Shapes, this.board.getSize() );
}

Game.prototype.getActivePlayer = function () {
	return this.players[ this.playerIndex ];
}

Game.prototype.switchActivePlayer = function () {
	this.playerIndex = this.playerIndex ? 0 : 1;
}


module.exports = Game