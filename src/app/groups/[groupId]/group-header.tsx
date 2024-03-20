import { Group } from '@prisma/client'
import Link from 'next/link'
import { Suspense } from 'react'
import { GroupTabs } from './group-tabs'
import { ShareButton } from './share-button'

export default function GroupHeader({ group }: { group: Group }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
      <h1 className="font-bold text-2xl">
        <Link href={`/groups/${group.id}`}>{group.name}</Link>
      </h1>

      <div className="flex gap-2 justify-between">
        <Suspense>
          <GroupTabs groupId={group.id} />
        </Suspense>
        <ShareButton group={group} />
      </div>
    </div>
  )
}
