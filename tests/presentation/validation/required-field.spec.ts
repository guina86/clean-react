import { RequiredFieldValidation } from '@presentation/validation/validators'
import { RequiredFieldError } from '@presentation/validation/errors'
import { faker } from '@faker-js/faker'

describe('RequiredFieldValidation', () => {
  let sut: RequiredFieldValidation

  beforeEach(() => {
    sut = new RequiredFieldValidation('field')
  })

  it('should return error if field is empty', () => {
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const error = sut.validate(faker.random.word())

    expect(error).toBeFalsy()
  })
})
