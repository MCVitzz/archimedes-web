import database from '@utils/database'

export default async function getGroup(id: string) {
  return await database.group.findFirst({
    where: { id },
    include: { members: true },
  })
}
