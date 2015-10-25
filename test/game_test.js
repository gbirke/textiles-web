var expect = require( 'chai' ).expect,
	Board = require( '../js/board' ),
	Game = require( '../js/game' ),
	Colors = require( '../js/colors' ),
	Shapes = require( '../js/shapes' );

describe( 'Game', function () {

	describe( '#init', function () {

		it( 'creates a board', function () {
			var game = new Game();
			expect( game.board ).to.be.not.null;
			expect( game.board ).to.be.not.undefined;
		} );

		it( 'creates a tile stack', function () {
			var game = new Game();
			expect( game.tileStack ).to.be.not.null;
			expect( game.tileStack ).to.be.not.undefined;
		} );

		it( 'inits an active player', function () {
			var game = new Game();
			expect( game.getActivePlayer() ).to.equal( 'Player 1' );
		} );

	} );

	describe( '#switchActivePlayer', function () {

		it( 'switches between players', function () {
			var game = new Game();
			expect( game.getActivePlayer() ).to.equal( 'Player 1' );
			game.switchActivePlayer();
			expect( game.getActivePlayer() ).to.equal( 'Player 2' );
			game.switchActivePlayer();
			expect( game.getActivePlayer() ).to.equal( 'Player 1' );
		} );


	} );

} );
