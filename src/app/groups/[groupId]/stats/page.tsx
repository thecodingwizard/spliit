import { cached } from '@/app/cached-functions'
import { Totals } from '@/app/groups/[groupId]/stats/totals'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getGroupExpenses } from '@/lib/api'
import { getTotalGroupSpending } from '@/lib/totals'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GroupHeader from '../group-header'

export const metadata: Metadata = {
  title: 'Totals',
}

export default async function TotalsPage({
  params: { groupId },
}: {
  params: { groupId: string }
}) {
  const group = await cached.getGroup(groupId)
  if (!group) notFound()

  const expenses = await getGroupExpenses(groupId)
  const totalGroupSpendings = getTotalGroupSpending(expenses)

  return (
    <>
      <GroupHeader group={group} />
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Totals</CardTitle>
          <CardDescription>
            Spending summary of the entire group.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Totals
            group={group}
            expenses={expenses}
            totalGroupSpendings={totalGroupSpendings}
          />
        </CardContent>
      </Card>
    </>
  )
}
