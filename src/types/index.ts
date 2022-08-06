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
  substitution?: Substitution;
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

/* Complex Data Structure Interfaces */
export interface Substitution {
  substitutor: string;
  substituted: string;
  hour: string;
  class: string;
  subject: string;
  room: string;
  note?: string;
}
