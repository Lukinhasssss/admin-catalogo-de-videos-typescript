import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
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
    })
  })

  describe('methods', () => {
    it('should change name', () => {
      const category = Category.create({
        name: 'Movie'
      })

      category.changeName('Music')

      expect(category.name).toBe('Music')
    })

    it('should change description', () => {
      const category = Category.create({
        name: 'Movie'
      })

      category.changeDescription('Music description')

      expect(category.description).toBe('Music description')
    })

    it('should activate', () => {
      const category = Category.create({
        name: 'Movie',
        isActive: false
      })

      category.activate()

      expect(category.isActive).toBeTruthy()
    })

    it('should deactivate', () => {
      const category = Category.create({
        name: 'Movie'
      })

      category.deactivate()

      expect(category.isActive).toBeFalsy()
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
