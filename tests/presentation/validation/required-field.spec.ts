import { RequiredFieldValidation } from '@presentation/validation/validators'
import { RequiredFieldError } from '@presentation/validation/errors'
import { faker } from '@faker-js/faker'

describe('RequiredFieldValidation', () => {
  let sut: RequiredFieldValidation
  const input = {
    field: ''
  }

  beforeEach(() => {
    sut = new RequiredFieldValidation('field')
  })

  it('should return error if field is empty', () => {
    const error = sut.validate(input)

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    input.field = faker.random.word()
    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })
})
