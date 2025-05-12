export type UserType = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  is_admin: 'False' | 'True';
};

export type TokenType = {
  access: string;
  refresh: string;
};

export type RegisterUserType = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  re_password: string;
  preferred_contact: 'email' | 'phone';
  is_admin: 'False' | 'True';
};

export type ChangePasswordType = {
  current_password: string;
  new_password: string;
  re_new_password: string;
};
