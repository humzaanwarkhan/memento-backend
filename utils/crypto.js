import CryptoJS from "crypto-js";

export const encrypt = text => {
  if (!text) return text;
  return CryptoJS.AES.encrypt(text, process.env.JWT_SECRET).toString();
};

export const decrypt = cipher => {
  if (!cipher) return cipher;
  return CryptoJS.AES.decrypt(cipher, process.env.JWT_SECRET)
    .toString(CryptoJS.enc.Utf8);
};
