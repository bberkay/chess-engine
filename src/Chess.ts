/**
 * @module Chess
 * @description This module provides users to a playable chess game on the web by connecting ChessEngine and ChessBoard with CacheManager.
 * @version 1.0.0
 * @author Berkay Kaya
 * @url https://github.com/bberkay/chess
 * @license MIT
 */

import {CacheLayer, JsonNotation, Square, StartPosition} from "./Types";
import {SquareClickMode} from "./Types/Board";
import {ChessEngine} from "./Engine/ChessEngine";
import {ChessBoard} from "./Interface/ChessBoard";
import {Converter} from "./Utils/Converter.ts";
import {CacheManager} from "./Managers/CacheManager.ts";


/**
 * This class provides users to a playable chess game on the web by connecting ChessEngine and ChessBoard. Also,
 * it uses CacheManager which provides users to save the game to the cache and load the game from the cache.
 */
export class Chess{

    /**
     * Properties of the Chess class.
     */
    private chessEngine: ChessEngine;
    private chessBoard: ChessBoard;
    private selectedSquare: Square | null = null;

    /**
     * Constructor of the Chess class.
     */
    constructor(){
        this.chessEngine = new ChessEngine();
        this.chessBoard = new ChessBoard();

        // Check the cache and load the game(if exists).
        this.checkAndLoadGameFromCache();
    }

    /**
     * This function loads the game from the cache. If there is no game in the cache, it creates a new game.
     * @see For more information about cache management check src/Managers/CacheManager.ts
     */
    private checkAndLoadGameFromCache(): void
    {
        this.createGame("rnbqkbnr/ppppp1pp/8/8/2Q1P3/1B6/PPPP1PPP/RNB1K1NR w KQkq - 0 1");
        /*if(!Cache.get(CacheLayer.Game))
            this.createGame();
        else{
            console.log("Game is loaded from the cache.");
            // TODO: Json Notation ile yüklenebilir.
        }*/
    }

    /**
     * This function creates a new game with the given position(fen notation, json notation or StartPosition enum).
     * @see For more information about StartPosition enum check src/types.ts
     */
    public createGame(position: JsonNotation | StartPosition | string = StartPosition.Standard): void
    {
        // Clear the game from the cache before creating a new game.
        CacheManager.clear(CacheLayer.Game);

        // If fen notation is given, convert it to json notation.
        if(typeof position === "string")
            position = Converter.convertFenToJson(position);

        // Create a new game on engine.
        this.chessEngine.createGame(position);

        // Create a new game on board.
        this.chessBoard.createGame(position);
    }

    /**
     * Make action on the game.
     * @example doAction(SquareClickMode.Select, Square.a2); // Select the piece on the square a2.
     * @example doAction(SquareClickMode.Play, Square.a3); // Play the selected piece(a2) to the square a3.
     * @example doAction(SquareClickMode.Promote, Square.a8); // Promote the selected piece(a2) to the piece on the square a8.
     */
    public doAction(moveType: SquareClickMode, square: Square): void
    {
        if([SquareClickMode.Play, SquareClickMode.Castling, SquareClickMode.Promote, SquareClickMode.Promotion, SquareClickMode.EnPassant].includes(moveType)){
            this._doPlayAction(square);

            /**
             * If the move type is not promotion, clear the board.
             * Because, we need selectedSquare(promoted pawn) to promote
             */
            if(moveType == SquareClickMode.Promotion)
                this.chessBoard.clearBoard();
            else
                this._doClearAction();
        }
        else if(moveType === SquareClickMode.Select)
            this._doSelectAction(square);
        else if(moveType == SquareClickMode.Clear)
            this._doClearAction();
    }

    /**
     * This function clears the selected square and clears the board on chessBoard.
     */
    private _doClearAction(): void
    {
        this.selectedSquare = null;
        this.chessBoard.clearBoard();
    }

    /**
     * This function set the selected square and highlight select on
     * chessBoard then get the possible moves of the selected square
     * with chessEngine and highlight them on chessBoard.
     */
    private _doSelectAction(square: Square): void
    {
        if(!this.chessEngine.isSelectLegal(square))
            return;

        // Get the possible moves of the selected square and highlight them on chessBoard.
        this.selectedSquare = square;
        this.chessBoard.highlightSelect(square);
        this.chessBoard.highlightMoves(this.chessEngine.getMoves(square)!);
    }


    /**
     * This function move the selected square on chessEngine and chessBoard,
     * then set the selected square to null and clear the board.
     */
    private _doPlayAction(square: Square): void
    {
        this.chessEngine.playMove(this.selectedSquare!, square);
        this.chessBoard.playMove(this.selectedSquare!, square);
    }

    /**
     * This function checks the game is finished or not.

    public isGameFinished(): boolean
    {
       return this.chessEngine.getStatusOfGame();
     */
}
