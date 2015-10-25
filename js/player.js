function Player( name, eventEmitter ) {
	this.name = name;
	this.score = 0;
	this.eventEmitter = eventEmitter;
}

Player.prototype.addScore = function ( score ) {
	this.score += score;
	this.eventEmitter.trigger( 'textile:playerScoreChanged', { player: this, score: score } );
};

module.exports = Player;