import { Flex } from '@chakra-ui/react'
import getGroup from '@lib/groups/getGroup'
import { Prisma } from '@prisma/client'
import GroupCard from './GroupCard'

interface GroupsProps {
  groups: GroupWithMembers[]
  setGroup(id: string): void
}
type GroupWithMembers = Prisma.PromiseReturnType<typeof getGroup>

export default function Groups({ groups, setGroup }: GroupsProps) {
  return (
    <Flex gap={8} px={32} py={4} w="full">
      {groups.map((group, i) => (
        <GroupCard key={i} group={group} setGroup={setGroup} />
      ))}
    </Flex>
  )
}
