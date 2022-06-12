import { SetStorage } from '@data/protocols'
import { LocalSaveAccessToken } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('LocalSaveAccessToken', () => {
  let sut: LocalSaveAccessToken
  const setStorageSpy = mock<SetStorage>()
  const accessToken = faker.datatype.uuid()

  beforeEach(() => {
    sut = new LocalSaveAccessToken(setStorageSpy)
  })

  it('should call SetStorage with correct value', async () => {
    await sut.save(accessToken)

    expect(setStorageSpy.set).toBeCalledWith('accessToken', accessToken)
  })

  it('should throw if SetStorage throws', async () => {
    setStorageSpy.set.mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.save(accessToken)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
