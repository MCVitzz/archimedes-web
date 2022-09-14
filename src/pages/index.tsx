import { RepeatIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import GroupCard from '@components/GroupCard'
import Groups from '@components/Groups'
import useApi from '@hooks/useApi'
import getAllGroups from '@lib/groups/getAll'
import getGroup from '@lib/groups/getGroup'
import { Prisma } from '@prisma/client'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

type GroupWithMembers = Prisma.PromiseReturnType<typeof getGroup>

interface HomeProps {
  groups: GroupWithMembers[]
}

export async function getServerSideProps() {
  const groups = await getAllGroups()

  return { props: { groups } }
}

const Home: NextPage<HomeProps> = ({ groups: initialGroups }) => {
  const Map = useMemo(
    () =>
      dynamic(
        () => import('@components/Map/Map'), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        },
      ),
    [
      /* list variables which should trigger a re-render here */
    ],
  )
  const [center, setCenter] = useState({ latitude: 0, longitude: 0 })
  const [group, setGroup] = useState<GroupWithMembers | undefined>(undefined)
  const [groups, setGroups] = useState(initialGroups)
  const { get, isLoading } = useApi()

  const refresh = async () => {
    const data = await get('groups/getAll')
    setGroups(data)
  }

  const changeGroup = (id: string) => {
    const group = groups.find((group) => group?.id === id)
    if (!group) {
      setGroup(undefined)
      return
    }
    const center = group?.members.reduce(
      (total, next) => ({
        latitude: total.latitude + next.latitude,
        longitude: total.longitude + next.longitude,
      }),
      { latitude: 0, longitude: 0 },
    )
    center.longitude = center?.longitude / group.members.length
    center.latitude = center?.latitude / group.members.length
    console.log(center)

    setCenter(center)
    setGroup(group)
  }

  return (
    <Box position="relative" minH="100vh">
      <Map
        markers={group?.members.map((member) => ({
          latitude: member.latitude,
          longitude: member.longitude,
        }))}
        center={center}
      />
      <Box position="absolute" bottom={0} left={0} zIndex={999}>
        <Groups groups={groups} setGroup={changeGroup} />
      </Box>
      <Box px={32} py={4} position="absolute" top={0} right={0} zIndex={999}>
        <IconButton
          icon={<RepeatIcon />}
          onClick={refresh}
          isLoading={isLoading}
          aria-label="refresh"
        />
      </Box>
      <Box px={32} py={4} position="absolute" top={0} left={0} zIndex={999}>
        <GroupCard group={group} />
      </Box>
    </Box>
  )
}

export default Home
