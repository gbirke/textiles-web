var	$ = require( 'jquery');

function ScoreView( game, parent, eventEmitter ) {
	var self = this;

	function createPlayerScore( playerIndex, player ) {
		var score = $( '<div id="player-score-' + playerIndex + '" class="player col-md-4"><span class="name"></span>: <span class="score"></span></div>' );
		score.find( '.name' ).text( player.name );
		score.find( '.score' ).text( player.score );
		return score;
	}

	this.$el = $('<div class="scoreboard"></div>');
	$.each( game.players, function ( idx, player )  {
		self.$el.append( createPlayerScore( idx, player ) );
	} );
	
	this.activePlayerIndex = 0;
	self._getActivePlayerScore().addClass( 'active' );
	parent.append( this.$el );

	eventEmitter.on( 'textile:playerScoreChanged', function ( evt, data ) {
		self._getActivePlayerScore().find( '.score' ).text( data.player.score );
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