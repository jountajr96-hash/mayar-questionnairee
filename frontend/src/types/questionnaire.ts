export interface UserIdentification {
  name: string;
  email: string;
}

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  type: "radio" | "checkbox" | "text" | "table";
  options?: QuestionOption[];
  rows?: string[];
  columns?: string[];
}

export interface QuestionSection {
  id: string;
  title: string;
  questions: Question[];
}

export interface QuestionnaireResponse {
  id: string;
  user: UserIdentification;
  answers: Record<string, string | string[]>;
  submittedAt: string;
  analysis?: string;
}
