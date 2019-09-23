# UserService

## Methods

#### `resetPassword: (email: string) => Promise<Task>`

It resets the user password by given `email`.

#### `login: (username: string, password: string) => Promise<Task>`

It try to login user by given `username` and `password`

#### `register: (customer: DataResolver.Customer, pssword: string) => Promise<Task>`

Registering the new user by given user data (`customer`) and `password`.

#### `updateProfile: (userProfile: UserProfile) => Promise<Task>`

It updates the the current logged user profile (`userProfile`).

#### `getProfile: () => Promise<Task>`

It fetches the current logged user profile.

#### `getOrdersHistory: () => Promise<Task>`

It fetches order history by current logged user.

#### `changePassword: (passwordData: PasswordData) => Promise<Task>`

It changes the password for current logged user.

#### `refreshToken: (refreshToken: string) => Promise<string>`

It refreshes the token for current user session by given `refreshToken`.
