import { Group } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function GroupMobileHeader({
  group,
  title,
  back = `/groups/${group.id}`,
}: {
  group: Group
  title: string
  back?: string
}) {
  return (
    <div className="border-b-2 border-gray-800 -mx-4 -mt-6 relative h-12">
      <Link
        className="text-gray-400 absolute left-0 top-0 bottom-0 flex items-center justify-center p-3"
        href={back}
      >
        <ArrowLeft />
      </Link>
      <div className="text-gray-100 font-medium text-center leading-[3rem]">
        {title}
      </div>
    </div>
  )
}
