import { QuestionnaireResponse } from "@/types/questionnaire";

const STORAGE_KEY = "questionnaire_responses";

export function getResponses(): QuestionnaireResponse[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveResponse(response: QuestionnaireResponse): void {
  const responses = getResponses();
  responses.push(response);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
}

export function updateResponse(id: string, updates: Partial<QuestionnaireResponse>): void {
  const responses = getResponses();
  const idx = responses.findIndex((r) => r.id === id);
  if (idx !== -1) {
    responses[idx] = { ...responses[idx], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  }
}

export function deleteResponse(id: string): void {
  const responses = getResponses().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
}
