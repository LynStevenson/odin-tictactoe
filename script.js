const Gameboard = function(){
	let gameboard = Array(9).fill("_");
	//placement functions return true if piece is placed, otherwise returns false
	function playX (pos){
		if (gameboard[pos] === "_"){
			gameboard[pos] = "X";
			return true;
		} else {
			return false;
		}
	}
	function playO (pos){
		if (gameboard[pos] === "_"){
			gameboard[pos] = "O";
			return true;
		} else {
			return false;
		}
	}
	function clear(){
		gameboard = gameboard.fill("_");
	}
	function filled(){
		if (gameboard.indexOf("_") === -1){
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
	function getBoard(){
		return gameboard.slice(0,3).toString() + "\n" + gameboard.slice(3,6) + "\n" + gameboard.slice(6,9);0
	}
	function getPieceAt(index){
		return gameboard[index];
	}
	return {
		playO,
		playX,
		clear,
		filled,
		status,
		getBoard,
		getPieceAt
	};
}();

const Player = function(name){
	this.score = 0;
	this.name = name;
}

const Game = function(){
	let turn = "X"; //player1 is X
	function getTurn(){
		return turn;
	}
	function newGame(){
		Gameboard.clear();
		turn = "X";
	}
	function consoleGameLoop(player1, player2){
		if (player1 === undefined || player2 === undefined){
			return;
		}
		newGame();
		while(!Gameboard.filled() && Gameboard.status() === 0){
			if (turn === "X"){
				console.log("X's turn");
				console.log(Gameboard.getBoard());
				while(!Gameboard.playX(prompt("Where will you place an X?")));
				turn = "O";
			} else if (turn === "O"){
				console.log("O's turn");
				console.log(Gameboard.getBoard());
				while(!Gameboard.playO(prompt("Where will you place an O?")));
				turn = "X";
			}
		}
		console.log(Gameboard.getBoard());
		if (Gameboard.status() === -1){
			console.log(player1.name + " wins!");
			player1.score++;
		} else if (Gameboard.status() === 1){
			console.log(player2.name + " wins!");
			player2.score++;
		} else {
			console.log("Its a tie!");
		}
	}
	function playPiece(index){
		if (turn === "X"){
			if (Gameboard.playX(index)){
				turn = "O";
			}
		} else if (turn === "O"){
			if (Gameboard.playO(index)){
				turn = "X";
			}
		}
	}
	return {
		consoleGameLoop,
		getTurn,
		playPiece,
		newGame
	};
}()

//lots of janky code. will clean up later

jack = new Player("Jack");
sarah = new Player("Sarah");

let board = document.querySelector("table");
let cells = document.querySelectorAll("td");
let player1out = document.querySelector("#player1");
let player2out = document.querySelector("#player2");
player1out.textContent = jack.score;
player2out.textContent = sarah.score;
for (let i = 0; i < 9; i++){
	cells[i].addEventListener("click", function(){
		Game.playPiece(i);
		cells[i].textContent = Gameboard.getPieceAt(i);
		if (Gameboard.filled() || Gameboard.status() !== 0){
			if (Gameboard.status() === -1){
				jack.score++;//will fix jank later
			} else if (Gameboard.status() === 1){
				sarah.score++;
			} else {
				
			}
			player1out.textContent = jack.score;
			player2out.textContent = sarah.score;
			board.addEventListener("click", function(e){
				e.stopPropagation();
			}, {capture: true});
		}
	})
}

let newGameButton = document.querySelector("button");
newGameButton.addEventListener("click", function(){
	Game.newGame();
	for (let i = 0; i < 9; i++){
		cells[i].textContent = Gameboard.getPieceAt(i);
	}
})