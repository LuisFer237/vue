export const getProductImageAction = (imageName: string): string => {
  return imageName.includes('http')
    ? imageName
    : `${import.meta.env.VITE_TESLO_APLI_URL}/files/product/${imageName}`;
};
