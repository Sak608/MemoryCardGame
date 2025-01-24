const startGameContainer = document.querySelector(".startGame"),
startGameCards = document.querySelectorAll(".startGame .card"),
startGame = document.querySelector(".startGame button"),
playground = document.querySelector(".playground"),
faRepeat = document.querySelector(".fa-repeat");

let levels = 2,
    columns = 2,
    rows = 2,
    matched = 0,
    cardOne,
    cardTwo,
    IsPreventClick = true;

startGameCards.forEach((element) => {
    element.addEventListener("click", (e) => {
        startGameCards.forEach((el) => {
            el.classList.remove("active");
        })


        e.target.parentElement.classList.add("active");
        levels = e.target.parentElement.getAttribute("level");
        columns = e.target.parentElement.getAttribute("column");
        rows = e.target.parentElement.getAttribute("row");

        console.log(levels, columns, rows);
    });
});

startGame.addEventListener("click", (e) => {
    startGameContainer.style.display = "none";
    playground.style.display = "grid";
    playground.style.gridTemplateColumns = `repeat(${columns}, 100px)`;
    playground.style.gridTemplateRows = `repeat(${rows}, 100px)`;

    createCards();
});

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
    shuffleCards([...cardArr, ...cardArr]);
}

function shuffleCards(cards) {
    playground.innerHTML = "";

    for(let i = 0; i< cards.length; i++) {
        playground.innerHTML += `
        <div class = "card">
            <div class="front"><i class="fa-solid fa-question"></i></div>
            <div class="back"><i class="fa-solid fa-${cards[i]}"></i></div>
        </div>
        `
    }
}