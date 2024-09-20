const Gameboard = function(){
	let gameboard = Array(9).fill(null);
	//placement functions return true if piece is placed, otherwise returns false
	function playX (pos){
		if (gameboard[pos] === null){
			gameboard[pos] = "X";
			return true;
		} else {
			return false;
		}
	}
	function playO (pos){
		if (gameboard[pos] === null){
			gameboard[pos] = "O";
			return true;
		} else {
			return false;
		}
	}
	function clear(){
		gameboard = gameboard.fill(null);
	}
	function filled(){
		if (gameboard.indexOf(null) === -1){
			return true;
		} else {
			return false;
		}
	}
	function status(){ //returns -1 if X has a winning condition, 0 for neither, 1 if O has a winning condition
		const lines = [
			"012",
			"345",
			"678",
			"036",
			"147",
			"258",
			"048",
			"246"
		];
		for (let line of lines){
			const positions = line.split("");
			let pieces = [];
			for (let pos of positions){
				pieces.push(gameboard[pos]);
			}
			pieces = pieces.join("");
			if (pieces === "OOO"){
				return 1;
			} else if (pieces === "XXX") {
				return -1;
			}
		}
		return 0;
	}
	return {
		playO,
		playX,
		clear,
		filled,
		status
	};
}();

const Game = function(){
	const Player = function(name){
		this.score = 0;
		this.name = name;
	}
	let turn = "X"; //player1 is X
	function newGame(player1name, player2name){
		let player1 = new Player(player1name);
		let player2 = new Player(player2name);
		Gameboard.clear();
		turn = "X";
		while(!Gameboard.filled() && Gameboard.status() === 0){
			if (turn === "X"){
				
			}
		}
	}
	function gameLoop(player1, player2){

	}
}