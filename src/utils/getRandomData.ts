import { faker } from '@faker-js/faker'

export const getRandomUser = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName()
  }
}

export const getRandomAvatar = () => faker.image.avatar()
