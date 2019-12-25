import { DataResolver } from './types/DataResolver';
import { UserProfile } from '@vue-storefront/core/modules/user/types/UserProfile'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import { processLocalizedURLAddress } from '@vue-storefront/core/helpers'
import config from 'config'

const headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

const resetPassword = async (email: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(config.users.resetPassword_endpoint),
    payload: {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify({ email })
    }
  })

const login = async (username: string, password: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(config.users.login_endpoint),
    payload: {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify({ username, password })
    }
  })

const register = async (customer: DataResolver.Customer, password: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(config.users.create_endpoint),
    payload: {
      method: 'POST',
      headers,
      body: JSON.stringify({ customer, password })
    }
  })

const updateProfile = async (userProfile: UserProfile, actionName: string): Promise<any> =>
  TaskQueue.queue({
    url: processLocalizedURLAddress(config.users.me_endpoint),
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(userProfile)
    },
    callback_event: `store:${actionName}`
  })

const getProfile = async () =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(config.users.me_endpoint),
    payload: {
      method: 'GET',
      mode: 'cors',
      headers
    }
  })

const getOrdersHistory = async (pageSize = 20, currentPage = 1): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(
      config.users.history_endpoint.replace('{{pageSize}}', pageSize).replace('{{currentPage}}', currentPage)
    ),
    payload: {
      method: 'GET',
      mode: 'cors',
      headers
    }
  })

const changePassword = async (passwordData: DataResolver.PasswordData): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(config.users.changePassword_endpoint),
    payload: {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordData)
    }
  })

const refreshToken = async (refreshToken: string): Promise<string> =>
  fetch(processLocalizedURLAddress(config.users.refresh_endpoint), {
    method: 'POST',
    mode: 'cors',
    headers,
    body: JSON.stringify({ refreshToken })
  }).then(resp => resp.json())
    .then(resp => resp.result)

export const UserService: DataResolver.UserService = {
  resetPassword,
  login,
  register,
  updateProfile,
  getProfile,
  getOrdersHistory,
  changePassword,
  refreshToken
}
