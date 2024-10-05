const Gameboard = function(){
	let gameboard = Array(9).fill("\xa0");
	//placement functions return true if piece is placed, otherwise returns false
	function playX (pos){
		if (gameboard[pos] === "\xa0"){
			gameboard[pos] = "X";
			return true;
		} else {
			return false;
		}
	}
	function playO (pos){
		if (gameboard[pos] === "\xa0"){
			gameboard[pos] = "O";
			return true;
		} else {
			return false;
		}
	}
	function clear(){
		gameboard = gameboard.fill("\xa0");
	}
	function filled(){
		if (gameboard.indexOf("\xa0") === -1){
			return true;
		} else {
			return false;
		}
	}
	function getBoard(){
		return gameboard.slice(0,3).toString() + "\n" + gameboard.slice(3,6) + "\n" + gameboard.slice(6,9);
	}
	function getPieceAt(index){
		return gameboard[index];
	}
	return {
		playO,
		playX,
		clear,
		filled,
		getBoard,
		getPieceAt
	};
}();

const Player = function(name){
	this.score = 0;
	this.name = name;
}

const Game = function(){
	//player1 is X
	let turn = "X";
	function getTurn(){
		return turn;
	}
	function newGame(){
		Gameboard.clear();
	}
	const Gamestates = Object.freeze({
			Xwin: "Xwin",
			OWin: "Owin",
			tie: "tie",
			ongoing: "ongoing"
		});
	function state(){
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
				pieces.push(Gameboard.getPieceAt([pos]));
			}
			pieces = pieces.join("");
			if (pieces === "OOO"){
				return Gamestates.OWin;
			} else if (pieces === "XXX") {
				return Gamestates.Xwin;
			}
		}
		if (Gameboard.filled()){
			return Gamestates.tie;
		}
		return Gamestates.ongoing;
	}
	function consoleGameLoop(player1, player2){
		if (player1 === undefined || player2 === undefined){
			return;
		}
		newGame();
		while(state() === Gamestates.ongoing){
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
		if (state() === Gamestates.Xwin){
			console.log(player1.name + " wins!");
			player1.score++;
		} else if (state() === Gamestates.OWin){
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
				return true;
			}
		} else if (turn === "O"){
			if (Gameboard.playO(index)){
				turn = "X";
				return true;
			}
		}
		return false;
	}
	return {
		consoleGameLoop,
		getTurn,
		playPiece,
		newGame,
		state,
		Gamestates
	};
}()

let modal = document.querySelector("dialog");
modal.showModal();

let player1 = new Player("Player1");
let player2 = new Player("Player2");

let modalForm = document.querySelector("dialog form");
modalForm.addEventListener("submit", function(){
	player1Name = document.querySelector("#player1Input");
	player2Name = document.querySelector("#player2Input");
	player1.name = player1Name.value;
	player2.name = player2Name.value;
	document.querySelector("#player1Label").textContent = player1.name + ":";
	document.querySelector("#player2Label").textContent = player2.name + ":";
	msg.textContent = "It is " + player1.name + "'s turn";
})

let board = document.querySelector("table");
let cells = document.querySelectorAll("td");
let msg = document.querySelector(".msg");
let player1out = document.querySelector("#player1");
let player2out = document.querySelector("#player2");
player1out.textContent = player1.score;
player2out.textContent = player2.score;

const disableClick = function(e){
	e.stopPropagation();
}

for (let i = 0; i < 9; i++){
	cells[i].addEventListener("click", function(){
		Game.playPiece(i);
		cells[i].textContent = Gameboard.getPieceAt(i);
		if (Game.state() !== Game.Gamestates.ongoing){
			if (Game.state() === Game.Gamestates.Xwin){
				player1.score++;
				msg.textContent = player1.name + " won the game!";
			} else if (Game.state() === Game.Gamestates.OWin){
				player2.score++;
				msg.textContent = player2.name + " won the game!";
			} else {
				msg.textContent = "It is a tie!";
			}
			player1out.textContent = player1.score;
			player2out.textContent = player2.score;
			board.addEventListener("click", disableClick, {capture: true});
		} else {
			if (Game.getTurn() === "X"){
				msg.textContent = "It is " + player1.name + "'s turn";
			} else {
				msg.textContent = "It is " + player2.name + "'s turn";
			}
		}
	})
}

let newGameButton = document.querySelector(".newGame");
newGameButton.addEventListener("click", function(){
	Game.newGame();
	for (let i = 0; i < 9; i++){
		cells[i].textContent = Gameboard.getPieceAt(i);
	}
	board.removeEventListener("click", disableClick, {capture: true});
	if (Game.getTurn() === "X"){
		msg.textContent = "It is " + player1.name + "'s turn";
	} else {
		msg.textContent = "It is " + player2.name + "'s turn";
	}
})