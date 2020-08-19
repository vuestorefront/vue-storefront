import { useUserFactory } from '../../src/factories';
import { getShared } from './../../src/utils';

const factoryParams = {
  loadUser: jest.fn(() => null),
  logOut: jest.fn(),
  updateUser: jest.fn(),
  register: jest.fn(),
  logIn: jest.fn(),
  changePassword: jest.fn(),
  refreshUser: jest.fn()
};

const { useUser, setUser } = useUserFactory(factoryParams);
const useUserMethods = useUser();

describe('[CORE - factories] useUserFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initial setup', () => {
    it('should have proper initial properties', () => {
      const { useUser } = useUserFactory(factoryParams);
      const { user, isAuthenticated } = useUser();

      expect(user.value).toEqual(null);
      expect(isAuthenticated.value).toEqual(false);
    });

    it('isAuthenticated returns true for logged in user', async () => {
      const { isAuthenticated } = useUserMethods;
      const userToLogin = { username: 'John', password: '123456'};
      factoryParams.logIn.mockReturnValueOnce(
        userToLogin
      );
      await useUserMethods.login(userToLogin);
      expect(isAuthenticated.value).toBe(true);
    });

    it('set given user property', () => {
      setUser({ username: 'test' });
      expect(getShared).toHaveBeenCalled();
    });
  });
  describe('methods', () => {
    describe('updateUser', () => {
      it('return updated user data', async () => {
        const paramsToUpdate = { name: 'Test'};
        factoryParams.updateUser.mockReturnValueOnce(paramsToUpdate);
        await useUserMethods.updateUser(paramsToUpdate);
        expect(useUserMethods.user.value).toEqual(paramsToUpdate);
      });

      it('throws error', async () => {
        factoryParams.updateUser.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserMethods.updateUser('' as any)).rejects.toThrow('Error');
      });

      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('register', () => {
      it('return registered user', async () => {
        const userToRegister = { email: 'John', password: '123456', firstName: 'Diego', lastName: 'Ramirez'};
        factoryParams.register.mockReturnValueOnce(userToRegister);
        await useUserMethods.register(userToRegister);
        expect(useUserMethods.user.value).toEqual(userToRegister);
      });
      it('throws error', async () => {
        factoryParams.register.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserMethods.register('' as any)).rejects.toThrow('Error');
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('login', () => {
      it('return logged user', async () => {
        const userToLogin = { username: 'John', password: '123456'};
        factoryParams.logIn.mockReturnValueOnce(
          userToLogin
        );
        await useUserMethods.login(userToLogin);
        expect(useUserMethods.user.value).toEqual(userToLogin);
      });
      it('throws error', async () => {
        factoryParams.logIn.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserMethods.login('' as any)).rejects.toThrow('Error');
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('logout', () => {
      it('return logout user', async () => {
        factoryParams.logOut.mockReturnValueOnce(null);
        await useUserMethods.logout();
        expect(factoryParams.logOut).toHaveBeenCalled();
      });
      it('throws error', async () => {
        factoryParams.logOut.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserMethods.logout()).rejects.toThrow('Error');
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('refreshUser', () => {
      it('return refreshed user', async () => {
        const user = {firstName: 'John', lastName: 'Galt'};
        factoryParams.loadUser.mockReturnValueOnce(user);
        await useUserMethods.refreshUser();
        expect(factoryParams.loadUser).toHaveBeenCalled();
        expect(useUserMethods.user.value).toEqual(user);
      });
      it('throws error', async () => {
        factoryParams.loadUser.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserMethods.refreshUser()).rejects.toThrow('Error');
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
    describe('changePassword', () => {
      it('return logout user', async () => {
        const changePasswordData = {currentUser: {email: 'tonny@dot.com', password: '123456'}, currentPassword: '123456', newPassword: '654321'};
        factoryParams.changePassword.mockReturnValueOnce(changePasswordData);
        await useUserMethods.changePassword(changePasswordData.currentPassword, changePasswordData.newPassword);
        expect(useUserMethods.user.value).toEqual(changePasswordData);
      });
      it('throws error', async () => {
        factoryParams.changePassword.mockImplementationOnce(() => {
          throw 'Error';
        });
        await expect(useUserMethods.changePassword(null as any, null as any)).rejects.toThrow('Error');
      });
      it('finally loading go to false', () => {
        expect(useUserMethods.loading.value).toBe(false);
      });
    });
  });
});
