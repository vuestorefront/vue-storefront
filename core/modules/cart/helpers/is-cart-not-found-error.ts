import Task from "core/lib/sync/types/Task";

const ERROR_MESSAGES = [
  'No such entity with cartId',

  // Magento 1 error messages
  'No quote found for cartId',
  'User is not authroized to access cartId',
  'Active Quote not found'
];

export function isCartNotFoundError(task: Task): boolean {
  if (task.code !== 404 && task.resultCode !== 404) {
    return false;
  }

  return ERROR_MESSAGES.some((errorMessage) => {
    return task.result && task.result.includes(errorMessage);
  });
}