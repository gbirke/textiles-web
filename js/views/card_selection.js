var $ = require('jquery'),
	TileView = require( './tile' );

function CardSelectionView( tileStack, parent, eventEmitter ) {
	var self = this;
	this.tileStack = tileStack;
	this.tiles = [ tileStack.getNext(), tileStack.getNext(), tileStack.getNext() ];
	this.tileViews = [];
	this.selectedTileIndex = -1;
	this.$el = $( '<div id="card-selection"></div>' );
	$( parent ).append( this.$el );
	this.$el.on( 'click', '.tile', function ( evt ) {
		if ( self.selectedTileIndex > -1 ) {
			evt.preventDefault();
			return;
		}
		self.selectedTileIndex = $(this).find( '.shape' ).data( 'row' );
		self.tileViews[ self.selectedTileIndex ].select();
		eventEmitter.trigger( 'textile:tileSelected', { tile: self.tiles[ self.selectedTileIndex ] } );
	} );
	eventEmitter.on( 'textile:tilePlaced', function () {
		var newTile = self.tileStack.getNext(),
			newTileView = new TileView( newTile, self.$el, eventEmitter );
		self.tiles.splice( self.selectedTileIndex, 1, newTile );
		self.tileViews.splice( self.selectedTileIndex, 1, newTileView );
		self.selectedTileIndex = -1;
	} );
	this.render();
}

CardSelectionView.prototype.render = function () {
	this._renderTileViews();	
};

CardSelectionView.prototype._renderTileViews = function () {
	var self = this;
	$.each( this.tiles, function( i ) {
		this.row = i;
		this.col = 0;
		self.tileViews[i] = new TileView( this, self.$el );
	} );
}

module.exports = CardSelectionView;
