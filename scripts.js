const EMOJIS = [
    "🌸",
    "🦊",
    "🍕",
    "🚀",
    "🎸",
    "🐳",
    "🌈",
    "🦋",
    "🍦",
    "🎯",
    "🐸",
    "🌙",
    "🔥",
    "🎨",
    "🍄",
    "🦄",
    "💎",
    "🎭"
];

let pairs = 8;
let moves = 0;
let matched = 0;
let elapsed = 0;
let timer;
let firstClick = false;

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function startTimer(){

    timer = setInterval(() => {

        elapsed++;

        document.getElementById("s-time").textContent =
            elapsed + "s";

    },1000);
}

function initGame(){

    clearInterval(timer);

    elapsed = 0;
    moves = 0;
    matched = 0;
    firstClick = false;

    document.getElementById("s-time").textContent = "0s";
    document.getElementById("s-moves").textContent = "0";
    document.getElementById("s-pairs").textContent = "0";

    const selected = EMOJIS.slice(0,pairs);

    const cards =
        shuffle([...selected,...selected]);

    const grid =
        document.getElementById("grid");

    grid.innerHTML = "";

    grid.className =
        "grid " +
        (pairs === 8
            ? "grid-4"
            : pairs === 10
            ? "grid-5"
            : "grid-6");

    cards.forEach(emoji => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.textContent = "❓";

        card.dataset.emoji = emoji;

        card.addEventListener("click",() =>
            flipCard(card));

        grid.appendChild(card);

    });

}

let flippedCards = [];

function flipCard(card){

    if(card.textContent !== "❓") return;

    if(!firstClick){

        startTimer();
        firstClick = true;

    }

    card.textContent =
        card.dataset.emoji;

    flippedCards.push(card);

    if(flippedCards.length === 2){

        moves++;

        document.getElementById("s-moves")
            .textContent = moves;

        const [a,b] =
            flippedCards;

        if(a.dataset.emoji ===
           b.dataset.emoji){

            matched++;

            document.getElementById("s-pairs")
                .textContent = matched;

            flippedCards = [];

            if(matched === pairs){

                clearInterval(timer);

                document.getElementById("msg")
                    .textContent =
                    `You won in ${elapsed}s with ${moves} moves!`;

            }

        }else{

            setTimeout(() => {

                a.textContent = "❓";
                b.textContent = "❓";

                flippedCards = [];

            },800);

        }

    }

}

document.querySelectorAll(".diff-btn")
.forEach(btn => {

    btn.addEventListener("click",() => {

        document.querySelectorAll(".diff-btn")
        .forEach(b =>
            b.classList.remove("active"));

        btn.classList.add("active");

        pairs =
            Number(btn.dataset.d);

        initGame();

    });

});

document.getElementById("restart-btn")
.addEventListener("click",initGame);

initGame();
