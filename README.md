# TASK 1

1. Створіть новий командний репозиторій на [github.com](http://github.com), оберіть `.gitignore` (node).
2. Додайте до нього у колаборатори усіх студентів вашої групи.
3. Додайте захист на гілку `main` "Require a pull request before merging" і увімкніть опцію "Automatically delete head branches".
4. Склонуйте його собі на локальний комп'ютер.
5. Створіть свою гілку із гілки `main` та продовжуйте в ній виконувати це завдання.
6. Виконайте стартові налаштування вашого проєкту:

   - Створіть `package.json` файл за допомогою команди `npm init -y`. Додайте до нього властивість `"type": "module"`.
   - Встановіть npm пакет `eslint` командою `npm init @eslint/config@latest` та в файлі налаштувань `eslint.config.js` вкажіть наступний вміст:

     ```javascript
     import globals from "globals";
     import pluginJs from "@eslint/js";

     export default [
       pluginJs.configs.recommended,
       {
         files: ["src/**/*.js"],
         languageOptions: { globals: globals.node },
         rules: {
           semi: "error",
           "no-unused-vars": "off",
           "no-undef": "error",
         },
       },
     ];
     ```

   - В корні проєкту створіть файл `.prettierrc` з наступним вмістом:

     ```json
     {
       "semi": true,
       "singleQuote": true,
       "trailingComma": "all",
       "printWidth": 80
     }
     ```

   - Переконайтесь, що в файлі `.gitignore` в виключеннях є папка `/node_modules`.
   - Встановіть пакет `@faker-js/faker` для генерації мокових даних за допомогою команди `npm i -D @faker-js/faker`.

7. Створіть в проєкті структуру згідно наданого прикладу ![Структура проєкту](/assets/project-structure.png)

   [Посилання на приклад](https://monosnap.com/file/5MH4bAm4ChZG2PFmFguAohge2LOedv).

8. В файлі `src/constants/products.js` оголосіть змінну `PATH_DB`. Ініціалізуйте її значенням, яке буде зберігати шлях до файлу `src/db/db.json`.
9. В файл `createFakeProduct.js` додайте наступний вміст:

   ```javascript
   import { faker } from "@faker-js/faker";

   export const createFakeProduct = () => ({
     name: faker.commerce.productName(),
     price: faker.commerce.price(),
     category: faker.commerce.department(),
     description: faker.commerce.productDescription(),
   });
   ```

# TASK 2

1. Створіть файл `src/scripts/generateProducts.js`.
2. В ньому опишіть функцію `generateProducts`. Вона має за допомогою функції `createFakeProduct`, створювати передану кількість згенерованих продуктів, а потім додавати їх до масиву у файлі `src/db/db.json` і записувати їх назад до файлу `src/db/db.json`.
3. Додайте до файлу `package.json` скрипт `generate` для виконання коду з файлу `src/scripts/generateProducts.js`.
4. Виконавши скрипт `generate`, переконайтесь, що ваша функція `generateProducts` коректно додає нові продукти до вже існуючих, а не перезаписує весь файл. Тобто, якщо масив був порожній, після виклику функції в ньому має бути передана кількість продуктів, наприклад 7. Якщо продуктів було 4 і у виклик передали 7, то після виклику функції їх має стати 11. У файлі `src/db/db.json` мають відбутися відповідні зміни.

# TASK 3

1. Створіть файл `src/scripts/addOneProduct.js`.
2. В ньому опишіть функцію `addOneProduct`. Вона має додавати до масиву у файлі `src/db/db.json` лише один згенерований продукт. Забезпечте правильне додавання одного продукту до масиву і збереження змін у файлі.
3. Додайте до файлу `package.json` скрипт `add-one` для виконання коду з файлу `src/scripts/addOneProduct.js`.
4. Виконавши скрипт `add-one`, переконайтесь, що ваша функція `addOneProduct` коректно додає один продукт до вже існуючих, а не перезаписує весь файл. У файлі `src/db/db.json` мають відбутися відповідні зміни.

# TASK 4

1. Створіть файл `src/scripts/getAllProducts.js`.
2. В ньому опишіть функцію `getAllProducts`. Вона має повертати масив продуктів із файлу `src/db/db.json`. Функція має коректно читати масив продуктів з файлу. Додайте в цьому файлі логування результату виклику функції `getAllProducts`.
3. Додайте до файлу `package.json` скрипт `get-all` для виконання коду з файлу `src/scripts/getAllProducts.js`.
4. Виконавши скрипт `get-all`, переконайтесь, що ваша функція `getAllProducts` працює коректно.

# TASK 5

1. Створіть файл `src/scripts/countProducts.js`.
2. В ньому опишіть функцію `countProducts`. Вона має повертати кількість продуктів в масиві у файлі `src/db/db.json`.
3. Додайте до файлу `package.json` скрипт `count` для виконання коду з файлу `src/scripts/countProducts.js`.
4. Виконавши скрипт `count`, переконайтесь, що ваша функція `countProducts` коректно рахує кількість продуктів з масиву файла.

# TASK 6

1. Створіть файл `src/scripts/clearProducts.js`.
2. В ньому опишіть функцію `clearProducts`. Вона має видаляти усі продукти з масиву у файлі `src/db/db.json`.
3. Додайте до файлу `package.json` скрипт `clear` для виконання коду з файлу `src/scripts/clearProducts.js`.
4. Виконавши скрипт `clear`, переконайтесь, що ваша функція `clearProducts` коректно очищає усі продукти з масиву файла. У файлі `src/db/db.json` мають відбутися відповідні зміни.

# TASK 7

1. Створіть файл `src/scripts/removeRandomProduct.js`.
2. В ньому опишіть функцію `removeRandomProduct`. Вона має видалити один випадковий продукт з масиву у файлі `src/db/db.json`.
3. Додайте до файлу `package.json` скрипт `remove-random` для виконання коду з файлу `src/scripts/removeRandomProduct.js`.
4. Виконавши скрипт `remove-random`, переконайтесь, що ваша функція `removeRandomProduct` коректно працює.
