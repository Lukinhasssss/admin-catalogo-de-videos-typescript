import { isEqual } from "lodash"

export abstract class ValueObject {
  public equals(vo: this): boolean {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false
    }

    return isEqual(vo, this)
  }
}

// export class ValueObject<T> {
//   public readonly value: T
//   constructor(value: T) {
//     this.value = value
//   }
//
//   public equals(vo: ValueObject<T>): boolean {
//     return this.value === vo.value
//   }
// }
