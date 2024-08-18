export type FormFields = {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  password2?: string;
  gender?: string;
  acceptTC?: boolean;
  image: string | null;
  country?: string;
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
  country?: string;
};
