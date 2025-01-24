const startGameContainer = document.querySelector(".startGame"),
    startGameCards = document.querySelectorAll(".startGame .card"),
    startGame = document.querySelector(".startGame button"),
    playground = document.querySelector(".playground"),
    faRepeat = document.querySelector(".fa-repeat");

let levels = 2,
    columns = 2,
    rows = 2,
    matched = 0,
    cardOne = null,
    cardTwo = null,
    IsPreventClick = false;

// Select difficulty level
startGameCards.forEach((element) => {
    element.addEventListener("click", (e) => {
        startGameCards.forEach((el) => {
            el.classList.remove("active");
        });
        e.target.parentElement.classList.add("active");
        levels = e.target.parentElement.getAttribute("level");
        columns = e.target.parentElement.getAttribute("column");
        rows = e.target.parentElement.getAttribute("row");
    });
});

// Start the game
startGame.addEventListener("click", () => {
    startGameContainer.style.display = "none";
    playground.style.display = "grid";
    playground.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
    playground.style.gridTemplateRows = `repeat(${rows}, 100px)`;

    createCards();
    faRepeat.style.display = "block";
});

// Create and shuffle cards
function createCards() {
    const cardArr = [
        "house",
        "bomb",
        "poo",
        "gift",
        "egg",
        "dragon",
        "person-biking",
        "jet-fighter-up",
    ];
    const shuffledCards = shuffleCards([...cardArr.slice(0, levels), ...cardArr.slice(0, levels)]);
    playground.innerHTML = shuffledCards
        .map(
            (icon) => `
            <div class="card" onclick="flipCard(this)">
                <div class="front"><i class="fa-solid fa-question"></i></div>
                <div class="back"><i class="fa-solid fa-${icon}"></i></div>
            </div>
        `
        )
        .join("");
    IsPreventClick = false;
}

// Shuffle cards
function shuffleCards(cards) {
    return cards.sort(() => Math.random() - 0.5);
}

// Flip card logic
function flipCard(card) {
    // Prevent clicking if cards are already being compared or card is already matched
    if (IsPreventClick || card === cardOne || card.classList.contains("matched")) return;

    card.classList.add("flip");

    if (!cardOne) {
        cardOne = card;
    } else {
        cardTwo = card;
        IsPreventClick = true;

        const cardOneIcon = cardOne.querySelector(".back i").classList[2];
        const cardTwoIcon = cardTwo.querySelector(".back i").classList[2];

        if (cardOneIcon === cardTwoIcon) {
            // Matched cards
            cardOne.classList.add("matched");
            cardTwo.classList.add("matched");
            cardOne = null;
            cardTwo = null;
            IsPreventClick = false;
            matched++;

            if (matched === levels) {
                setTimeout(() => {
                    alert("You won!");
                    faRepeat.click();
                }, 500);
            }
        } else {
            // Unmatched cards
            setTimeout(() => {
                cardOne.classList.remove("flip");
                cardTwo.classList.remove("flip");
                cardOne = null;
                cardTwo = null;
                IsPreventClick = false;
            }, 1000); // Ensure this is set to 1000 milliseconds (1 second)
        }
    }
}


// Restart game
faRepeat.addEventListener("click", () => {
    startGameContainer.style.display = "grid";
    playground.style.display = "none";
    faRepeat.style.display = "none";

    matched = 0;
    cardOne = null;
    cardTwo = null;
    IsPreventClick = false;
    playground.innerHTML = "";
});
