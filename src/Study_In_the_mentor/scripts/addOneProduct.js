import * as fs from 'node:fs/promises';
import { PATH_DB } from '../constants/products.js';
import { createFakeProduct } from '../utils/createFakeProduct.js';

export const addOneProduct = async () => {
  try {
    let currentProducts;
    try {
      const data = await fs.readFile(PATH_DB, 'utf-8');
      currentProducts = data ? JSON.parse(data) : [];
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    const oneProduct = createFakeProduct();
    currentProducts.push(oneProduct);
    await fs.writeFile(
      PATH_DB,
      JSON.stringify(currentProducts, null, 2),
      'utf-8',
    );
  } catch (error) {
    console.error(error);
  }
};

addOneProduct();
