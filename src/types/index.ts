/* Component Prop Interfaces */
export interface DashboardProps {
  todaySubstitutions: Substitution[];
  tomorrowSubstitutions: Substitution[];
  err?: string;
}

export interface HeaderProps {
  logout: () => void;
  addSubstitution: () => void;
}

export interface SubstitutionFormProps {
  substitution?: Substitution;
  onSubmit: (substitution: Substitution) => Promise<APICallResponse>;
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

export enum Day {
  Today = "today",
  Tomorrow = "tomorrow",
}

/* API Call Interfaces */
interface ProtectedRouteProps {
  token: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface AddSubstitutionProps extends ProtectedRouteProps {
  day: Day;
  substitution: Substitution;
}

export interface EditSubstitutionProps extends ProtectedRouteProps {
  day: Day;
  id: number;
  substitution: Substitution;
}

export interface RemoveSubstitutionProps extends ProtectedRouteProps {
  day: Day;
  id: number;
}

export interface APICallResponse {
  success: boolean;
  message?: string;
  error?: string;
}
