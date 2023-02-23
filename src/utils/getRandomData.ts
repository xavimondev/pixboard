import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'

export const getRandomUser = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName()
  }
}

export const getRandomAvatar = () => faker.image.avatar()
export const getRandomColor = () => faker.color.rgb({ format: 'css' })
export const getBoardId = () => nanoid(5)
