import {Color, Moves, MoveType, PieceType, Square} from "../../Types";
import {MoveRoute, Piece, Route} from "../Types";
import {BoardQueryer} from "../Board/BoardQueryer.ts";
import {Locator} from "./Utils/Locator.ts";
import {RouteCalculator} from "./Calculator/RouteCalculator.ts";
import {Extractor} from "./Utils/Extractor.ts";
import {MoveExtender} from "./Extender/MoveExtender.ts";

/**
 * This class calculates the possible moves of the pieces.
 */
export class MoveEngine extends MoveExtender{

    /**
     * Properties of the MoveEngine class.
     */
    private piece: Piece | null;
    private pieceSquare: Square | null;

    /**
     * Constructor of the MoveEngine class.
     */
    constructor() {
        super();
        this.piece = null;
        this.pieceSquare = null;
    }

    /**
     * Check the given moves. If there is no move, then return null
     * otherwise return the given moves.
     */
    private _hasAnyMove(moves: Moves | null): Moves | null
    {
        if(!moves) return null;

        // Check every move type.
        for(const moveType in moves)
        {
            if(moves[moveType as MoveType]!.length > 0)
                return moves;
        }

        return null;
    }

    /**
     * Get the possible moves of the piece on the given square.
     */
    public getMoves(square: Square): Moves | null
    {
        // Get the piece on the given square.
        this.piece = BoardQueryer.getPieceOnSquare(square);
        this.pieceSquare = square;

        // If there is no piece on the given square, return null;
        if(!this.piece) return null;

        /**
         * If there is a piece on the given square, get
         * the possible moves of the piece by its type.
         */
        switch(this.piece.getType()){
            case PieceType.Pawn:
                return this._hasAnyMove(this.getPawnMoves());
            case PieceType.Knight:
                return this._hasAnyMove(this.getKnightMoves());
            case PieceType.Bishop:
                return this._hasAnyMove(this.getBishopMoves());
            case PieceType.Rook:
                return this._hasAnyMove(this.getRookMoves());
            case PieceType.Queen:
                return this._hasAnyMove(this.getQueenMoves());
            case PieceType.King:
                return this._hasAnyMove(this.getKingMoves());
            default:
                return null;
        }
    }

    /**
     * Get the possible moves of the pawn on the given square.
     */
    private getPawnMoves(): Moves | null
    {
        // Initialize the moves of the pawn.
        let moves: Moves = {[MoveType.Normal]: [], [MoveType.EnPassant]: [], [MoveType.Promotion]: []};

        // Find possible moves of the pawn.
        const route: Route = RouteCalculator.getPawnRoute(this.pieceSquare!);
        if(!route) return null;

        /**************************************************************************
         * Filter the moves of the pawn by the pawn's color, position
         * and has enemy status of the diagonal squares(these filter operations
         * made because pawn has different move capabilities by its color and position
         * also has a special move called en passant).
         *
         * @see for more information about pawn moves https://en.wikipedia.org/wiki/Pawn_(chess)
         **************************************************************************/

            // Find the pawn's color and enemy's color by the given square.
        const color: Color = this.piece!.getColor();
        const enemyColor: Color = color === Color.White ? Color.Black : Color.White;

        /**
         * Find routes of the pawn by its color. For example,
         * if the pawn is white, we need to get the top route of the pawn.
         * if the pawn is black, we need to get the bottom route of the pawn.
         */
        const moveDirection: Record<string, MoveRoute> = color === Color.White
            ? {vertical: MoveRoute.Top, leftDiagonal: MoveRoute.TopLeft, rightDiagonal: MoveRoute.TopRight}
            : {vertical: MoveRoute.Bottom, leftDiagonal: MoveRoute.BottomLeft, rightDiagonal: MoveRoute.BottomRight};

        /**
         * Filter the route by the pawn's color. For example,
         * if the pawn is white, we need to delete the bottom route of the pawn.
         * if the pawn is black, we need to delete the top route of the pawn.
         */
        for(let path in route){
            if(path != moveDirection.vertical && path != moveDirection.leftDiagonal && path != moveDirection.rightDiagonal)
                delete route[path as MoveRoute];
        }

        /**
         * Filter second square of the vertical route by the pawn's color and row.
         *
         * If pawn is white and is not on the seventh row
         * or if pawn is black and is not on the second row,
         * then remove the second square of the vertical route.
         */
        if(Locator.getRow(this.pieceSquare!) != (color == Color.White ? 7 : 2))
            route[moveDirection.vertical]!.splice(1, 1);

        /**
         * Filter diagonal routes by the pawn's color and has enemy status.
         *
         * If the diagonal squares has no enemy piece, then remove
         * the diagonal routes from the moves.
         */
        if(!BoardQueryer.isSquareHasPiece(route[moveDirection.leftDiagonal]![0], enemyColor))
            delete route[moveDirection.leftDiagonal];

        if(!BoardQueryer.isSquareHasPiece(route[moveDirection.rightDiagonal]![0], enemyColor))
            delete route[moveDirection.rightDiagonal];

        // Add normal moves to the pawn's moves.
        moves[MoveType.Normal] = Extractor.extractSquares(this._doKingSafety(route)!);

        /**
         * Clear the pawn's routes. Because we will add en passant moves
         * to the pawn's moves. If we don't clear the pawn's routes, then
         * the pawn's moves will be duplicated for every move type. For example,
         * if the pawn has 2 normal moves, 1 en passant move and 1 promotion move,
         * then the pawn's moves will be 2 normal moves, 3 en passant moves(2 normal
         * + 1 en passant) and 4 promotion moves(2 normal + 1 en passant + 1 promotion).
         */
        for(let path in route) route[path as MoveRoute] = [];
        route[moveDirection.leftDiagonal] = [];
        route[moveDirection.rightDiagonal] = [];

        /**
         * Add en passant capability to the pawn. For example,
         * if the pawn is white and left en passant is available,
         * then add the left top square(current square id - 9) to the pawn's
         * moves. Also, if right en passant is available, then add the right
         * top square(current square id - 7) to the pawn's moves. For black
         * pawn, add the left bottom square(current square id + 7) and right
         * bottom square(current square id + 9) to the pawn's moves.
         *
         * @see for more information about square id check Square enum in src/Chess/Types/index.ts
         * @see for more information about en passant check src/Chess/Engine/Move/Extender/MoveExtender.ts
         */

            // Add left en passant move to the pawn's moves.
        const leftEnPassant: Square | null = this.getLeftEnPassantMove(this.pieceSquare!);
        if(leftEnPassant)
            route[moveDirection.leftDiagonal]!.push(leftEnPassant);

        // Add right en passant move to the pawn's moves.
        const rightEnPassant: Square | null = this.getRightEnPassantMove(this.pieceSquare!);
        if(rightEnPassant)
            route[moveDirection.rightDiagonal]!.push(rightEnPassant);

        // Add filtered(for king's safety) en passant moves to the pawn's moves.
        moves[MoveType.EnPassant] = Extractor.extractSquares(this._doKingSafety(route)!);

        /**
         * Clear the pawn's routes. Because we will add promotion moves
         * to the pawn's moves. For more information check the en passant
         * section above.
         */
        for(let path in route) route[path as MoveRoute] = [];
        route[moveDirection.vertical] = [];

        /**
         * Add promotion capability to the pawn. For example,
         * if the pawn is white and is on the seventh row,
         * then add the top square(current square id + 8) to the pawn's
         * moves. Also, if the pawn is black and is on the second row,
         * then add the bottom square(current square id - 8) to the pawn's moves.
         *
         * @see for more information about square id check Square enum in src/Chess/Types/index.ts
         * @see for more information about promotion check src/Chess/Engine/Move/Extender/MoveExtender.ts
         */

        /**
         * Delete given move from normal moves.
         */
        function deleteMoveFromNormalMoves(move: Square){
            if(moves[MoveType.Normal]!.includes(move))
                moves[MoveType.Normal]!.splice(moves[MoveType.Normal]!.indexOf(move), 1);
        }

        // Add promotion moves to the pawn's moves.
        const promotionMoves: Square[] | null = this.getPromotionMove(this.pieceSquare!);
        if(promotionMoves){
            route[moveDirection.vertical]!.push(promotionMoves[0]);

            // Delete vertical diagonal  from the normal moves.
            deleteMoveFromNormalMoves(route[moveDirection.vertical]![0]);

            // Add diagonal(capture move) promotion moves to the pawn's moves.
            if(promotionMoves[1]){
                route[moveDirection.leftDiagonal]!.push(promotionMoves[1]);

                // Delete left diagonal move from the normal moves.
                deleteMoveFromNormalMoves(route[moveDirection.leftDiagonal]![0]);
            }
            if(promotionMoves[2]){
                route[moveDirection.rightDiagonal]!.push(promotionMoves[2]);

                // Delete right diagonal move from the normal moves.
                deleteMoveFromNormalMoves(route[moveDirection.rightDiagonal]![0]);
            }
        }

        // Add filtered(for king's safety) promotion moves to the pawn's moves.
        moves[MoveType.Promotion] = Extractor.extractSquares(this._doKingSafety(route)!);

        // Return the moves of the pawn.
        return moves;
    }

    /**
     * Get the possible moves of the knight on the given square.
     */
    private getKnightMoves(): Moves | null
    {
        // Find moves of the knight.
        let route: Route = RouteCalculator.getKnightRoute(this.pieceSquare!);
        if(!route) return null;

        // Filter the moves for king safety and convert the route to squares array.
        return {[MoveType.Normal]: Extractor.extractSquares(this._doKingSafety(route)!)};
    }

    /**
     * Get the possible moves of the bishop on the given square.
     */
    private getBishopMoves(): Moves | null
    {
        // Find moves of the bishop.
        let route: Route = RouteCalculator.getBishopRoute(this.pieceSquare!);
        if(!route) return null;

        // Filter the moves for king safety and convert the route to squares array.
        return {[MoveType.Normal]: Extractor.extractSquares(this._doKingSafety(route)!)};
    }

    /**
     * Get the possible moves of the rook on the given square.
     */
    private getRookMoves(): Moves | null
    {
        // Find moves of the rook.
        let route: Route = RouteCalculator.getRookRoute(this.pieceSquare!);
        if(!route) return null;

        // Filter the moves for king safety and convert the route to squares array.
        return {[MoveType.Normal]: Extractor.extractSquares(this._doKingSafety(route)!)};
    }

    /**
     * Get the possible moves of the queen on the given square.
     */
    private getQueenMoves(): Moves | null
    {
        // Find moves of the queen.
        let route: Route = RouteCalculator.getQueenRoute(this.pieceSquare!);
        if(!route) return null;

        // Filter the moves for king safety and convert the route to squares array.
        return {[MoveType.Normal]: Extractor.extractSquares(this._doKingSafety(route)!)};
    }

    /**
     * Get the possible moves of the king on the given square.
     */
    private getKingMoves(): Moves | null
    {
        let moves: Moves = {[MoveType.Normal]: [], [MoveType.Castling]: []};

        // Get the king's route.
        let route: Route = RouteCalculator.getKingRoute(this.pieceSquare!);
        if(!route) return null;

        // Find the king's color
        const color: Color = BoardQueryer.getPieceOnSquare(this.pieceSquare!)!.getColor();

        /**
         * Remove squares that are threatened by the enemy pieces so that
         * the king can't move to the threatened squares. For example,
         * if the king is on f3 and enemy's bishop is on e6, then remove
         * g4 from the king's route because g4 is threatened by the enemy's
         * bishop currently.
         */
        for(const square of Extractor.extractSquares(route))
        {
            if(!BoardQueryer.isSquareThreatened(square, color == Color.White ? Color.Black : Color.White))
                moves[MoveType.Normal]!.push(square);
        }

        /**
         * Remove squares that are can threaten after the king's move so that
         * the king can't move to the squares that can be threatened after the
         * king's move. For example, king is on f3 and enemy's bishop is on d5.
         * Currently, g2 isn't threatened by the enemy's bishop. But king can't
         * move to the g2 because after the king's move, g2 will be threatened
         * by the enemy's bishop again. This code block prevents this situation.
         */
        const enemies: boolean | Square[] = BoardQueryer.isSquareThreatened(this.pieceSquare!, color == Color.White ? Color.Black : Color.White, true);
        for(const enemy of enemies as Square[]){
            const dangerousRoute: MoveRoute | null = Locator.getRelative(this.pieceSquare!, enemy);
            if(dangerousRoute && moves[MoveType.Normal] && route.hasOwnProperty(dangerousRoute))
                moves[MoveType.Normal].splice(moves[MoveType.Normal].indexOf(route[dangerousRoute]![0]), 1);
        }

        /**
         * Add castling moves to the king's moves. For example,
         * If the king is white, add Square.a1 to king's left route
         * and Square.h1 to king's right route. If the king is black,
         * add Square.a8 to king's left route and Square.h8 to king's
         * right route.
         *
         * @see for more information src/Chess/Engine/Move/Extender/MoveExtender.ts
         */

        /**
         * Clear the king's routes. Because we will add castling moves
         * to the king's moves. If we don't clear the king's routes,
         * then king's normal moves also will be added to the king's
         * castling moves. For example, if the king has 2 normal moves
         * and 2 castling moves, then normal moves will be [Square.x1, Square.x2],
         * castling moves will be [Square.a1, Square.h1, Square.x1, Square.x2].
         */
        for(let path in route) route[path as MoveRoute] = [];

        // Add long castling move to the king's moves.
        const longCastling: Square | null = this.getLongCastlingMove(color);
        if(longCastling)
            route[MoveRoute.Left]!.push(longCastling);

        // Add short castling move to the king's moves.
        const shortCastling: Square | null = this.getShortCastlingMove(color);
        if(shortCastling)
            route[MoveRoute.Right]!.push(shortCastling);

        // Get castling moves of the king. Also, castling doesn't need king safety filter because it is already filtered.
        moves[MoveType.Castling] = Extractor.extractSquares(route);

        return moves;
    }

    /**
     * Filter the moves of piece by the king's safety. For example,
     * if the king is in check, then remove the moves that
     * doesn't protect the king.
     *
     * Algorithm:
     * 1. Find the king's square and enemy's color by the given piece color.
     * 2. Get all the routes of the piece(diagonal, horizontal and vertical). Because
     * the king can protect by only these routes(piece can't protect king from knight
     * or pawn. Also, it can only protect from one piece at the same time).
     * 2. Find pairs of routes. For example, if route is top, then route's pair is bottom.
     * 3. Find the dangerous route for the king. For example, if the king is in bottom left
     * of the piece, then the dangerous route is top right.
     * 4. If the dangerous route has dangerous piece(example: bishop and queen for bottom left,
     * top right, etc.) then remove the moves/routes that doesn't protect the king.
     *
     * @return if Array<Square> is given, then return Array<Square>. If Path is given, then
     * return Path.
     *
     * @see src/Chess/Engine/Move/Extender/MoveExtender.ts For more information.
     */
    private _doKingSafety(moveRoute: Route): Route | null
    {
        /**
         * Find the king and king's square and enemy's color
         * by the given piece color.
         */
        const king: Piece | null = BoardQueryer.getPiecesWithFilter(this.piece!.getColor(), [PieceType.King])[0];
        if(!king) return moveRoute;

        // Square of the king and enemy's color.
        const kingSquare: Square = BoardQueryer.getSquareOfPiece(king)!;
        const enemyColor: Color = this.piece!.getColor() == Color.White ? Color.Black : Color.White;

        /**
         * Find the dangerous route for the king. For example,
         * if the king is in bottom left of the piece, then
         * the dangerous route is top right(because piece can
         * only protect king from one route at the same time).
         */
        let dangerousRoute: MoveRoute;

        /**
         * For find the dangerous route, get relative route of the piece and king.
         * Relative route is the route between piece and king.
         *
         * @see for more information about relative route src/Chess/Engine/Move/Utils/Locator.ts
         */
        const relativeRoute: MoveRoute | null = Locator.getRelative(kingSquare, this.pieceSquare!);
        if(!relativeRoute)
            // If dangerous route is null, then return the moves/routes without filtering.
            return moveRoute;

        /**
         * For find the dangerous route, get opposite route of relative route.
         *
         * @see for more information about opposite route src/Chess/Engine/Move/Utils/Locator.ts
         */
        dangerousRoute = Locator.getOpposite(relativeRoute);

        /**
         * Find the dangerous piece types by the dangerous route. For example,
         * if the dangerous route is top left, then dangerous piece types are
         * bishop and queen. If the dangerous route is top, then dangerous piece
         * types are rook and queen.
         */
        const dangerousPieces: Array<PieceType> = [MoveRoute.TopLeft, MoveRoute.TopRight, MoveRoute.BottomLeft, MoveRoute.BottomRight].includes(dangerousRoute)
            ? [PieceType.Bishop, PieceType.Queen]
            : [PieceType.Rook, PieceType.Queen];

        /**
         * Traverse the all routes(getQueenRoute() method returns all routes like
         * diagonal, horizontal and vertical routes) of the piece and find the
         * dangerous pieces by dangerous route in all routes. Then, remove the
         * routes that doesn't protect the king from the dangerous pieces.
         */
        const allRoutes: Route = RouteCalculator.getAllRoutes(this.pieceSquare!);
        for(const square of allRoutes[dangerousRoute]!){
            // If route has any dangerous piece, then(next step)
            if(BoardQueryer.isSquareHasPiece(square, enemyColor, dangerousPieces)){
                /**
                 * If moveRoute has MoveRoute.L, then it means that we are in
                 * getKnightMoves() method. In this case, knight can't
                 * attack while protecting the king. So, we can return
                 * null.
                 */
                if(moveRoute[MoveRoute.L])
                    return null;

                /**
                 * Remove the moves/routes that doesn't protect the king.
                 * For example, moveRoutes has top and bottom routes. If
                 * player's king is in top left of the piece, and enemy's
                 * queen is in bottom right of the piece, then remove
                 * top and bottom routes from the moveRoutes.
                 */
                for (const route in moveRoute) {
                    if(route != dangerousRoute && route != relativeRoute)
                        delete moveRoute[route as MoveRoute];
                }
                break;
            }
        }

        // Return the filtered moves/routes.
        return moveRoute;
    }
}












