var	$ = require( 'jquery'),
	Colors = require( '../colors' ),
	Shapes = require( '../shapes' ),
	ColorStyles = {}, 
	ShapeStyles = {};

ColorStyles[ Colors.RED ] = "red";
ColorStyles[ Colors.GREEN ] = "green";
ColorStyles[ Colors.BLUE ] = "blue";

ShapeStyles[ Shapes.SQUARE ] = "square";
ShapeStyles[ Shapes.TRIANGLE ] = "triangle";
ShapeStyles[ Shapes.CIRCLE ] = "circle";

function TileView( tile, parent ) {
	this.tile = tile;
	this.$el = $( '<div class="tile"></div>');
	$( parent ).append( this.$el );
	this.render();
}

TileView.prototype.render = function() {
	this.$el.attr( 'class', 'tile'); // remove all classes
	this.$el.addClass( ColorStyles[ this.tile.color ] );
	this.$el.addClass( ShapeStyles[ this.tile.shape ] );
}

module.exports = TileView;