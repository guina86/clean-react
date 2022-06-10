import { RequiredFieldValidation } from '@presentation/validation'
import { RequiredFieldError } from '@presentation/validation/errors'

describe('RequiredFieldValidation', () => {
  let sut: RequiredFieldValidation

  beforeEach(() => {
    sut = new RequiredFieldValidation('field')
  })

  it('should return error if field is empty', () => {
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
})
