import getAllGroups from '@lib/groups/getAll'
import { Group } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Group[]>,
) {
  try {
    const groups = await getAllGroups()
    res.status(200).json(groups)
  } catch {
    return res.status(404)
  }
}
