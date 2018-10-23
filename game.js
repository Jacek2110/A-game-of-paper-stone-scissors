// Tworzenie Obiektu i przypisywanie mu wartości
const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: "",
    aiHand: "",
}

const hands = [...document.querySelectorAll('.select img')];

//Pierwsza funkcja
function handSelection() {
    // Przechwytywanie informacji z data-option
    game.playerHand = this.dataset.option;
    // Czyszczenie boxShadow na każdym elemencie (obrazku).
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px yellow';
}



// Funkcja sprawdzająca stan gry

function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return 'win';
    } else {
        return 'loss';
    }
}

// Wyświetlanie wyniku

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;

    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;

        document.querySelector('[data-summary="who-win"]').textContent = " Super wygrałeś :-)";
        document.querySelector('[data-summary="who-win"]').style.color = "green";

    } else if (result === "loss") {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;

        document.querySelector('[data-summary="who-win"]').textContent = " Wygrał komputer :-(";
        document.querySelector('[data-summary="who-win"]').style.color = "red";

    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;

        document.querySelector('[data-summary="who-win"]').textContent = " Remis :\\";
        document.querySelector('[data-summary="who-win"]').style.color = "blue";
    };
}

function endGame() {

    // Pierwszy sposób reset boxShadow
    // hands.forEach(hand => hand.style.boxShadow = '');

    // Drugi sposób reset boxShadow

    document.querySelector(`[data-option = "${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    game.aiHand = "";

}

function aiChoice() {
    // Losowanie (Wybór komputera)
    return hands[Math.floor(Math.random() * 3)].dataset.option;

}
// Funkcja sterująca

function startGame() {
    // Jeśli playerHand jest pusty "nie dokonano wyboru", wyświetl alert
    if (!game.playerHand) {
        return alert("Wybież dłoń!!!!!");
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);

    endGame();
}





hands.forEach(hand => hand.addEventListener('click', handSelection));

document.querySelector('.start').addEventListener('click', startGame);