import database from '@utils/database'

export default async function getAllMembers() {
  return await database.member.findMany()
}
