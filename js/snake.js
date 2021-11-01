let headSelector = '.snake-head';
let head = document.querySelector(headSelector);
let body = [];
let speed = 130;
let lastAction;
let lastKey;

let foodCollision = () => {
    collision('.food', '.snake-head', () => {
        head.closest('.field__cell').querySelector('.food').remove();
        body.push('O');
    });
}

function thisLastKey(key) {
    if (lastKey === key) {
        return true;
    } else {
        lastKey = key;
    }
}

function moveUp() {
    if (thisLastKey(87)) return;
    if (lastAction !== undefined) clearInterval(lastAction);

    let elemColumn = getElemFieldLines(headSelector)[0];
    let currentHeadRowCoords = getElemFieldCoords(headSelector)[1] - 1;
    let move = () => {
        if (currentHeadRowCoords === -1) {
            currentHeadRowCoords = elemColumn.length - 1;
        }
        elemColumn[currentHeadRowCoords--].appendChild(head);
        foodCollision();
    }

    head.style.transform = 'rotate(180deg)';
    move();

    lastAction = setInterval(() => {
        move();
    }, speed);
}

function moveDown() {
    if (thisLastKey(83)) return;
    if (lastAction !== undefined) clearInterval(lastAction);

    let elemColumn = getElemFieldLines(headSelector)[0];
    let currentHeadRowCoords = getElemFieldCoords(headSelector)[1] - 1;
    let move = () => {
        if (currentHeadRowCoords === elemColumn.length) {
            currentHeadRowCoords = 0;
        }
        elemColumn[currentHeadRowCoords++].appendChild(head);
        foodCollision();
    }

    head.style.transform = 'rotate(0deg)';
    move();

    lastAction = setInterval(() => {
        move();
    }, speed);
}

function moveLeft() {
    if (thisLastKey(65)) return;
    if (lastAction !== undefined) clearInterval(lastAction);

    let elemRow = getElemFieldLines(headSelector)[1];
    let currentHeadColumnCoords = getElemFieldCoords(headSelector)[0] - 1;
    let move = () => {
        if (currentHeadColumnCoords === -1) {
            currentHeadColumnCoords = elemRow.length - 1;
        }
        elemRow[currentHeadColumnCoords--].appendChild(head);
        foodCollision();
    }

    head.style.transform = 'rotate(90deg)';
    move();

    lastAction = setInterval(() => {
        move();
    }, speed);
}

function moveRight() {
    if (thisLastKey(68)) return;
    if (lastAction !== undefined) clearInterval(lastAction);

    let elemRow = getElemFieldLines(headSelector)[1];
    let currentHeadColumnCoords = getElemFieldCoords(headSelector)[0] - 1;
    let move = () => {
        if (currentHeadColumnCoords === elemRow.length) {
            currentHeadColumnCoords = 0;
        }
        elemRow[currentHeadColumnCoords++].appendChild(head);
        foodCollision();
    }

    head.style.transform = 'rotate(-90deg)';
    move();

    lastAction = setInterval(() => {
        move();
    }, speed);
}

window.onkeydown = (e) => {

    switch (e.keyCode) {
        case 87:
            moveUp();
            break;
        case 83:
            moveDown();
            break;
        case 65:
            moveLeft();
            break;
        case 68:
            moveRight();
            break;
    }
}

