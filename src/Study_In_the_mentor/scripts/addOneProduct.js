import * as fs from 'node:fs/promises';
import { PATH_DB } from '../constants/products.js';

export const addOneProduct = async () => {
  let currentProducts;
  try {
    const data = await fs.readFile(PATH_DB, 'utf-8');
    console.log('data:', data);
    currentProducts = data ? JSON.parse(data) : [];
    console.log('current:', currentProducts);
  } catch (error) {
    console.error(error);
  }
};
