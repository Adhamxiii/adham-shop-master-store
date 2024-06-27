import axios from "axios";

export const getCollections = async () => {
  const collections = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
  );

  return await collections.data;
};

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
  );
  return await collection.data;
};

export const getProducts = async () => {
  const products = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
  );

  return await products.data;
};

export const getProductDetails = async (productId: string) => {
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
  );
  return await product.data;
};

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/search/${query}`,
  );
  return await searchedProducts.data;
};

export const getOrders = async (customerId: string) => {
  const orders = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`,
  );

  return await orders.data;
};

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`,
  );
  return await relatedProducts.data;
};
