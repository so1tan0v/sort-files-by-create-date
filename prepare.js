const {fsCopy} = require("./src/fs.hepler");

fsCopy('.example.env', '.env').catch((e) => {
    console.error(e)
}).then(() => {
    console.log('.env successfully created');
});
