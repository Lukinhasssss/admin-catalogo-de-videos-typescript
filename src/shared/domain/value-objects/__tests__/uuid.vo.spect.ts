import { InvalidUuidError, Uuid } from "../uuid.vo"
import { validate as uuidValidate } from "uuid"

describe('UUID Value Object Unit Tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

  it('should throw an error if the UUID is invalid', () => {
    expect(() => new Uuid('invalid-uuid')).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should create a UUID with default values', () => {
    const uuid = new Uuid()

    expect(uuid.id).toBeDefined()
    expect(uuidValidate(uuid.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should create a UUID with a given value', () => {
    const uuid = new Uuid('123e4567-e89b-12d3-a456-426614174000')

    expect(uuid.id).toBe('123e4567-e89b-12d3-a456-426614174000')
    expect(uuidValidate(uuid.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should return true if two UUIDs are equal', () => {
    const uuid1 = new Uuid('123e4567-e89b-12d3-a456-426614174000')
    const uuid2 = new Uuid('123e4567-e89b-12d3-a456-426614174000')

    expect(uuid1.equals(uuid2)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should return false if two UUIDs are not equal', () => {
    const uuid1 = new Uuid('123e4567-e89b-12d3-a456-426614174000')
    const uuid2 = new Uuid('123e4567-e89b-12d3-a456-426614174001')

    expect(uuid1.equals(uuid2)).toBeFalsy()
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should create a UUID using the factory method', () => {
    const uuid = Uuid.create()

    expect(uuid.id).toBeDefined()
    expect(uuidValidate(uuid.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })
})
