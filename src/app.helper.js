const path = require("node:path");

const monthMapRu = {
    0:  "Январь",
    1:  "Февраль",
    2:  "Март",
    3:  "Апрель",
    4:  "Май",
    5:  "Июнь",
    6:  "Июль",
    7:  "Август",
    8:  "Сентябрь",
    9:  "Октябрь",
    10: "Ноябрь",
    11: "Декабрь",
}

const mouthMapEn = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
}

/**
 * Method for format date to UTC
 * @param date - date instance
 * @return {string}
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
}

/**
 * Method return shuffle of string
 * @param str - sting to shuffle
 * @param count - count chars
 * @return {string}
 */
function getRandomChars(str, count) {
    let randomChars = '';
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * str.length);
        randomChars += str[randomIndex];
    }
    return randomChars;
}

/**
 * Method return UUID
 * @param count - count chars
 * @return {string}
 */
function simpleUuid(count = 5) {
    const chars = '123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    return getRandomChars(chars, count);
}

/**
 * Method return path by date (YYYY/MMMM/DD)
 * @param dateInt - date instance
 * @param lang - language
 * @return {string}
 */
function getPathByDate(dateInt, lang = 'ru') {
    const year = dateInt.getFullYear();
    const month = (lang === 'ru'
            ? monthMapRu[dateInt.getMonth()]
            : mouthMapEn[dateInt.getMonth()]);
    const date = dateInt.getDate();

    return path.join(String(year), String(month), String(date))
}

module.exports = {
    formatDate,
    simpleUuid,
    getPathByDate
}