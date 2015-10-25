var Board = require( './board' ),
	TileStack = require( './tile_stack' ),
	ScoreCalculator = require( './score_calculator' ),
	Player = require( './player' ),
	Colors = require( './colors' ),
	Shapes = require( './shapes' );

function Game( eventEmitter ) {
	var self = this;
	this.init();
	this.eventEmitter = eventEmitter;
	this.players = [ 
		new Player( 'Player 1', eventEmitter ), 
		new Player( 'Player 2', eventEmitter ) 
	];
	this.playerIndex = 0;
	eventEmitter.trigger( 'textile:activePlayerChanged', { 
		playerName: self.getActivePlayer(),
		playerIndex: self.playerIndex
	} );

	eventEmitter.on( 'textile:tilePlaced', function ( evt, data ) {
		var score = self.scoreCalculator.scoreFor( data.tile.row, data.tile.col );
		self.players[ self.playerIndex ].addScore( score );
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
	this.scoreCalculator = new ScoreCalculator( this.board );
}

Game.prototype.getActivePlayer = function () {
	return this.players[ this.playerIndex ];
}

Game.prototype.switchActivePlayer = function () {
	this.playerIndex = this.playerIndex ? 0 : 1;
}


module.exports = Game