let boxes = document.querySelectorAll(".box"); // targets box
let reset = document.getElementById("reset"); // target reset btn
let msg = document.querySelector("#msg"); // target msg id
let newbutton = document.querySelector('#new'); // target new id
let msgcontainer = document.querySelector('.message'); // target message class
let player = document.querySelector('.player');
let container = document.querySelector('.container');
let turnO = true; // player X-false; player O-true

// defines multiple array 
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// loop to target each array 
// clicks each boxes 
boxes.forEach((box) => {
    //hovering  X and O
    box.addEventListener("mouseenter", () => {
        if (box.innerText === "") {
            box.classList.add("preview");
            box.dataset.preview = turnO ? "O" : "X";
        }
    });

    box.addEventListener("mouseleave", () => {
        box.classList.remove("preview");
        delete box.dataset.preview;
    });
    // for clicking
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            box.classList.remove("preview");
            delete box.dataset.preview;

            turnO = !turnO;//changes the boolean value
            //now it is turnO becomes false

            player.innerHTML = `Turn ${turnO ? "O" : "X"}`;/*turnO here is 
             not false it is true in the second round it will be 
             taken as false and the cycle goes on*/
            //same goes for click

            box.disabled = true;
            checkwinner();
        }
    });


});
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("preview");
        delete box.dataset.preview;
    }
};


// argument is received here
const showwinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    container.classList.remove('hidden');

}

// loop to select each index of array 
const checkwinner = () => {
    var win = false;
    for (const pattern of winPatterns) {
        let post1 = boxes[pattern[0]].innerText;
        let post2 = boxes[pattern[1]].innerText;
        let post3 = boxes[pattern[2]].innerText;
        if (post1 !== "" && post2 !== "" && post3 !== "") { // not equal to empty box
            // all three box to be equal
            if (post1 === post2 && post2 === post3) {
                showwinner(post1); // argument defined here
                win = true;
            }
        }
    }
    if (!win) {
        const allBoxes = [...boxes].every((box) => box.innerText !== "");
        if (allBoxes) {
            msgcontainer.classList.remove('hide');
            container.classList.remove('hidden');
            msg.innerText = 'Match Drawn';
        }
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add('hide');
    container.classList.add('hidden');
}

newbutton.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);