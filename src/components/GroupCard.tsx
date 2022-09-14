import { Box, Text } from '@chakra-ui/react'
import getGroup from '@lib/groups/getGroup'
import { Prisma } from '@prisma/client'

interface GroupCardProps {
  group?: GroupWithMembers
  setGroup?: (id: string) => void
}
type GroupWithMembers = Prisma.PromiseReturnType<typeof getGroup>

export default function GroupCard({ group, setGroup }: GroupCardProps) {
  return (
    <Box
      cursor="pointer"
      onClick={() => (group && setGroup ? setGroup(group.id) : null)}
      p={4}
      borderRadius="md"
      bg="white"
      boxShadow="md"
    >
      <Text>{group?.name ?? 'No Group'}</Text>
    </Box>
  )
}
