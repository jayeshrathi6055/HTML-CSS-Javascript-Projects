console.log('Tic Tac Toe Project');

// Grab all boxes
const boxes = document.getElementsByClassName('box');

// Styling in boxes
boxes[0].style.borderTop = "none";
boxes[0].style.borderLeft = "none";
boxes[1].style.borderTop = "none";
boxes[2].style.borderTop = "none";
boxes[2].style.borderRight = "none";
boxes[3].style.borderLeft = "none";
boxes[5].style.borderRight = "none";
boxes[6].style.borderBottom = "none";
boxes[6].style.borderLeft = "none";
boxes[7].style.borderBottom = "none";
boxes[8].style.borderBottom = "none";
boxes[8].style.borderRight = "none";

let count = 0;
// Click Event for 'X' and 'O'
let chance = 'X';
for (let i of boxes) {
    i.addEventListener('click', (e) => {
        if (chance == 'X' && i.innerText == "") {
            e.target.innerText = "X";
            chance = 'O';
            count++;
        } else if (chance == 'O' && i.innerText == "") {
            e.target.innerText = 'O';
            chance = 'X';
            count++;
        }

        if (check('sameCol1')) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
        } else if (check('sameCol2')) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
        } else if (check('sameCol3')) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
        } else if (check('sameRow1')) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
        } else if (check('sameRow2')) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
        } else if (check('sameRow3')) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
        } else if (check('diagonal1')) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
        } else if (check('diagonal2')) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
        }

        if (count == 9) {
            for (const iterator of button) {
                iterator.style.display = 'block';
            }
            count = 0;
        }
    });
}

// Score count
let score1 = 0;
let score2 = 0;

// Check single line contain same Text
function check(classParameter) {
    let same = document.getElementsByClassName(classParameter);
    let i = same[0].innerText;
    let j = same[1].innerText;
    let k = same[2].innerText;
    let x = 'X';
    let o = 'O';
    if ((i == x && j == x && k == x) || (i == o && j == o && k == o)) {
        if (i == 'X') {
            score1++;
            document.getElementById('win1').innerText = score1;
            document.getElementById('win3').innerText = score1;
        } else {
            score2++;
            document.getElementById('win2').innerText = score2;
            document.getElementById('win4').innerText = score2;
        }
        same[0].style.fontSize = "70px";
        same[1].style.fontSize = "70px";
        same[2].style.fontSize = "70px";
        chance = '';
        count = 0;
        return true;
    }
    return false;
}

// Play again button
let button = document.querySelectorAll('button');
for (const iterator of button) {
    iterator.style.display = 'none';
}
for (let iterator of button) {
    iterator.addEventListener('click', () => {
        for (let iterator of boxes) {
            iterator.innerText = "";
            iterator.style.fontSize = '30px';
            chance = 'X';
        }
            iterator.style.display = 'none';
    })
}