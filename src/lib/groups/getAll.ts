import database from '@utils/database'

export default async function getAllGroups() {
  return await database.group.findMany({ include: { members: true } })
}
