import Task from '@vue-storefront/core/lib/sync/types/Task'

declare namespace DataResolver {
  interface DonglerBookService {
    requestBook: (email: string) => Promise<Task>
  }
}
