import { compare, hash } from 'bcrypt'

interface ICompareParams {
  raw: string
  hashed: string
}

export class HashStrategy {
  public static async hash(value: string) {
    return hash(value, 7)
  }

  public static async compare({ raw, hashed }: ICompareParams) {
    return compare(raw, hashed)
  }
}
