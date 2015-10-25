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
		if ( self.board.getTurnsRemaining() === 0 ) {
			self.eventEmitter.trigger( 'textile:gameOver', self._getResult() );
			return;
		}
		self.switchActivePlayer();
		eventEmitter.trigger( 'textile:activePlayerChanged', { 
			playerName: self.getActivePlayer(),
			playerIndex: self.playerIndex
		} );
	} );
}

/*+
 * Set up the game with standard parameters:
 * 6 x 6 game board, 4 black holes, shuffled tile stack
 */
Game.prototype.init = function() {
	this.board = new Board( 6, 6 );
	this.board.distributeBlackholes( 4 );
	this.tileStack = new TileStack( Colors, Shapes, this.board.getSize() );
	this.scoreCalculator = new ScoreCalculator( this.board );
};

Game.prototype.getActivePlayer = function () {
	return this.players[ this.playerIndex ];
};

Game.prototype.switchActivePlayer = function () {
	this.playerIndex = this.playerIndex ? 0 : 1;
};

Game.prototype._getResult = function () {
	var winner, loser;
	if ( this.players[ 0 ].score == this.players[ 1 ].score ) {
		return {
			tie: true,
			text: "It was a tie, everbody wins!",
			winner: null,
			loser: null
		};
	}
	else if ( this.players[ 0 ].score > this.players[ 1 ].score ) {
		winner = this.players[ 0 ];
		loser = this.players[ 1 ];
	}
	else {
		winner = this.players[ 1 ];
		loser = this.players[ 0 ];
	}
	return {
		tie: false,
		text: winner.name + " wins with " + winner.score + " to " + loser.score + " points.",
		winner: winner,
		loser: loser
	};
};


module.exports = Game;
