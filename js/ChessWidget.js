// ----------------------------
// Chess.com Recent Games Widget
// ----------------------------
const USERNAME = "acuteimpulse"; // Change this
const CONTAINER = document.getElementById("chess-games");

async function fetchLatestGames(username) {
  const archivesRes = await fetch(`https://api.chess.com/pub/player/${username}/games/archives`);
  const archives = await archivesRes.json();
  const latestArchiveUrl = archives.archives.pop();

  const monthRes = await fetch(latestArchiveUrl);
  const monthData = await monthRes.json();
  return monthData.games.slice(-3).reverse(); // Show last 3 games
}

function createGameCard(game, index) {
  const gameDiv = document.createElement("div");
  gameDiv.classList.add("game-card");

  const playerWhite = game.white.username;
  const playerBlack = game.black.username;
  const result =
    game.white.result === "win"
      ? `${playerWhite} won`
      : game.black.result === "win"
      ? `${playerBlack} won`
      : "Draw";

  gameDiv.innerHTML = `
    <h3>Game ${index + 1}: ${result}</h3>
    <p>${playerWhite} (White) vs ${playerBlack} (Black)</p>
    <div id="board${index}" class="chess-board"></div>
    <div class="controls">
      <button id="prev${index}">◀</button>
      
      <button id="next${index}">▶</button>
      <a href="${game.url}" target="_blank">View on Chess.com ↗</a>
    </div>
  `;

  // Append to DOM FIRST
  CONTAINER.appendChild(gameDiv);

  // Board setup AFTER appending to DOM
  const chess = new Chess();
  const moves = game.pgn
    .split(/\s+\d+\./)
    .slice(1)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(m => m && !m.includes("{"));

  const board = Chessboard(`board${index}`, { 
    position: "start",
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
  });
  let moveIndex = 0;

  document.getElementById(`next${index}`).onclick = () => {
    if (moveIndex < moves.length) {
      chess.move(moves[moveIndex]);
      board.position(chess.fen());
      moveIndex++;
    }
  };
  document.getElementById(`prev${index}`).onclick = () => {
    if (moveIndex > 0) {
      moveIndex--;
      chess.undo();
      board.position(chess.fen());
    }
  };
}

async function renderGames() {
  try {
    CONTAINER.innerHTML = "<p>Loading your recent games...</p>";
    const games = await fetchLatestGames(USERNAME);
    CONTAINER.innerHTML = "";
    games.forEach((g, i) => createGameCard(g, i));
  } catch (err) {
    console.error(err);
    CONTAINER.innerHTML = "<p>Unable to load games right now.</p>";
  }
}

renderGames();