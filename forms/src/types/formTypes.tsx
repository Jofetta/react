export type FormFields = {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  password2?: string;
  gender?: string;
  acceptTC?: boolean;
  image: string | null;
};

export type FormData = {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  password2?: string;
  gender?: string;
  acceptTC?: boolean;
  image: unknown;
};
