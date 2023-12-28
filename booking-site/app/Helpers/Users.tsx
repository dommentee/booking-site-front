export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  userId: string;
}

export const checkAdminRole = (user: User) => {
  return user && user.role;
};
