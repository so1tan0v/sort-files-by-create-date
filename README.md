ENG
--------------
This application is designed to move files from chaotic locations in folders into a single standard: YYYY/MMMM/DD/<file_name>

Accepted parameters in .env:
* FROM_PATH - Path where the files will be taken from
* TO_PATH - Path where to put files
* LANG - Language for the created folder with the name of the month. Accepts only RU and EN values

**The application does not require installation of any libraries**

### Creating a standard .env file
``` bash
npm run prepare
```

### Launch
``` bash
npm run start
```

RU
-------------
Это приложение предназначено для того, чтобы перемесить файлы с хаотичного местоположения в папках в единый стандарт: YYYY/MMMM/DD/<file_name>

Принимаемые параметры в .env:
* FROM_PATH - Путь, откуда буду браться файлы
* TO_PATH - Путь, куда положить файлы
* LANG - Язык для создаваемой папки с наименованияем месяца. Принимает значение только RU и EN

**Приложение не требует установки каких либо библиотек**

### Создание стандартного .env файла
``` bash
npm run prepare
```

### Запуск
``` bash
npm run start
```
