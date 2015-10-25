var TileView = require( './tile' ),
	$ = require( 'jquery' );

function tileIsEmpty( tileView ) {
	return tileView.tile.type == "empty";
}

function BoardView( board, parent, eventEmitter ) {
	var self = this;
	this.board = board;
	this.eventEmitter = eventEmitter;
	this.tileToBePlaced = null;
	this.$el = $('<table></table>');
	parent.append( this.$el );
	this.render();

	this.$el.on( 'click', '.tile', function () {
		var target, tile, cell;
		if ( !self.tileToBePlaced ) {
			return;
		}
		cell = $(this).parent();
		target = cell.data( 'view' );
		if ( !tileIsEmpty( target ) ) {
			return;
		}
		tile = target.tile;
		self.board.placeTile( tile.row, tile.col, self.tileToBePlaced );
		self._renderTileAt( tile.row, tile.col, cell );
		self.tileToBePlaced = null;
		eventEmitter.trigger( 'textile:tilePlaced', { tile: tile } );
	} );

	eventEmitter.on( 'textile:tileSelected', function ( evt, data ) {
		self.tileToBePlaced = data.tile;
	} );

}

BoardView.prototype.render = function() {
	var row, col, currentRow, currentCol, tileView;
	for ( row = 0; row < this.board.height; row++ ) {
		currentRow = $('<tr></tr>').addClass( 'row-' + row ).addClass( 'row' );
		for ( col = 0; col < this.board.width; col++ ) {
			currentCol = $('<td></td>').addClass( 'col-' + col ).addClass( 'col' );
			this._renderTileAt( row, col, currentCol );
			currentRow.append( currentCol );
		}
		this.$el.append( currentRow );
	}
}

BoardView.prototype._renderTileAt = function ( row, col, parent ) {
	var tileView;
	parent.empty();
	tileView = new TileView( this.board.getTileAt( row, col ), parent, this.eventEmitter );
	parent.data( 'view', tileView );
}

module.exports = BoardView;