var	$ = require( 'jquery'),
	Colors = require( '../colors' ),
	Shapes = require( '../shapes' ),
	ColorStyles = {}, 
	ShapeStyles = {};

ColorStyles[ Colors.RED ] = 'red';
ColorStyles[ Colors.GREEN ] = 'green';
ColorStyles[ Colors.BLUE ] = 'blue';

ShapeStyles[ Shapes.SQUARE ] = 'square';
ShapeStyles[ Shapes.TRIANGLE ] = 'triangle';
ShapeStyles[ Shapes.CIRCLE ] = 'circle';

function TileView( tile, parent ) {
	this.tile = tile;
	this.$el = $( '<div class="tile"><div class="shape"></div></div>');
	$( parent ).append( this.$el );
	this.render();
}

TileView.prototype.render = function() {
	var shape = this.$el.find( '.shape' );
	shape.attr( 'class', 'shape'); // remove all classes
	shape.data( 'row', this.tile.row );
	shape.data( 'col', this.tile.col );

	if ( this.tile.type == 'default' ) {
		shape.addClass( ColorStyles[ this.tile.color ] );
		shape.addClass( ShapeStyles[ this.tile.shape ] );
	}
	else {
		shape.addClass( this.tile.type );
	}
}

TileView.prototype.select = function() {
	this.$el.addClass( 'selected' );
}

module.exports = TileView;