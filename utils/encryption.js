import cryptoJs from "crypto-js";
import { ethers } from "ethers"

export const encrypt = (data, publicKey) => {
  return cryptoJs.AES.encrypt(data, publicKey).toString()
}

export const decrypt = (cipherText, publicKey) => {
  let bytes = cryptoJs.AES.decrypt(cipherText, publicKey)
  return bytes.toString(cryptoJs.enc.Utf8)
}

export const getPublicKey = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const _signer = await provider.getSigner();

  const message = 'NFTCerts Signature'
  const signedMessage = await _signer.signMessage(message)

  const messageHash = ethers.utils.hashMessage(message)
  const messageHashBytes = ethers.utils.arrayify(messageHash)

  return ethers.utils.recoverPublicKey(messageHashBytes, signedMessage)
}

export const getAddressFromPublicKey = (publicKey) => {
  return ethers.utils.computeAddress(ethers.utils.arrayify(publicKey))
}
