const fs = require("node:fs");
const path = require(("path"))

/**
 * Method return stats information about file
 * @param pathToInst - path to file
 * @return {Promise<unknown>}
 */
function fsStat (pathToInst) {
    return new Promise((resolve, reject) => {
        fs.stat(pathToInst, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                path             : pathToInst,
                isFile           : stats.isFile(),
                createDateTime   : stats.birthtime,
                modifyDateTime   : stats.mtime,
                lastOpenDateTime : stats.atime,
            })
        });
    })
}

/**
 * Method for create new path
 * @param path - new path
 * @param options - option for create file
 * @return {Promise<unknown>}
 */
function fsMkdir(path, options) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, options, (err, path) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(path)
        })
    })
}

/**
 * Method returns whether the file exists or not
 * @param path - path to file
 * @return {Promise<unknown>}
 */
function fsExist(path) {
    return new Promise((resolve) => {
        fs.exists(path, (exists) => {
            resolve(exists);
        })
    })
}

/**
 * Method for rename file. This method can also move the file to another path.
 * @param oldPath - old path
 * @param netPath - new path
 * @return {Promise<unknown>}
 */
function fsRename(oldPath, netPath ) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, netPath ,(err) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(true);
        })
    })
}

/**
 * Method for copy file
 * @param pathFrom - path from
 * @param pathTo   - path to
 * @return {Promise<unknown>}
 */
function fsCopy(pathFrom, pathTo) {
    return new Promise((resolve, reject) => {
        fs.copyFile(pathFrom, pathTo,(err) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(true);
        })
    })
}

/**
 * Method for give mode for file/directory
 * @param path - dir/file path
 * @param mode - settable mode
 * @return {Promise<unknown>}
 */
function fsChmod(path, mode) {
    return new Promise((resolve, reject) => {
        fs.chmod(path, mode, (err) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(true)
        })
    })
}

/**
 * Method return all files and directories in current path
 * @param pathDir - explored path file
 * @return {Promise<unknown>}
 */
async function readPath(pathDir) {
    return new Promise( (resolve, reject) => {
        fs.readdir(pathDir, async (err, files) => {
            if (err) {
                reject(err)
                return;
            }

            files = files.filter(file => file !== '.DS_Store');
            let result = [];
            for(let file of files) {
                if(file !== '.DS_Store') {
                    const filePath = path.join(pathDir, file);
                    result.push(await fsStat(filePath))
                }
            }
            resolve(result);
        });
    })
}

module.exports = {
    fsMkdir,
    fsExist,
    fsRename,
    fsChmod,
    readPath,
    fsCopy
}