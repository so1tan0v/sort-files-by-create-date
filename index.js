const path = require('path');
const {formatDate, simpleUuid, fsStat, getPathByDate} = require("./src/app.helper");
const {fsExist, fsMkdir, fsRename, fsChmod, readPath} = require("./src/fs.hepler");

const fromPath = process.env.FROM_PATH ?? 'source';
const toPath = process.env.TO_PATH ?? 'result';
const lang = process.env.LANG ?? 'ru';

async function sortFilesByCreateDateTime(pathDir, toPath){
    const currentDir = await readPath(pathDir);
    if(currentDir.length === 0)
        return;

    for(let item of currentDir) {
        if(!item.isFile) {
            await sortFilesByCreateDateTime(item.path, toPath);
        } else {
            const createDateTime = new Date(item.createDateTime);
            const newPathPrefix = getPathByDate(createDateTime, lang);

            const parsedPath = path.parse(item.path);
            let fileName = `${formatDate(item.createDateTime)}-${simpleUuid(5)}${parsedPath.ext}`

            const newPath = path.join(toPath, newPathPrefix);
            const newPathWithFileName = path.join(newPath,fileName);
            if(!(await fsExist(newPath)))
                await fsMkdir(newPath, {recursive: true, mode: 0o777});

            await fsRename(item.path, newPathWithFileName).catch((e) => {
                console.error(e)
            });
            await fsChmod(newPathWithFileName, 0o777).catch((e) => {
                console.error(e)
            });
        }
    }
}

(async () => {
    console.log(await sortFilesByCreateDateTime(fromPath, toPath));
})();