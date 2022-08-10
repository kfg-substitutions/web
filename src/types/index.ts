/* Component Prop Interfaces */
export interface LoginProps {
  email: string;
  password: string;
}

export interface DashboardProps {
  todaySubstitutions: Substitution[];
  tomorrowSubstitutions: Substitution[];
  error?: string;
}

export interface HeaderProps {
  logout: () => void;
}

export interface SubstitutionModalProps {
  substitution?: Substitution;
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

/* Complex Data Structure Interfaces */
export interface Substitution {
  id?: number;
  substitutor: string;
  substituted: string;
  hour: string;
  class: string;
  subject: string;
  room: string;
  note?: string;
}

export type Day = "today" | "tomorrow";
