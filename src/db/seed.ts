import dayjs from 'dayjs'
import { client, db } from './index'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Deixar de ser lixo',
        desiredWeeklyFrequency: 1,
        createdAt: new Date(),
      },
      {
        title: 'Deixar de ser Nub',
        desiredWeeklyFrequency: 4,
        createdAt: new Date(),
      },
      {
        title: 'Deixar de ser Porcaria',
        desiredWeeklyFrequency: 6,
        createdAt: new Date(),
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
    {
      goalId: result[2].id,
      createdAt: startOfWeek.add(2, 'day').toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})
