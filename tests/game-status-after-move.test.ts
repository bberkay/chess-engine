/**
 * Test file for game status after move like check, checkmate, stalemate, etc.
 *
 * @see For more information about vitest, check https://vitest.dev/
 */

import { expect, test } from 'vitest';
import { Test } from './Types';
import { GameStatus, Square, StartPosition } from '../src/Types';
import { ChessEngine } from '../src/Engine/ChessEngine';

/**
 * Games with expected GameStatus after the
 * moves are played.
 */
const games: Test[] = [
    {
        title: "Check Test",
        board: StartPosition.Check,
        moves: [
            {from: Square.d5, to: Square.e5}
        ],
        expectation: GameStatus.BlackInCheck
    },
    {
        title: "En Passant Check Test",
        board: StartPosition.EnPassantCheck,
        moves: [
            {from: Square.d2, to: Square.d4},
            {from: Square.a7, to: Square.a6},
            {from: Square.d4, to: Square.d5},
            {from: Square.e7, to: Square.e5},
            {from: Square.d5, to: Square.e6}
        ],
        expectation: GameStatus.BlackInCheck
    },
    {
        title: "Checkmate Test",
        board: StartPosition.Checkmate,
        moves: [
            {from: Square.b1, to: Square.a1},
            {from: Square.e6, to: Square.a6},
            {from: Square.a1, to: Square.a6}
        ],
        expectation: GameStatus.WhiteVictory
    },
    {
        title: "Stalemate Test",
        board: StartPosition.Stalemate,
        moves: [
            {from: Square.g4, to: Square.g5}
        ],
        expectation: GameStatus.Draw
    },
    {
        title: "Double Check Test",
        board: StartPosition.DoubleCheck,
        moves: [
            {from: Square.f7, to: Square.d6}
        ],
        expectation: GameStatus.BlackInCheck
    },
    {
        title: "Adjacent Checkmate Test",
        board: StartPosition.AdjacentCheckmate,
        moves: [
            {from: Square.f4, to: Square.f7}
        ],
        expectation: GameStatus.WhiteVictory
    },
    {
        title: "Checkmate With Double Check Test",
        board: StartPosition.CheckmateWithDoubleCheck,
        moves: [
            {from: Square.f7, to: Square.d6}
        ],
        expectation: GameStatus.WhiteVictory
    }
]

// Test every game
test(`Game Status After Move`, () => {
    // Create chess engine
    const chessEngine = new ChessEngine();

    // Test every game
    for (const game of games) {
        console.log("Testing: " + game.title);
        chessEngine.createGame(game.board);

        for (const move of game.moves!) {
            chessEngine.playMove(move.from, move.to);
        }

        expect(chessEngine.getStatus()).toBe(game.expectation);
        console.log("Board After Moves: " + chessEngine.getGameAsFenNotation());
        console.log("Passed: " + game.title);
        console.log("--------------------------------------------------");
    }
});
