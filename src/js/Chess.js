class Chess{
    /**
     * @constructor
     */
    constructor() {
        this.board = new BoardEngine();
        this.engine = new PieceEngine();
        this.current_playable_squares = [];
        this.selected_piece = null;
        this.check_limitation = null;
    }

    /**
    * Start Game
    * @returns {void}
    */
    startGame() {
        this.board.createBoard();
        this.board.createPiecesAtStartPosition();
    }

    /**
    * Custom Game Creator For Tests
    * @param {Array<JSON>} pieces Custom Pieces
    * @example [{"color":"black", "piece":"pawn", "square":29}, {"color":"white", "piece":"queen", "square":12}]
    * @returns {void}
    */
    startCustomGame(pieces) {
        this.board.createBoard();
        pieces.forEach(item => {
            this.board.createPiece(item["color"], item["piece"], item["square"]);
        });
    }

    /**
     * Get Clicked Square
     * @param {int} square_id Square ID of the clicked square
     * @returns {void}
     */
    playPiece(square_id) {
        square_id = parseInt(square_id);

        // Is player click any piece
        let square_piece_control = GameController.isSquareHasPiece(square_id);
        let square_playable_control = this.current_playable_squares.includes(square_id);

        // If clicked square has no piece and selected_piece is null and clicked square not in playable squares then operation is "clear board"
        if(!square_piece_control && !this.selected_piece || this.current_playable_squares.length > 0 && !square_playable_control){
            this.board.refreshBoard();
            this.#unselectPiece();
        }
        else if(square_piece_control && !this.selected_piece){ // If clicked square has piece and selected_piece is null then operation is "select piece"
            this.#selectPiece(square_id);
        }
        else if(!square_piece_control && square_playable_control){ // If clicked square has no piece but is playable then move
            this.#movePiece(square_id);
            this.#controlCheck();
            this.#endTurn();
        }
        else{
            // Diğer işlemler
        }
            

        /*
        if(GameController.isSquareHasPiece(square.id)){
            piece = GameController.getPieceBySquareID(parseInt(square.id)); // get clicked piece

            // Castling Control
            if(this.current_piece == GameController.getKing({player:true}) && piece.type == "rook" && piece.color == gl_current_move){
                if(gl_castling_control[gl_current_move + "-short"] == null && square.id == 64 || square.id == 8){
                    // TODO: Kısa rok işlemleri
                }else if(gl_castling_control[gl_current_move + "-long"] == null && square.id == 57 || square.id == 1){
                    // TODO: Uzun rok işlemleri
                }
            }
            // Control Pieces and Squares for security
            this.board.refreshBoard();

            // if player is checked then can't select any piece except king
            if(gl_checked_player == gl_current_move && piece.type != "king")
                piece = null;
        }
        
        // Select Piece Control
        else {
                if(this.current_piece.type == "king"){
                    gl_castling_control[this.current_piece.color + "-long"] = false;
                    gl_castling_control[this.current_piece.color + "-short"] = false;
                }else if(this.current_piece.type == "rook"){
                    let rook_square_id = GameController.getSquareIDByPiece(this.current_piece);
                    if(rook_square_id == 64 || rook_square_id == 8)
                        gl_castling_control[this.current_piece.color + "-short"] = false;
                    else if(rook_square_id == 57 || rook_square_id == 1)
                        gl_castling_control[this.current_piece.color + "-long"] = false;
                }
        }
        */
    }

    /**
     * @private
     * Select Piece
     * @param {int} square_id
     * @returns {void}
     */
    #selectPiece(square_id){
        let piece = GameController.getPieceBySquareID(square_id);

        // Select Piece
        if(gl_current_move == piece.color){
            // If player is checked then player only select king 
            if(gl_checked_player == gl_current_move && piece.type != "king")
                this.selected_piece = null;
            else
                this.selected_piece = piece;
        }
        
        // Show Playable Squares
        if(this.selected_piece){
            this.board.refreshBoard();

            // Get playable squares of selected piece
            this.current_playable_squares = this.selected_piece.getPlayableSquaresOfPiece();   

            // Show playable squares of selected piece
            this.board.showPlayableSquares(this.current_playable_squares);
        }

    }

    /**
     * @private
     * Unselect Piece
     * @returns {void}
     */
    #unselectPiece(){
        this.selected_piece = null;
        this.current_playable_squares = [];
    }

    /**
     * @private
     * Move piece to playable square
     * @param {int} square_id
     * @returns {void}
     */
    #movePiece(square_id){
        this.board.movePieceOnBoard(this.selected_piece, square_id);
        this.#unselectPiece();
        this.board.refreshBoard();
    }

    /**
     * @private
     * Is enemy player checked after move? If checked then set gl_checked_player to enemy player
     * @returns {void}
     */
    #controlCheck(){
        const enemy_king = GameController.getKing({enemy:true});
        const enemy_king_square_id = GameController.getKingSquareID({enemy:true});

        // Set checked player and give effect the checked king
        if(this.engine.isSquareInDanger(enemy_king_square_id, gl_current_move)){
            gl_checked_player = enemy_king.color;
            this.board.setEffectOfSquareID(enemy_king_square_id, "checked");
        }
    }

    
    /**
     * @private
     * Change Current Move and Increase Move Count
     * @returns {void}
     */
    #endTurn() {
        // Clear Table and Selected Piece
        this.board.refreshBoard();
        this.current_piece = null;

        // Set New Turn 
        if(gl_current_move == "white")
            gl_current_move = "black";
        else if(gl_current_move == "black")
            gl_current_move = "white";

        // Increase Move Count
        gl_move_count++;
    }

}
