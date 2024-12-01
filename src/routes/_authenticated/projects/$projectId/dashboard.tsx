import { createFileRoute } from '@tanstack/react-router'
import DailyNotes from '@/features/dailyNotes/components/DailyNotes'
import Todos from '@/components/Todos'

const Dashboard = () => {
  return (
    <div className="flex flex-grow">
      <DailyNotes />

      <Todos />
    </div>
  )
}

export const Route = createFileRoute(
  '/_authenticated/projects/$projectId/dashboard',
)({
  component: Dashboard,
})
