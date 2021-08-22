import { DataResolver } from './types/DataResolver';
import { UserProfile } from '@vue-storefront/core/modules/user/types/UserProfile'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import { processLocalizedURLAddress } from '@vue-storefront/core/helpers'
import config from 'config'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';

const resetPassword = async (email: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(getApiEndpointUrl(config.users, 'resetPassword_endpoint')),
    payload: {
      method: 'POST',
      body: JSON.stringify({ email })
    }
  })

const createPassword = async (email: string, newPassword: string, resetToken: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(config.users.createPassword_endpoint),
    payload: {
      method: 'POST',
      body: JSON.stringify({ email, newPassword, resetToken })
    }
  })

const login = async (username: string, password: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(getApiEndpointUrl(config.users, 'login_endpoint')),
    payload: {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }
  })

const register = async (customer: DataResolver.Customer, password: string): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(getApiEndpointUrl(config.users, 'create_endpoint')),
    payload: {
      method: 'POST',
      body: JSON.stringify({ customer, password })
    }
  })

const updateProfile = async (userProfile: UserProfile, actionName: string): Promise<any> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(getApiEndpointUrl(config.users, 'me_endpoint')),
    payload: {
      method: 'POST',
      body: JSON.stringify(userProfile)
    },
    callback_event: `store:${actionName}`
  })

const getProfile = async () =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(getApiEndpointUrl(config.users, 'me_endpoint'))
  })

const getOrdersHistory = async (pageSize = 20, currentPage = 1): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(
      getApiEndpointUrl(config.users, 'history_endpoint').replace('{{pageSize}}', pageSize + '').replace('{{currentPage}}', currentPage + '')
    )
  })

const changePassword = async (passwordData: DataResolver.PasswordData): Promise<Task> =>
  TaskQueue.execute({
    url: processLocalizedURLAddress(getApiEndpointUrl(config.users, 'changePassword_endpoint')),
    payload: {
      method: 'POST',
      body: JSON.stringify(passwordData)
    }
  })

const refreshToken = async (refreshToken: string): Promise<string> =>
  fetch(processLocalizedURLAddress(getApiEndpointUrl(config.users, 'refresh_endpoint')), {
    method: 'POST',
    body: JSON.stringify({ refreshToken })
  }).then(resp => resp.json())
    .then(resp => resp.result)

export const UserService: DataResolver.UserService = {
  resetPassword,
  createPassword,
  login,
  register,
  updateProfile,
  getProfile,
  getOrdersHistory,
  changePassword,
  refreshToken
}
