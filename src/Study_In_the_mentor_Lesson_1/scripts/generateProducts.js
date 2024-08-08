import * as fs from 'node:fs/promises';
//?fs - файлова система нод промісес.
import { createFakeProduct } from '../utils/createFakeProduct.js';
//?Фейкові контакти.
import { PATH_DB } from '../constants/products.js';
//?Імпортуємо пас який написаний заздалегідь.

export const generateProducts = async (number) => {
  try {
    let products;
    try {
      const rawData = await fs.readFile(PATH_DB, 'utf-8');
      console.log('gg', rawData);
      //?В консолі робимо перевірку щоб зрозуміти що знаходиться в rawData.
      products = rawData ? JSON.parse(rawData) : [];
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    for (let i = 0; i < number; i++) {
      products.push(createFakeProduct());
    }
    await fs.writeFile(PATH_DB, JSON.stringify(products, null, 2), 'utf-8');
    console.log(`Number is: ${number}`);
  } catch (error) {
    console.error(error);
  }
};

generateProducts(3);
