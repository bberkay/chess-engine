<h1 align = "center">Chess Platform</h1>
<p><a href = "https://chess-a66i.onrender.com">Live Demo</a>. (Server connections may be slow since I uploaded the demo to a free render account)</p>
<h3>Table of Contents </h3>
<ol>
    <li><a href = "#introduction">Introduction</a></li>
    <li><a href = "#features">Features</a></li>
    <li><a href = "#architecture">Architecture</a></li>
    <li><a href = "#installation">Installation</a></li>
    <li><a href = "#usage">Usage</a></li>
    <li><a href = "#testing">Testing</a></li>
    <li><a href = "#epilogue">Epilogue</a></li>
    <li><a href = "#sources">Sources</a></li>
</ol>
<h3>Introduction</h3>
<p>Chess Platform is a web application (a portfolio project) that allows you to play chess against yourself, a friend, or the Stockfish engine with adjustable difficulty levels. While the project does not use advanced chess programming techniques (such as 0x88 or bitboards), it fully implements all chess rules. The application is divided into three main components: Chess Platform, Platform, and Chess. Detailed information about these parts can be found in the <a href="#architecture">Architecture</a> section. The client side is developed entirely in <b>TypeScript</b> and tested with <b>Vitest</b>, while the server side is built using <b>Bun.js</b>.</p>
</p>
<img src="https://lh3.googleusercontent.com/fife/ALs6j_FY6MiI1S6ky8ycQi4BGTtStiTvLMv-mmBxt4ca_70csR0oYAdSxZgZ8dkKlb-4ntcgGHaPI0A60h6rcTKzPCcjE1hoU190CPzbOVp5JPZXWjn5QGWTBdOHoMxyYnQJM1kgjSmoTyAu5gJANb2NUcHD2MCBXC2dpxs9lpT8qvHt07ywYjj0ryTdGVm8QC728rqvSDsGCg5LXbQ9AnD1YROaV6i-G6mcO9YWFYPc3yuwkdKPZGia-EIRZdDzhRhJYhvqknvh4gKoWPW76c7X8c9G2YCksdqcVva2W7ia857jbh6wazFlwafAkJgDtGK5l1oC4HGRZy8JCzCQ99XwIaogL0k27x4lmDKEtpNvlkuw7ns3bnVmVtIGPSWcgF9VJisJa-bhIrkpwNeZ8DjssQlCaauDzIl9JEdQmA5tAwJkg1OV1J-5ehNnanbJO-NqzgtZHcDwkU5FP8JylgWhrT-Fo1joN0LEGdV4HdoWci5BvqwbcUK7fCX3vUKDpuHQBtIxe6XQWd274fKQ3xBsLGFKhgIDrcG55aFS3nS2RMHoFjANqgQyRQvLnB2Gq3tgrvkIuccOyZStZ_xruYsicxUpOb2Ibn1ycpvRpTMg_DAwTA6ENkMDCa8cDajyHF91uXbxKN2s-NYXN3duif741oohWL7LEp_gkRVI37ZMA-Tnb-ksg7puR2agAD6pNobYtF_8EMcNwllaSiHybMOPhcvBooLGfTYX4Sngm9wTHqAaKsCN03tyciLtNhYfSfHgZ6dUBKBcjJpySxmZaaKgSPD6MTZ9EMr5iTyDYehpgpfioziR4a_NJk8jko4CtV4gT5sT1MFwdSNDMBqHeYck4rLercIyErkg3wuygB3X-pfz-s4tQGh6VCYI58urq0tC4CDEhrwf1Uw8HT8Wjmp4kLnLYwsX_JniRa74LrHWHuF6O_j8wSiC-8wjXpSz4T8z80cbzEuJJKT1bsb0rpsL6VGkCpxJcdmqDqhBQmETVtGvDdt1GCwZYJD8tZfbzpRfAs3XDjHcUzEhdDvvLQZriarNDvPAOiONeEKBolVNxAqdvFSazNND0qLTRFy7bIFSCbtzutrC0nbspOE9D858nZSdll5uzKFCeMReCrj0FnhkqueUeOmgDyBJ9xvH7lmMlVaHqJlUsYLHTqR5Bl-rv4ynLENtlfaCE_n54iQrS3ubicrJm21iFxjYKVla_4dXx9ZGxt7jOJC5uj7lqscH33rDqLBOI2vOkIO4U2FRN6bOdlQFXDrboK8w8saKIBnZZomPS531M97stFaPIzx6gemx1w-HVbrYVqhfUnBy50-HL_EOYugGk1hrJ9vg8qDlcBZN1Qrw-o7tInRzM2nekUcJmZ4ZoLDnqsYXSQz1wQ_OatJLQAE15i0cBnxf-5ixWJKH2aQEjIYzdABZXFzMM0fzmrtNwkqZM8j2aGi4UWwNOwYa1BTpgzXhGNC44qJGCaBohNrMWIdWeT1OGoryfjxb5RKQKiF3qo_TOKjcl3P4YwcNTo8s7YVEDSky4nrxlTI-YYV0ciytNqsY9mw79Vh-DXTwS3rV0Pq9489laM5q91fdy4ozn76fPavUgOOV4olquC9BzjSGVBl8=w1538-h851" alt="chess-platform-preview" border="0">
<h3>Features</h3>
<ul>
  <li><b>Board:</b> Includes animations and sounds for normal moves and pre-moves. Can be flipped. Supports drag-and-drop on both desktop and mobile. Easily <a href = "https://github.com/bberkay/chess/blob/main/public/css/chessboard.css">customizable</a> and <a href = "https://github.com/bberkay/chess/blob/main/client/src/Chess/Board/Types/index.ts">configurable</a>.</li>
  <li><b>Standard Mechanics:</b> 
    <ul>
      <li>Move Calculation/Validation and special moves like <a href = "https://en.wikipedia.org/wiki/Castling">Castling</a>, <a href = "https://en.wikipedia.org/wiki/Promotion_(chess)">Promotion</a>, <a href = "https://en.wikipedia.org/wiki/En_passant">En Passant</a>.</li>
      <li>Check, Checkmate, Stalemate, <a href = "https://en.wikipedia.org/wiki/Threefold_repetition">Threefold Repetition</a>, <a href = "https://en.wikipedia.org/wiki/Fifty-move_rule">Fifty-move Rule</a>, <a href = "https://support.chess.com/en/articles/8705277-what-does-insufficient-mating-material-mean">Insufficient Material</a>.</li>
      <li><a href = "https://en.wikipedia.org/wiki/Chess_piece_relative_value">Score Calculation</a>, <a href = "https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">Fen Notation</a>, <a href = "https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">Algebraic Notation</a>.</li>
      <li>Time Control</li>
    </ul>
  <li><b>Extended Mechanics:</b>
    <ul>
      <li>Pre-Move for every type of move like normal, castling, en passant and promotion/promote (to any type of piece). Supports multiple pre-moves and can be canceled of course.</li>
      <li>Abort, Resign and Draw, Undo and Play again offers.</li>
      <li>Going back and forward in the move history.</li>
    </ul>
  <li><b>Game Modes:</b> 
    <ul>
      <li><b>Play by Yourself</b>: Play by yourself or against a friend on the same device.</li>
      <li><b>Play against Friend</b>: Play against a friend on different devices by creating a lobby or joining an existing one.</li>
      <li><b>Play against Bot</b>: Play against the Stockfish engine with <a href="https://github.com/bberkay/chess/blob/main/client/src/Chess/Bot/index.ts">adjustable</a> difficulty levels.</li>
    </ul>
  </li>
  <li><b>Components:</b> 
    <ul>
      <li><a href="https://github.com/bberkay/chess/blob/main/client/src/Platform/Components/NotationMenu.ts"><b>Notation Table</b></a>: Shows move history and provides navigation on it. Also, shows the scores, players, durations
      and provides actions according to the game mode like draw if it is multiplayer game or abort if it is solo game.</li>
      <li><a href="https://github.com/bberkay/chess/blob/main/client/src/Platform/Components/BoardEditor.ts"><b>Board Editor</b></a>: Provides editable board for creating custom positions and starting games from them.</li>
      <li><a href="https://github.com/bberkay/chess/blob/main/client/src/Platform/Components/NavbarComponents/LogConsole.ts"><b>Log Console</b></a>: Shows the log of every operation and their details that are done</li>
      <li><a href="https://github.com/bberkay/chess/blob/main/client/src/Platform/Components/NavbarComponents/AppearanceMenu.ts"><b>Appearance Menu</b></a>: Provides board and theme customization without changing the css file.</li>
      <li><a href="https://github.com/bberkay/chess/blob/main/client/src/Platform/Components/NavbarComponents/SettingsMenu.ts"><b>Settings Menu</b></a>: For changing the configurations of the board and components like closing sound effects or changing the notation style.</li>
    </ul>
  </li>
  <li><b>Others:</b>
    <ul>
      <li>Responsive design for different devices.</li>
      <li>Light, Dark and System theme support.</li>
      <li>Cache system for saving the game, custom settings or appearance etc.</li>
      <li>Reconnection system for multiplayer games.</li>
    </ul>
</ul>
<h3>Architecture</h3>
<h5><i>Technologies: TypeScript, Bun, Vite, Vitest</i></h5>
<p>In this section, I will explain the project's architecture without going into too much detail as much as possible. As I mentioned in the introduction, the project currently consists of two main parts and the third part that provides connection between main parts and manages the app.</p>
<ul>
    <li>
        <strong><a href = "https://github.com/bberkay/chess-platform/blob/main/src/ChessPlatform.ts">Chess Platform</a></strong><br/>
        The part that provides connection between Platform and Chess. Creates Chess instance and provides it to Platform instance. So, chess methods can be used by platform's components. And by connecting Platform and Chess, it provides the start point for the project.
    </li><br/>
    <li>
        <strong><a href = "https://github.com/bberkay/chess-platform/blob/main/src/Chess/Chess.ts">Chess</a></strong><br/>
        Chess provides a playable game on web by using ChessEngine and ChessBoard instances. Also, has a Cache system for save the game and log system for save the details of every action.  
        <br/>
        <ul>
            <li>
                <strong><a href = "https://github.com/bberkay/chess-platform/blob/main/src/Chess/Engine/ChessEngine.ts">ChessEngine</a></strong><br/>
                ChessEngine provides the mechanism of the game. All the rules of chess are implemented in this class and can be used as standalone or directly by Chess class for playable game by connecting with ChessBoard.   
            </li>
            <li>
                <strong><a href = "https://github.com/bberkay/chess-platform/blob/main/src/Chess/Board/ChessBoard.ts">ChessBoard</a></strong><br/>
                ChessBoard provides the interactive chessboard that players can make actions but doesn't have any mechanism. ChessBoard can be used as standalone or directly by Chess class for playable game by connecting with ChessEngine. Also, both board and pieces can be visualized from <a href = "https://github.com/bberkay/chess-platform/tree/main/src/Chess/Board/Assets">assets.</a>
            </li>
        </ul>
    </li><br>
    <li>
        <strong><a href = "https://github.com/bberkay/chess-platform/blob/main/src/Platform/Platform.ts">Platform</a></strong><br/>
        Platform provides some UI components by using chess instance that connected by Chess Platform. Currently, Platform has four components: Notation Table that shows every played move of players as algebraic notation, Score Section(comes with notation table) that shows score of every player, Game Creator that provide 2 different create form(used with fen notation) for users, and Log Console that shows the log of every action of players on UI by using chess instance's log system. 
    </li>
</ul>

```mermaid
classDiagram
  class ChessPlatform {
    + readonly chess: Chess
    - readonly platform: Platform
    + constructor()
  }
  class Chess {
    - chessBoard: ChessBoard
    - chessEngine: ChessEngine
    + constructor()
  }
  class ChessEngine {
    + constructor()
  }
  class ChessBoard {
    + constructor()
  }
  class Platform {
    - readonly chess: Chess
    - notationTable: NotationTable
    - gameCreator: GameCreator
    - logConsole: LogConsole
    + constructor()
  }
  class NotationTable {
    - readonly chess: Chess
    + constructor()
  }
  class GameCreator {
    - readonly chess: Chess
    + constructor()
  }
  class LogConsole {
    - readonly chess: Chess
    + constructor()
  }

  ChessPlatform *-- Chess
  ChessPlatform *-- Platform
  Chess "0..1" o-- "1" ChessBoard
  Chess "0..1" o-- "1" ChessEngine
  Platform "1" *-- "0..1" NotationTable
  Platform "1" *-- "0..1" GameCreator
  Platform "1" *-- "0..1" LogConsole

```

<h3>Installation</h3>
<ol>
    <li>
        Clone the repository.
        <br/>
        <code>git clone https://github.com/bberkay/chess.git</code>
    </li>
    <li>
        Server
        <ol>
            <li>
                Go to the server directory.
                <br/>
                <code>cd server</code>
            </li>
            <li>
                Install the dependencies.
                <br/>
                <code>bun install</code>
            </li>
            <li>
                Run the server
                <br/>
                <code>bun run src/main.ts</code>
            </li>
        </ol>
    </li>
    <li>
    Client
        <ol>
            <li>
                Go to the client directory.
                <br/>
                <code>cd client</code>
            </li>
            <li>
                Install the dependencies.
                <br/>
                <code>bun install</code>
            </li>
            <li>
                Run the project
                <br/>
                <code>bun run dev</code>
            </li>
        </ol>
    </li>
    <small>Or build with <code>bun run build</code></small>
</ol>
<h3>Usage</h3>
<h4>ChessPlatform(Full Version)</h4>

```html
<html>
  <head>
    <title>Chess Platform</title>
  </head>
  <body>
    <!-- Chess and Components -->
    <main>
      <div class="left">
        <div id="navbar"></div>
        <div id="log-console"></div>
        <div id="settings-menu"></div>
        <div id="appearance-menu"></div>
        <div id="about-menu"></div>
      </div>
      <div class="center">
        <div id="chessboard"></div>
        <div id="navigator-modal"></div>
        <div id="board-creator"></div>
      </div>
      <div class="right">
        <div id="notation-menu"></div>
        <div id="piece-creator"></div>
      </div>
    </main>

    <!-- Initiate Chess Platform -->
    <script type="module" async>
      import { ChessPlatform } from "./src/ChessPlatform";

      /**
       * If there is a game in cache, then platform
       * will load it. Otherwise, platform will create
       * a new standard game.
       */
      const chessPlatform = new ChessPlatform();
    </script>
  </body>
</html>
```

<p>This is also current usage in <a href = "https://github.com/bberkay/chess/blob/main/client/src/index.html">index.html</a> of the <a href = "#chess-platform">Live Demo</a>.</p>
<p>
<h4>Method List of ChessPlatform</h4>
<span>Most (but not all) of the public methods you can use within the <code>ChessPlatform</code> class.</span><br/>
<small>You can see the custom <code>ChessPlatform</code> types in <a href = "https://github.com/bberkay/chess/blob/main/client/src/Types/index.ts">here</a> and more detailed explanation of the methods in <a href = "
https://github.com/bberkay/chess/blob/main/client/src/ChessPlatform.ts">here</a>.</small>
</p>

```javascript
/**
 * Add custom callbacks to the WebSocket events.
 * Does not override the default callbacks.
 * */
bindSocketOperationCallbacks(
  onOpen: (() => void) | null = null,
  onMessage: (
    <T extends WsTitle>(
      wsTitle: T, 
      wsData: WsData<T>
    ) => void) | null = null,
  onError: (() => void) | null = null,
  onClose: (() => void) | null = null
): void

/**
 * Establishes a WebSocket connection for 
 * creating a new lobby.
 */
createLobby(
  createLobbyReqParams: CreateLobbyReqParams
): void

/**
 * Establishes a WebSocket connection for 
 * joining an existing lobby.
 */
joinLobby(
  joinLobbyReqParams: JoinLobbyReqParams
): void

/**
 * Cancel the game and close the socket 
 * connection.
 */
cancelLobby(): void

/**
 * Abort the game and send the abort 
 * command to the server.
 */
abortGame(): void

/**
 * Resign the game and send the resign 
 * command to the server.
 */
resign(): void

/**
 * Send the play again offer to 
 * the opponent.
 */
sendPlayAgainOffer(): void

/**
 * Send the draw offer to the opponent.
 */
sendDrawOffer(): void

/**
 * Send the undo move offer to the
 * opponent.
 */
sendUndoOffer(): void

/**
 * Accept the draw offer from the 
 * opponent.
 */
acceptDrawOffer(): void

/**
 * Accept the play again offer from 
 * the opponent.
 */
acceptPlayAgainOffer(): void

/**
 * Accept the undo move offer from 
 * the opponent.
 */
acceptUndoOffer(): void

/**
 * Cancel the offer that sent to 
 * the opponent.
 */
cancelOffer(): void

/**
 * Decline the sent offer from 
 * the opponent.
 */
declineSentOffer(): void

/**
 * Clear the last connection restore 
 * the platform components.
 */
terminateConnection(resetPlatform: boolean = true): void
```

<h4>Chess(without Platform)</h4>

```html
<html>
  <head>
    <title>Chess without Platform</title>
  </head>
  <body>
    <div id="chessboard"></div>
    <!-- Required while using Chess -->

    <!-- Initiate Chess without Platform -->
    <script type="module" async>
      import { Chess } from '@Chess/Chess';
      import { 
        BotAttributes, 
        BotDifficulty, 
        BotColor 
      } from '@Chess/Bot';
      import { Color, Square } from '@Chess/Types';

      // If there is a game in cache, then chess
      // will load it. Otherwise, chess will
      // create a new standard game.
      const chess = new Chess();

      // Stockfish can be added to the game
      // with different difficulty levels
      // and colors.
      const botAttributes = {
          color: BotColor.Random
          difficulty: BotDifficulty.Medium
      }
      chess.addBotToCurrentGame(botAttributes);

      // Listening the moves
      document.addEventListener(ChessEvent.onPieceMoved, ((
          event
      ) => {
          console.log(event.detail.from, event.detail.to);
          console.log(chess.getGameAsFenNotation());
      }));
    </script>
  </body>
</html>
```

<h4>Method List of Chess</h4>
<p>
<span>Most (but not all) of the public methods you can use within the <code>Chess</code> class.</span><br/>
<small>You can see the custom <code>Chess</code> types from <a href = "https://github.com/bberkay/chess/blob/main/client/src/Chess/Types/index.ts">here</a> and more detailed explanation of the methods from <a href = "
https://github.com/bberkay/chess/blob/main/client/src/Chess/Chess.ts">here</a>.</small>
</p>

```javascript
/**
 * Creates a new game with the given position 
 * and durations.
 */
createGame(
  position: JsonNotation
          | StartPosition
          | string = StartPosition.Standard,
  durations: Durations | null = null
): void

/**
 * Creates a new piece with the given color, 
 * type and square.
 */
createPiece(
  color: Color, 
  type: PieceType, 
  square: Square
): void

/**
 * Removes the piece on the given square.
 */
removePiece(square: Square): void

/**
 * Adds a bot to the current game with the 
 * given attributes.
 */
addBotToCurrentGame(
  botAttributes: BotAttributes
): void

/**
 * Returns the last created bot's attributes 
 * if there is any.
 */
getLastCreatedBotAttributes(): BotAttributes | null

/**
 * Terminates the bot if there is any.
 */
terminateBotIfExist(): void

/**
 * Takes back the last move.
 */
takeBack(
  onEngine: boolean = false, 
  undoColor: Color | null = null
): void

/**
 * Takes forward the last taken back move.
 */
takeForward(): void

/**
 * Goes to the specific move by the given index.
 */
goToSpecificMove(moveIndex: number): void

/**
 * Returns the durations of the game if 
 * the `durations` are set.
 */
getDurations(): Durations | null

/**
 * Returns the remaining times of the players 
 * if the `durations` are set.
 */
getPlayersRemainingTime(): RemainingTimes

/**
 * Returns the color of the current turn 
 * or taken back board's, if `ignoreTakeBack` 
 * is `false`.
 */
getTurnColor(
  ignoreTakeBack: boolean = true
): Color

/**
 * Returns the status of the current game 
 * or taken back board's.
 */
getGameStatus(
  ignoreTakeBack: boolean = true
): GameStatus

/**
 * Returns the algebraic notation of the 
 * current game or taken back board's.
 */
getAlgebraicNotation(
  ignoreTakeBack: boolean = true
): ReadonlyArray<string>

/**
 * Returns the move history of the 
 * current game or taken back board's.
 */
getMoveHistory(
  ignoreTakeBack: boolean = true
): ReadonlyArray<Move>

/**
 * Returns the scores of the current 
 * game or taken back board's.
 */
getScores(
  ignoreTakeBack: boolean = true
): Readonly<Scores>

/**
 * Returns the fen notation of the current 
 * game or taken back board's.
 */
getGameAsFenNotation(
  ignoreTakeBack: boolean = true
): string

/**
 * Returns the json notation of the current 
 * game or taken back board's.
 */
getGameAsJsonNotation(
  ignoreTakeBack: boolean = true
): JsonNotation

/**
 * Returns the ASCII representation of the 
 * current game or taken back board's.
 */
getGameAsAscii(
  ignoreTakeBack: boolean = true
): string

/**
 * Returns the board history of the current 
 * game. After every move, the board is saved 
 * as json notation.
 */
getBoardHistory(): ReadonlyArray<JsonNotation>
```

<h4>ChessBoard(Standalone)</h4>

```html
<html>
  <head>
    <title>Chessboard Standalone</title>
  </head>
  <body>
    <div id="chessboard"></div>
    <!-- Required while using ChessBoard -->

    <!-- Initiate Chessboard as Standalone -->
    <script type="module" async>
      import {
        ChessBoard,
        AnimationSpeed,
        Config,
      } from "@Chess/Board/ChessBoard";
      import { Square } from "@Chess/Types";

      // Standard game will be created in constructor.
      const chessBoard = new ChessBoard();

      // Set configuration of the board(optional).
      const config: Config = {
        enableSoundEffects: true,
        enablePreSelection: false,
        showHighlights: true,
        enableWinnerAnimation: true,
        animationSpeed: AnimationSpeed.Slow,
      };
      chessBoard.setConfig(config);

      // Bind move event callbacks.
      // This is a basic example:
      let selectedSquare: Square | null = null;
      let preSelectedSquare: Square | null = null;
      let preMoves: { 
        selectedSquare: Square, 
        targetSquare: Square 
      }[] = [];
      chessBoard.bindMoveEventCallbacks({
        onPieceSelected: (squareId: Square) => {
          selectedSquare = squareId;
        },
        onPiecePreSelected: (squareId: Square) => {
          preSelectedSquare = squareId;
        },
        onPieceMoved: (squareId: Square) => {
          console.log("Piece moved to: ", squareId);
          selectedSquare = null;
        },
        onPiecePreMoved: (
          squareId: Square,
          squareClickMode: SquareClickMode
        ) => {
          console.log("Piece pre-moved to: ", squareId);
          if (squareClickMode === SquareClickMode.PrePromote)
            chessBoard.showPromotionMenu(squareId);
          else
            preMoves.push({
              selectedSquare: preSelectedSquare,
              targetSquare: squareId,
            });
        },
        onPreMoveCanceled: () => {
          console.log("Pre-move canceled.");
          preSelectedSquare = null;
          preMoves = [];
        },
      });
    </script>
  </body>
</html>
```

<h4>Method List of ChessBoard</h4>
<p>
<span>Most (but not all) of the public methods you can use within the <code>ChessBoard</code> class.</span><br/>
<small>You can see the custom <code>ChessBoard</code> types in <a href = "https://github.com/bberkay/chess/blob/main/client/src/Chess/Board/Types/index.ts">here</a> and more detailed explanation of the methods in <a href = "
https://github.com/bberkay/chess/blob/main/client/src/Chess/Board/ChessBoard.ts">here</a>.</small>
</p>

```javascript
/**
 * Set the configuration of the chess board.
 */
setConfig(
  config: Partial<ChessBoard["config"]>
): void

/**
 * Creates a new game with the given position.
 */
createGame(
  position: JsonNotation 
          | StartPosition 
          | string = StartPosition.Standard
): void

/**
 * Creates a new piece with the given color, 
 * type and square.
 */
createPiece(
  color: Color, 
  type: PieceType, 
  square: Square, 
  isGhost: boolean = false
): void

/**
 * Removes the piece on the given square.
 */
removePiece(
  square: HTMLDivElement 
        | HTMLElement 
        | Element 
        | Square
): void

/**
 * Sets the turn color of the board.
 */
setTurnColor(color: Color): void

/**
 * Bind functions to the specific events 
 * of the chess board. Does not override 
 * the previous event bindings.
 */
bindMoveEventCallbacks(
    callbacks: { 
      onPieceSelected?: (squareId: Square) => void; 
      onPiecePreSelected?: (squareId: Square) => void; 
      onPieceMoved?: (squareId: Square) => void; 
      onPiecePreMoved?: (
        squareId: Square, 
        squareClickMode: SquareClickMode
      ) => void; 
      onPreMoveCanceled?: () => void 
    }
): void

/**
 * Highlights the moves on the board.
 */
highlightMoves(
  moves: Moves | null = null, 
  isPreMove: boolean = false
): void

/**
 * Refreshes the board.
 */
refresh(savePreMoveEffects: boolean = false): void

/**
 * Flips the board.
 */
flip(): void

/**
 * Returns whether the board is flipped or not.
 */
isFlipped(): boolean

/**
 * Locks the board.
 */
lock(
  disablePreSelection: boolean = false, 
  showDisabledEffect: boolean = false
): void

/**
 * Returns whether the board is locked or not.
 */
isLocked(): boolean

/**
 * Shows the status on the board.
 */
showStatus(status: GameStatus): void

/**
 * Shows the promotion menu on the given square.
 */
showPromotionMenu(
  promotionSquare: HTMLElement | Square
): void

/**
 * Closes the promotion menu.
 */
closePromotionMenu(): void

/**
 * Returns whether the promotion menu is shown or not.
 */
isPromotionMenuShown(): boolean

/**
 * Locks the actions for the given color.
 */
lockActionsOfColor(color: Color): void

/**
 * Returns the locked color if there is any.
 */
getLockedColor(): Color | null

/**
 * Returns all the squares of the board.
 */
getAllSquares(): NodeListOf<HTMLDivElement>

/**
 * Returns all the pieces of the board.
 */
getAllPieces(): NodeListOf<HTMLDivElement>

/**
 * Returns the closest square element of the 
 * given element.
 */
getClosestSquareElement(
  element: HTMLElement
): HTMLElement | null

/**
 * Returns the piece element of the given square.
 */
getPieceElementOnSquare(
  squareElement: HTMLDivElement | Element | Square
): HTMLDivElement

/**
 * Returns the selected square element if 
 * there is any.
 */
getSelectedSquareElement(): HTMLDivElement | null

/**
 * Returns the color of the piece on the given
 * square.
 */
getPieceColor(
  squareOrPieceElement: HTMLDivElement | Element | Square
): Color

/**
 * Returns the type of the piece on the given square.
 */
getPieceType(
  squareOrPieceElement: HTMLDivElement | Element | Square
): PieceType

/**
 * Returns the square element of the given piece.
 */
getSquareElementOfPiece(
  pieceElement: HTMLDivElement | Element
): HTMLDivElement

/**
 * Returns the square id of the given square element.
 */
getSquareId(
  squareElement: HTMLDivElement | Element
): Square

/**
 * Returns the click mode of the given square.
 */
getSquareClickMode(
  square: Square | HTMLDivElement | Element
): SquareClickMode
```

<h4>ChessEngine(Standalone)</h4>

```typescript
// somefile.ts/somefile.js
import { ChessEngine } from "@Chess/Engine/ChessEngine";
import { Square } from "@Chess/Types";

// Standard game will be created in constructor.
const chessEngine = new ChessEngine();

// Get moves of the piece on the given square.
// This is optional, you don't have to use it to play move.
const moves: Moves = chessEngine.getMoves(Square.e2);
console.log(moves);
//  Example `moves` output:
//  {
//    [MoveType.Normal]: [Square.e3, Square.e4],
//    [MoveType.Castling]: [],
//    [MoveType.EnPassant]: []
//  }
//

// Play on engine(without board)
chessEngine.playMove(Square.e2, Square.e4);

// Get the fen notation of the current game
const fen: string = chessEngine.getGameAsFenNotation();
console.log(fen);
// Example `fenNotation` output:
// rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1

// Print the ASCII representation of the current game
console.log(chessEngine.getGameAsAscii());
// Example `ASCII` output:
// +---+---+---+---+---+---+---+---+
// | r   n   b   q   k   b   n   r | 8
// | p   p   p   p   p   p   p   p | 7
// | .   .   .   .   .   .   .   . | 6
// | .   .   .   .   .   .   .   . | 5
// | .   .   .   .   P   .   .   . | 4
// | .   .   .   .   .   .   .   . | 3
// | P   P   P   P   .   P   P   P | 2
// | R   N   B   Q   K   B   N   R | 1
// +---+---+---+---+---+---+---+---+
//   a   b   c   d   e   f   g   h
```

<h4>Method List of ChessEngine</h4>
<p>
<span>Most (but not all) of the public methods you can use within the <code>ChessEngine</code> class.</span><br/>
<small>You can see the custom <code>ChessEngine</code> types marked in <a href = "https://github.com/bberkay/chess/blob/main/client/src/Chess/Engine/Types/index.ts">here</a> and more detailed explanation of the methods in <a href = "
https://github.com/bberkay/chess/blob/main/client/src/Chess/Engine/ChessEngine.ts">here</a>.</small>
</p>

```javascript
/**
 * Creates a new game with the given position.
 */
createGame(
  position: JsonNotation 
          | StartPosition 
          | string = StartPosition.Standard
): void

/**
 * Creates a new piece with the given color, 
 * type and square.
 */
createPiece(
  color: Color, 
  type: PieceType, 
  square: Square
): void

/**
 * Removes the piece on the given square.
 */
removePiece(square: Square): void

/**
 * Returns the moves of the piece on the 
 * given square.
 */
getMoves(
  square: Square, 
  isPreCalculation: boolean = false
): Moves | null

/**
 * Plays the move on the engine with the 
 * given squares.
 */
playMove(
  from: Square, 
  to: Square, 
  moveType: MoveType | null = null
): void

/**
 * Takes back the last move.
 */
takeBack(undoColor: Color | null = null): void

/**
 * Returns the durations of the game if 
 * the durations are set.
 */
getDurations(): Durations | null

/**
 * Returns the remaining times of the players 
 * if the durations are set.
 */
getPlayersRemainingTime(): RemainingTimes

/**
 * Returns the color of the current turn.
 */
getTurnColor(): Color

/**
 * Returns the status of the current game.
 */
getGameStatus(): GameStatus

/**
 * Returns the algebraic notation of the 
 * current game.
 */
getAlgebraicNotation(): ReadonlyArray<string>

/**
 * Returns the move history of the current 
 * game.
 */
getMoveHistory(): ReadonlyArray<Move>

/**
 * Returns the board history of the current 
 * game. After every move, the board is saved 
 * as json notation.
 */
getBoardHistory(): ReadonlyArray<JsonNotation>

/**
 * Returns the scores of the current game.
 */
getScores(): Readonly<Scores>

/**
 * Returns the fen notation of the 
 * current game.
 */
getGameAsFenNotation(): string

/**
 * Returns the json notation of the 
 * current game.
 */
getGameAsJsonNotation(): JsonNotation

/**
 * Returns the ASCII representation of 
 * the current game.
 */
getGameAsAscii(): string
```

<p>Check <a href="https://github.com/bberkay/chess/blob/main/client/src/Chess/Chess.ts">Chess.ts</a> for more ready-to-play implementation.</p>
<h3>Testing</h3>
<p>Chess Platform is tested with <i>Vitest</i>. Tests consist mostly of engine tests like <b>move calculation</b>, <b>move validation</b>, <b>checkmate</b>, <b>stalemate</b>, etc. Also, there are some tests for converting operations like <b>fen notation</b> to <code><a href = "https://github.com/bberkay/chess-platform/blob/main/src/Chess/Types/index.ts#L78">JsonNotation</a></code>
</p>
<span>All the tests can be run with the following command.</span>
<br/>
<code>bun run test</code>
<br/>
<br/>
<span>Or run a specific test with the following command.</span>
<br/>
<code>bun run test en-passant</code>
<br/>
<br/>
<span>All tests can be found in the <a href = "https://github.com/bberkay/chess/tree/main/client/tests">tests</a> directory.</span>

<h3>Epilogue</h3>
<p>...</p>
<h3>Sources</h3>
<ul>
    <li><a href = "https://github.com/lichess-org/stockfish.js">Stockfish.js (Bot)</a></li>
    <li><a href = "https://github.com/lichess-org/lila/tree/master/public/piece/maestro">Pieces</a></li>
    <li><a href = "https://github.com/lichess-org/lila/tree/master/public/sound/standard">Sounds #1</a></li>
    <li><a href = "https://www.chess.com/forum/view/general/chessboard-sound-files">Sounds #2</a></li>
    <li><a href = "https://www.transparenttextures.com/">Board Effect</a></li>
    <li><a href = "https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">King Icon</a></li>
</ul>
<hr>
<h5 align="center"><a href="mailto:berkaykayaforbusiness@outlook.com">berkaykayaforbusiness@outlook.com</a></h5>
