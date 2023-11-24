import { cryptoConfig } from '../../../config/crypto'
import crypto from 'node:crypto'

export class CryptoStrategy {
  static encrypt(value: string) {
    const cipher = crypto.createCipheriv(
      cryptoConfig.algorithm,
      crypto.scryptSync(cryptoConfig.secret, 'salt', 32),
      crypto.randomBytes(16),
    )

    cipher.update(value)

    return cipher.final(cryptoConfig.type)
  }
}
