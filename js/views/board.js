var TileView = require( './tile' ),
	$ = require( 'jquery' );
function BoardView( board, parent, eventEmitter ) {
	this.board = board;
	this.eventEmitter = eventEmitter;
	this.$el = $('<table></table>');
	parent.append( this.$el );
	this.render();
}

BoardView.prototype.render = function() {
	var row, col, currentRow, currentCol;
	for ( row = 0; row < this.board.height; row++ ) {
		currentRow = $('<tr></tr>').addClass( 'row-' + row ).addClass( 'row' );
		for ( col = 0; col < this.board.width; col++ ) {
			currentCol = $('<td></td>').addClass( 'col-' + col ).addClass( 'col' );
			new TileView( this.board.getTileAt( row, col ), currentCol, this.eventEmitter );
			currentRow.append( currentCol );	
		}
		this.$el.append( currentRow );
	}
}

module.exports = BoardView;