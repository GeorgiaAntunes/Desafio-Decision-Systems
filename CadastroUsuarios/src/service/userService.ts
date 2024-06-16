import { UserProps } from '../types/user';

const localStorageKey = 'users';

const userService = {
  getUsers: (): UserProps[] => {
    const usersJson = localStorage.getItem(localStorageKey);
    if (usersJson) {
      return JSON.parse(usersJson);
    }
    return [];
  },

  getUserById: (id: number): UserProps | undefined => {
    const users = userService.getUsers();
    return users.find(user => user.id === id);
  },

  createUser: (user: UserProps): void => {
    let users = userService.getUsers();
    const newUser = { ...user, id: generateUserId() }; // Assume que generateUserId() gera um novo ID único
    users = [...users, newUser];
    localStorage.setItem(localStorageKey, JSON.stringify(users));
  },

  updateUser: (id: number, updatedUser: UserProps): void => {
    let users = userService.getUsers();
    users = users.map(user => (user.id === id ? updatedUser : user));
    localStorage.setItem(localStorageKey, JSON.stringify(users));
  },

  deleteUser: (id: number): void => {
    let users = userService.getUsers();
    users = users.filter(user => user.id !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(users));
  },
};

const generateUserId = (): number => {
  const users = userService.getUsers();
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
  return maxId + 1;
};

export default userService;
