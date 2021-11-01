let columnsCount = getColumnsCount();
let rowsCount = getRowsCount();
let cells = getCells();
let foodCoords;

function getCells() {
    return [...document.querySelectorAll('.field__cell')];
}

function collision(elemSelector_1, elemSelector_2, callback) {
    getElemsFieldCoords(elemSelector_1).forEach(coords => {
       if (isArraysEqual(coords, getElemFieldCoords(elemSelector_2))) {
           callback();
       }
    });
}

//Получает количество цифр выбирая из большего количества ячеек между столбцами и строками поля
function getBiggestLineNums() {
    if (columnsCount > rowsCount) return String(columnsCount).length
    return rowsCount;
}

function getColumnsCount() {
    return Number(getComputedStyle($root).getPropertyValue('--columns'));
}

function getRowsCount() {
    return Number(getComputedStyle($root).getPropertyValue('--rows'));
}

function getElemCell(elemSelector) {
    return document.querySelector(elemSelector).parentNode;
}

function getElemCells(elemSelector) {
    let result = [];

    document.querySelectorAll(elemSelector).forEach(elem => {
        result.push(elem.parentNode);
    });

    return result;
}

function getElemFieldCoords(elemSelector) {
    let result = [];
    let elemCell = getElemCell(elemSelector);
    let columnNumClassRegex = 'field__cell_column-.*';
    let biggestLineNums = getBiggestLineNums();

    for (let i = 0; i < 2; i++) {
        let classNameLength = columnNumClassRegex.length;
        let substrIndex = elemCell.className.search(columnNumClassRegex);

        result.push(Number(elemCell.className.substr(substrIndex + classNameLength - biggestLineNums, biggestLineNums)));
        columnNumClassRegex = 'field__cell_row-.*';
    }

    return result;
}

function getElemsFieldCoords(elemSelector) {
    let result = [];
    let elemCells = getElemCells(elemSelector);
    let biggestLineNums = getBiggestLineNums();

    elemCells.forEach(elem => {
        let elemCoords = [];
        //Получаем координаты столбца
        let columnNumClassRegex = 'field__cell_column-.*';
        let classNameLength = columnNumClassRegex.length;
        let substrIndex = elem.className.search(columnNumClassRegex);

        elemCoords.push(Number(elem.className.substr(substrIndex + classNameLength - biggestLineNums, biggestLineNums)));
        //Получаем координаты строки
        columnNumClassRegex = 'field__cell_row-.*';
        classNameLength = columnNumClassRegex.length;
        substrIndex = elem.className.search(columnNumClassRegex);

        elemCoords.push(Number(elem.className.substr(substrIndex + classNameLength - biggestLineNums, biggestLineNums)));

        result.push(elemCoords);
    });

    return result;
}

function getElemFieldLines(elemSelector) {
    let result = [];
    let elemFieldCoords = getElemFieldCoords(elemSelector);

    result.push([...document.querySelectorAll('.field__cell_column-' + elemFieldCoords[0])]);
    result.push([...document.querySelectorAll('.field__cell_row-' + elemFieldCoords[1])]);

    return result;
}
