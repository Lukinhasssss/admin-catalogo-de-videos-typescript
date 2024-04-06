import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
  let validateSpy: any

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate')
  })

  describe('constructor', () => {
    it('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })

    it('should create a category with description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movie description'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })

    it('should create a category with all values', () => {
      const categoryId = Uuid.create()
      const createdAt = new Date()

      const category = new Category({
        categoryId,
        name: 'Movie',
        description: 'Movie description',
        isActive: false,
        createdAt
      })

      expect(category.categoryId).toBe(categoryId)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBe(createdAt)
    })
  })

  describe('create command', () => {
    it('should create a category', () => {
      const category = Category.create({
        name: 'Movie'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalled()
    })

    it('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalled()
    })

    it('should create a category with isActive', () => {
      const category = Category.create({
        name: 'Movie',
        isActive: false
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalled()
    })

    it('should create a category with all values', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Movie description',
        isActive: false
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalled()
    })
  })

  describe('methods', () => {
    it('should change name', () => {
      const category = Category.create({
        name: 'Movie'
      })

      category.changeName('Music')

      expect(category.name).toBe('Music')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })

    it('should change description', () => {
      const category = Category.create({
        name: 'Movie'
      })

      category.changeDescription('Music description')

      expect(category.description).toBe('Music description')
      expect(validateSpy).toHaveBeenCalledTimes(2)
    })

    it('should activate', () => {
      const category = Category.create({
        name: 'Movie',
        isActive: false
      })

      category.activate()

      expect(category.isActive).toBeTruthy()
      expect(validateSpy).toHaveBeenCalled()
    })

    it('should deactivate', () => {
      const category = Category.create({
        name: 'Movie'
      })

      category.deactivate()

      expect(category.isActive).toBeFalsy()
      expect(validateSpy).toHaveBeenCalled()
    })

    it('should return JSON', () => {
      const category = Category.create({
        name: 'Movie'
      })

      const json = category.toJSON()

      expect(json).toEqual({
        categoryId: category.categoryId.id,
        name: 'Movie',
        description: null,
        isActive: true,
        createdAt: category.createdAt
      })
      expect(validateSpy).toHaveBeenCalled()
    })
  })

  describe('categoryId field', () => {
    const arrange = [{ categoryId: null }, { categoryId: undefined }, { categoryId: Uuid.create() }]

    it.each(arrange)('id = %j', ({ categoryId }) => {
      const category = new Category({
        categoryId: categoryId as Uuid,
        name: 'Movie'
      })

      expect(category.categoryId).toBeInstanceOf(Uuid)

      if (categoryId instanceof Uuid) {
        expect(category.categoryId.id).toBe(categoryId.id)
      }
    })
  })
})

describe('Category Validator', () => {
  describe('create command', () => {
    it('should throw an error when name is null', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    it('should throw an error when name is empty', () => {
      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: [
          'name should not be empty'
        ]
      })
    })

    // it('should throw an error when name is not a string', () => {
    //   expect(() => Category.create({ name: 123 })).containsErrorMessages({
    //     name: [
    //       'name must be a string',
    //       'name must be shorter than or equal to 255 characters'
    //     ]
    //   })
    // })

    it('should throw an error when name is longer than 255 characters', () => {
      expect(() => Category.create({ name: 'a'.repeat(256) })).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    it('should throw an error when description is longer than 255 characters', () => {
      expect(() => Category.create({ name: 'Movie', description: 'a'.repeat(256) })).containsErrorMessages({
        description: [
          'description must be shorter than or equal to 255 characters'
        ]
      })
    })

    it('should throw an error when isActive is not a boolean', () => {
      expect(() => Category.create({ name: 'Movie', isActive: null })).containsErrorMessages({
        isActive: [
          'isActive must be a boolean'
        ]
      })
    })

    // it('should throw an error when createdAt is not a date', () => {
    //   expect(() => Category.create({ name: 'Movie', createdAt: '2021-09-01' })).containsErrorMessages({
    //     createdAt: [
    //       'createdAt must be a date'
    //     ]
    //   })
    // })
  })

  describe('changeName method', () => {
    it('should throw an error when name is null', () => {
      const category = Category.create({ name: 'Movie' })

      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    it('should throw an error when name is empty', () => {
      const category = Category.create({ name: 'Movie' })

      expect(() => category.changeName('')).containsErrorMessages({
        name: [
          'name should not be empty'
        ]
      })
    })

    // it('should throw an error when name is not a string', () => {
    //   const category = Category.create({ name: 'Movie' })

    //   expect(() => category.changeName(123)).containsErrorMessages({
    //     name: [
    //       'name must be a string',
    //       'name must be shorter than or equal to 255 characters'
    //     ]
    //   })
    // })

    it('should throw an error when name is longer than 255 characters', () => {
      const category = Category.create({ name: 'Movie' })

      expect(() => category.changeName('a'.repeat(256))).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })
  })

  describe('changeDescription method', () => {
    it('should throw an error when description is longer than 255 characters', () => {
      const category = Category.create({ name: 'Movie' })

      expect(() => category.changeDescription('a'.repeat(256))).containsErrorMessages({
        description: [
          'description must be shorter than or equal to 255 characters'
        ]
      })
    })
  })
})
