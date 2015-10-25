var directions = [ 'N', 'S', 'E', 'W' ];

function ScoreCalculator( board ) {
	this.board = board;
	this.boardSize = board.getSize();
}

/*
 * Calculate the socre for a position on the board 
 */
ScoreCalculator.prototype.scoreFor = function( row, col ) {
	var adjacentTilesToCheck = this.board.getAdjacentTiles( row, col ),
		centerTile = adjacentTilesToCheck.C,
		shapeScore, colorScore;
	this.tilesCounted = 0;
	if ( !centerTile ) {
		throw Error( 'You can\' get the score for empty board cells!' );
	}
	shapeScore = this._countScore( centerTile, adjacentTilesToCheck, [ centerTile ], 1, "sameShape" );
	this.tilesCounted = 0;
	colorScore = this._countScore( centerTile, adjacentTilesToCheck, [ centerTile ], 1, "sameColor" );
	return shapeScore + colorScore;
};

/**
 * Recursively calculate the score for the nort, south, west and east tiles
 */
ScoreCalculator.prototype._countScore = function ( comparisonTile, adjacentTiles, countedTiles, score, comparisonMethod ) {
	var direction, currentTile, adjacentTilesToCheck;

	// should never happen
	if( this.tilesCounted > this.boardSize ) { 
		throw Error( 'Recursion error, now you\'re in trouble' );
	}

	for ( direction in directions ) {
		currentTile = adjacentTiles[ directions[ direction ] ];
		if ( currentTile === null || countedTiles.indexOf( currentTile ) > -1 ) {
			continue;
		}
		this.tilesCounted += 1;
		if ( comparisonTile[ comparisonMethod ]( currentTile ) ) {
			score += 1;
			countedTiles.push( currentTile );
			adjacentTilesToCheck = this.board.getAdjacentTiles( currentTile.row, currentTile.col );
			score = this._countScore( comparisonTile, adjacentTilesToCheck, countedTiles, score, comparisonMethod );
		}
	}
	return score;
};

module.exports = ScoreCalculator;