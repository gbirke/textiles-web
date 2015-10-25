var	$ = require( 'jquery');

function ScoreView( scoreCalculator, parent, eventEmitter ) {
	var self = this;

	function createPlayerScore( playerNumber ) {
		var score = $( '<div id="player-score-' + playerNumber + '" class="player col-md-4"><span class="name"></span>: <span class="score">0</span></div>' );
		score.find( '.name' ).text( "Player " + ( playerNumber + 1 ) ); // TODO bind this to Game or Player model instead
		return score;
	}

	this.scoreCalculator = scoreCalculator;
	this.$el = $('<div class="scoreboard"></div>');
	this.$el.append( createPlayerScore( 0 ) );
	this.$el.append( createPlayerScore( 1 ) );
	this.playerScores = { 0: 0, 1: 0 }; // TODO track in some content model
	this.activePlayerIndex = 0;
	self._getActivePlayerScore().addClass( 'active' );
	parent.append( this.$el );

	eventEmitter.on( 'textile:tilePlaced', function ( evt, data ) {
		var score = self.scoreCalculator.scoreFor( data.tile.row, data.tile.col );
		self.playerScores[ self.activePlayerIndex ] += score;
		self._getActivePlayerScore().find( '.score' ).text( self.playerScores[ self.activePlayerIndex ] );
		eventEmitter.trigger( 'textile:playerScored', {
			playerIndex: self.activePlayerIndex,
			tile: data.tile,
			score: score
		} );
	} );

	eventEmitter.on( 'textile:activePlayerChanged', function ( evt, data ) {
		self.activePlayerIndex = data.playerIndex;
		self.$el.find( '.player' ).removeClass( 'active' );
		self._getActivePlayerScore().addClass( 'active' );
	} );

}

ScoreView.prototype._getActivePlayerScore = function () {
	return this.$el.find( '#player-score-' + this.activePlayerIndex );
};

module.exports = ScoreView;