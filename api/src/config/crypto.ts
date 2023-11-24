export const cryptoConfig = {
  algorithm: process.env.CRYPTO_ALGORITHM as string,
  type: process.env.CRYPTO_TYPE as BufferEncoding,
  secret: process.env.CRYPTO_SECRET as string,
  initialization: process.env.CRYPTO_INITIALIZATION as string,
}
