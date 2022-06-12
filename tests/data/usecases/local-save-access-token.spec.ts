import { SetStorage } from '@data/protocols'
import { LocalSaveAccessToken } from '@data/usecases'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('LocalSaveAccessToken', () => {
  let sut: LocalSaveAccessToken
  const setStorageSpy = mock<SetStorage>()

  beforeEach(() => {
    sut = new LocalSaveAccessToken(setStorageSpy)
  })

  it('should call SetStorage with correct value', async () => {
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)

    expect(setStorageSpy.set).toBeCalledWith('accessToken', accessToken)
  })
})
