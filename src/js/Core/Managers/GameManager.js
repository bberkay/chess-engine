class GameManager{
    /**
     * @static
     * Is Current Player Checked ?
     * @param {int} square_id Is square(square_id) checked?
     * @returns {boolean}
     */
    static isCheck(square_id = null) {
        /**
         * Set Operation that connected to Path
         * @param {string} current_path_direction
         * @param {(function|JSON)} operations
         * @example Find dangerous enemies to the current path direction
         * @return {any}
         */
        function getPathConnection(current_path_direction, ...operations) {
            // If operations is json(if operations length is 1, the type is json) then return bottom-right, top-left, ..., etc. squares
            // If operations is not json then return dangerous enemies
            let func_operation_control = operations.length > 1;
            // If path is top-left, bottom-right ...
            // then dangerous enemies are queen and bishop(if operations is functions)
            // then return top-left and bottom-right or top-right and bottom-left of squares that came from operations(if operations is json)
            if (current_path_direction === Route.TopLeft || current_path_direction === Route.BottomRight)
                return func_operation_control ? operations[0]() : operations[0][Route.TopLeft].concat(operations[0][Route.BottomRight]);
            else if (current_path_direction === Route.TopRight || current_path_direction === Route.BottomLeft)
                return func_operation_control ? operations[0]() : operations[0][Route.TopRight].concat(operations[0][Route.BottomLeft]);
            // If path is left, right ...
            // then dangerous enemies are queen and rook(if operations is functions)
            // then return left and right or top and bottom of squares that came from operations(if operations is json)
            else if (current_path_direction === Route.Left || current_path_direction === Route.Right)
                return func_operation_control ? operations[1]() : operations[0][Route.Left].concat(operations[0][Route.Right]);
            else if (current_path_direction === Route.Top || current_path_direction === Route.Bottom)
                return func_operation_control ? operations[1]() : operations[0][Route.Top].concat(operations[0][Route.Bottom]);
        }
        
        // Array<int>
        let dangerous_squares = [];
        
        // Temp variables to undo changes on the board
        let temp_king_square_id;
        let temp_player_king;
        let temp_player_piece;
        let change_status = false;
        let player_king = Storage.get(Global.getCurrentMove() + "-king"); 

        // If square_id is not null then control target id for check
        if(square_id){
            temp_king_square_id = Storage.get(Global.getCurrentMove() + "-king").getSquareId();
            temp_player_king = player_king;
            temp_player_piece = BoardManager.getPieceBySquareId(square_id);
            Global.setSquare(player_king.getSquareId(), 0);
            Global.setSquare(square_id, temp_player_king);
            change_status = true;
        }

        square_id = player_king.getSquareId();
        const enemy_color = Global.getEnemyColor();

        // Control for Enemy Bishop, Queen, Rook
        const diagonal_row_column_path = PathEngine.calcQueenPath(square_id); // Get all path
        let l = 0;
        for (let i in diagonal_row_column_path) {
            l = diagonal_row_column_path[i].length;
            for (let j = 0; j < l; j++) {
                let enemy_types = [];
                // Set enemy types by path(example, if i is bottom-left then control bishop, at the bottom-left and top-right)
                enemy_types = getPathConnection(i,
                    () => enemy_types.concat(enemy_types.includes(PieceType.Queen) ? [PieceType.Bishop] : [PieceType.Queen, PieceType.Bishop]),
                    () => enemy_types.concat(enemy_types.includes(PieceType.Queen) ? [PieceType.Rook] : [PieceType.Queen, PieceType.Rook]))
                // If current square has an any dangerous enemy then player's "checked" and return true or dangerous squares
                let res = BoardManager.isSquareHasPiece(diagonal_row_column_path[i][j], enemy_color, enemy_types);
                if (res)
                    dangerous_squares = getPathConnection(i, diagonal_row_column_path);
            }
        }

        // Control for Enemy Knight
        const knight_control = PathEngine.calcKnightPath(square_id);
        l = knight_control.length;
        for (let i = 0; i < l; i++) {
            if (BoardManager.isSquareHasPiece(knight_control[i], enemy_color, [PieceType.Knight]))
                dangerous_squares = dangerous_squares.concat(knight_control);
        }

        if(change_status){
            Global.setSquare(square_id, temp_player_piece);
            Global.setSquare(temp_king_square_id, temp_player_king);
        }

        return dangerous_squares.length !== 0;
    }

    /**
     * @static
     * Is current player can long castling?
     * @returns {boolean}
     */
    static isLongCastlingAvailable(){
        if(Global.getCastling(Global.getCurrentMove() + "-" + CastlingType.Long) == false)
            return false;         
               
        // Find long rook square_id by player's color
        let long_rook = Global.getCurrentMove() == Color.White ? 57 : 1;

        // If between long rook and king is not empty or long rook is color not equal player's color or long rook is type not rook then return false
        if(Global.getSquare(long_rook + 1) != 0 || Global.getSquare(long_rook + 2) != 0 || Global.getSquare(long_rook + 3) != 0 || Global.getSquare(long_rook).color != Global.getCurrentMove() || Global.getSquare(long_rook).type != PieceType.Rook)
            return false;

        // Control check status of every squares between long rook and king
        if(this.isCheck() || this.isCheck(long_rook + 1) || this.isCheck(long_rook + 2) || this.isCheck(long_rook + 3))
            return false;

        return true;
    }

    /**
     * @static
     * Is current player can short castling?
     * @returns {boolean}
     */
    static isShortCastlingAvailable(){
        if(Global.getCastling(Global.getCurrentMove() + "-" + CastlingType.Short) == false)
            return false;

        // Find short rook square_id by player's color
        let short_rook = Global.getCurrentMove() == Color.White ? 64 : 8;

        // If between short rook and king is not empty or short rook is color not equal player's color or short rook is type not rook then return false
        if(Global.getSquare(short_rook - 1) != 0 || Global.getSquare(short_rook - 2) != 0 || Global.getSquare(short_rook).color != Global.getCurrentMove() || Global.getSquare(short_rook).type != PieceType.Rook)
            return false;
        
        // Control check status of every squares between short rook and king
        if(this.isCheck() || this.isCheck(short_rook - 1) || this.isCheck(short_rook - 2))
            return false;

        return true;
    }

    /**
     * @static
     * Can current player's(or selected pawn) pawn do left en passant?
     * @param {int} square_id Square Id of pawn
     * @param {EnPassantDirection} direction Direction of en passant
     * @returns {boolean}
     */
    static canPawnEnPassant(square_id, direction){
        const BLACK_EN_PASSANT_ROW = 5;
        const WHITE_EN_PASSANT_ROW = 4;
        const WHITE_START_ROW = 7;
        const BLACK_START_ROW = 2;

        let piece = BoardManager.getPieceBySquareId(square_id);
        let currentRow = Calculator.calcRowOfSquare(square_id);
        let targetRow = (piece.color === Color.White) ? WHITE_EN_PASSANT_ROW : BLACK_EN_PASSANT_ROW;

        if (currentRow === targetRow) {
            let targetEnemy = BoardManager.getPieceBySquareId(direction === EnPassantDirection.Left ? square_id - 1 : square_id + 1);

            if (targetEnemy.type === PieceType.Pawn && targetEnemy.moveCount === 1)
                return true;

        }else if(currentRow < targetRow){
            let targetSquare = 0;

            if(piece.color == Color.White)
                targetSquare = square_id - ((currentRow - BLACK_START_ROW) * 8 + (direction == EnPassantDirection.Left ? 1 : -1));
            else
                targetSquare = square_id + ((WHITE_START_ROW - currentRow) * 8 + (direction == EnPassantDirection.Left ? -1 : 1));
            
            if(!BoardManager.getPieceBySquareId(targetSquare))
                Global.addDisabledEnPassant(piece.id, direction);
            
            return false;
        }

        Global.addDisabledEnPassant(piece.id, true);

        return false;
    }

    /**
     * @static
     * Can current player's(or selected pawn) pawn do left en passant?
     * @param {int} square_id Square Id of pawn
     * @returns {boolean}
     */
    static canPawnDoLeftEnPassant(square_id){
        return this.canPawnEnPassant(square_id, EnPassantDirection.Left);
    }


    /**
     * @static
     * Can current player's(or selected pawn) pawn do right en passant?
     * @param {int} square_id Square Id of pawn
     * @returns {boolean}
     */
    static canPawnDoRightEnPassant(square_id){
        return this.canPawnEnPassant(square_id, EnPassantDirection.Right);
    }

    
    /**
     * @static
     * Control castling status of every piece that can castling after move
     * @returns {void}
     */
    static controlCastlingAfterMove(){
        // Find player's king and king's square_id
        let pieces = BoardManager.getPiecesWithFilter(PieceType.Rook).concat(Storage.get("black-king"), Storage.get("white-king"));

        // Control every piece, if piece is moved then set castling status false
        pieces.forEach(piece => {
            if(piece != undefined && piece.is_moved){
                if(piece.type == PieceType.King){
                    Global.setCastling(piece.color + "-" + CastlingType.Short, false);
                    Global.setCastling(piece.color + "-" + CastlingType.Long, false);
                }else if(piece.type == PieceType.Rook){
                    if(piece.first_square_id == 1 || piece.first_square_id == 57)
                        Global.setCastling(piece.color + "-" + CastlingType.Long, false);
                    else if(piece.first_square_id == 8 || piece.first_square_id == 64)
                        Global.setCastling(piece.color + "-" + CastlingType.Short, false);
                }
            }
        });
    }
}