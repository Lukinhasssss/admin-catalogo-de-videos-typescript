import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
  describe('constructor', () => {
    it('should create a category with default values', () => {
      const category = new Category({
        name: 'Movie'
      })

      expect(category.categoryId).toBeUndefined()
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })

    it('should create a category with name and description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'Movie description'
      })

      expect(category.categoryId).toBeUndefined()
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeTruthy()
      expect(category.createdAt).toBeInstanceOf(Date)
    })

    it('should create a category with all values', () => {
      const createdAt = new Date()

      const category = new Category({
        name: 'Movie',
        description: 'Movie description',
        isActive: false,
        createdAt
      })

      expect(category.categoryId).toBeUndefined()
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Movie description')
      expect(category.isActive).toBeFalsy()
      expect(category.createdAt).toBe(createdAt)
    })
  })
})
