import { cached } from '@/app/cached-functions'
import { ExpenseForm } from '@/components/expense-form'
import { createExpense, getCategories } from '@/lib/api'
import { getRuntimeFeatureFlags } from '@/lib/featureFlags'
import { expenseFormSchema } from '@/lib/schemas'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'
import GroupHeader from '../../group-header'
import GroupMobileHeader from '../../group-mobile-header'

export const metadata: Metadata = {
  title: 'Create expense',
}

export default async function ExpensePage({
  params: { groupId },
}: {
  params: { groupId: string }
}) {
  const categories = await getCategories()
  const group = await cached.getGroup(groupId)
  if (!group) notFound()

  async function createExpenseAction(values: unknown) {
    'use server'
    const expenseFormValues = expenseFormSchema.parse(values)
    await createExpense(expenseFormValues, groupId)
    redirect(`/groups/${groupId}`)
  }

  return (
    <>
      <div className="hidden sm:block">
        <GroupHeader group={group} />
      </div>
      <div className="sm:hidden">
        <GroupMobileHeader group={group} title="Create Expense" />
      </div>
      <Suspense>
        <ExpenseForm
          group={group}
          categories={categories}
          onSubmit={createExpenseAction}
          runtimeFeatureFlags={await getRuntimeFeatureFlags()}
        />
      </Suspense>
    </>
  )
}
