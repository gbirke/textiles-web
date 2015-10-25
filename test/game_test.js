var expect = require( 'chai' ).expect,
	Board = require( '../js/board' ),
	Game = require( '../js/game' ),
	Colors = require( '../js/colors' ),
	Shapes = require( '../js/shapes' );

describe( 'Game', function () {

	var eventEmitter = {
		trigger: function () {},
		on: function () {}
	}

	describe( '#init', function () {

		it( 'creates a board', function () {
			var game = new Game( eventEmitter );
			expect( game.board ).to.be.not.null;
			expect( game.board ).to.be.not.undefined;
		} );

		it( 'creates a tile stack', function () {
			var game = new Game( eventEmitter );
			expect( game.tileStack ).to.be.not.null;
			expect( game.tileStack ).to.be.not.undefined;
		} );

		it( 'creates a score calculator', function () {
			var game = new Game( eventEmitter );
			expect( game.scoreCalculator ).to.be.not.null;
			expect( game.scoreCalculator ).to.be.not.undefined;
		} );

		it( 'inits an active player', function () {
			var game = new Game( eventEmitter );
			expect( game.getActivePlayer().name ).to.equal( 'Player 1' );
		} );

	} );

	describe( '#switchActivePlayer', function () {

		it( 'switches between players', function () {
			var game = new Game( eventEmitter );
			expect( game.getActivePlayer().name ).to.equal( 'Player 1' );
			game.switchActivePlayer();
			expect( game.getActivePlayer().name ).to.equal( 'Player 2' );
			game.switchActivePlayer();
			expect( game.getActivePlayer().name ).to.equal( 'Player 1' );
		} );


	} );

} );
