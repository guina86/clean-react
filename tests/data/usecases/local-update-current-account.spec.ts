import { SetStorage } from '@data/protocols'
import { LocalUpdateCurrentAccount } from '@data/usecases'
import { UnexpectedError } from '@domain/errors'
import { faker } from '@faker-js/faker'
import { mock } from 'jest-mock-extended'

describe('LocalUpdateCurrentAccountToken', () => {
  let sut: LocalUpdateCurrentAccount
  const setStorageSpy = mock<SetStorage>()
  const accessToken = faker.datatype.uuid()
  const name = faker.name.findName()
  const account = { accessToken, name }

  beforeEach(() => {
    sut = new LocalUpdateCurrentAccount(setStorageSpy)
  })

  it('should call SetStorage with correct value', async () => {
    await sut.save(account)

    expect(setStorageSpy.set).toBeCalledWith('account', JSON.stringify(account))
  })

  it('should throw if SetStorage throws', async () => {
    setStorageSpy.set.mockRejectedValueOnce(new Error('any_error'))
    const promise = sut.save(account)

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('should throw if accessToken is falsy', async () => {
    const promise = sut.save()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
