let $root = document.querySelector(':root');

function isArraysEqual(array_1, array_2) {
    if (array_1.length !== array_2.length) return false;

    for (let i = 0; i < array_1.length; i++) {
        if (array_1[i] !== array_2[i]) return false;
    }

    return true;
}
