/* Component Prop Interfaces */
export interface LoginProps {
  email: string;
  password: string;
}

export interface DashboardProps {
  token: string | undefined;
  logout: () => void;
}

export interface HeaderProps {
  logout: () => void;
}

export interface LoginFormProps {
  login: (token: string) => void;
}

export interface SubstitutionModalProps {
  substitution: Substitution;
}

/* Complex Data Structure Interfaces */
export interface Substitution {
  substitutor: string;
  substituted: string;
  hour: number;
  class: string;
  subject: string;
  room: string;
  note?: string;
}
