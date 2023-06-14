1. ## в сервер додав 
## -bcryptjs - хешувати дані (паролі)
## -cors - щоб бек дозволв запити з різних IP адрес
## -dotenv - для безпеки данних (.env не поститься на гіт)
## -express - для налаштування і запуску сервера
## -jsonwebtoken - розуміти чи авторизований юзер//токен шифрує
## -mongoose - для роботи з монго
## -nodemon - для автоперезапуску сервера при змінах
2. ## package.json >>> "type": "module", - для сучасного кодінгу (синтаксис імпорту, засість реквайр)
3. ## server >>> index.js - create
4. ## yarn dev-server to start server with nodemon
5. ## yarn add express-fileupload

// Client

## To create client
1. ## yarn create vite client --template react
2. ## cd ./client
2. ## npm install
3. ## npm install vite

## Add tailwind
1. ## yarn add -D tailwindcss postcss autoprefixer
2. ## yarn tailwindcss init -p
3. ## in tailvind.config add:
## content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
4. ## yarn add sass
## Rename index.css to index.scss
## And change it to this:
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    min-height: 100vh;
  }
}
5. ## add jsconfig.json from шаблон
6. ## yarn add react-router-dom
7. ## yarn add vite-jsconfig-paths
## add to vite.conf 
## import jsconfigPaths from 'vite-jsconfig-paths'
## plugins: [jsconfigPaths(), react()],
8. ## yarn add @reduxjs/toolkit react-redux
9. ## yarn add axios
10. ## yarn add react-toastify
11. ## yarn add path