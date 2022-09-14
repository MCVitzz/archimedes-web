import getAllMembers from '@lib/members/getAll'
import { Member } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Member[]>,
) {
  try {
    const members = await getAllMembers()
    res.status(200).json(members)
  } catch {
    return res.status(404)
  }
}
