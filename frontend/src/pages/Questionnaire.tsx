import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { QuestionRenderer } from "@/components/QuestionRenderer";
import { questionnaireSections } from "@/data/questions";
import { saveResponse } from "@/lib/storage";
import { UserIdentification } from "@/types/questionnaire";
import { toast } from "sonner";
import { User, Mail, ChevronRight, ChevronLeft, Send, ClipboardList, Stethoscope } from "lucide-react";

export default function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"identify" | "questions">("identify");
  const [user, setUser] = useState<UserIdentification>({ name: "", email: "" });
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const handleIdentify = () => {
    if (!user.name.trim() || !user.email.trim()) {
      toast.error("Veuillez remplir votre nom et email.");
      return;
    }
    setStep("questions");
  };

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    try {
      const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      const response = {
        id,
        user,
        answers,
        submittedAt: new Date().toISOString(),
      };

      saveResponse(response);
      toast.success("Questionnaire soumis avec succès !");
      navigate("/merci");
    } catch (err) {
      // Show a friendly error and log for debugging
      // eslint-disable-next-line no-console
      console.error("Failed to submit questionnaire:", err);
      toast.error("Une erreur est survenue lors de la soumission. Veuillez réessayer.");
    }
  };

  const section = questionnaireSections[currentSection];
  const totalSections = questionnaireSections.length;

  if (step === "identify") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="medical-header py-6 px-6">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Stethoscope className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold font-display">Enquête Thalassémie</h1>
              <p className="text-sm opacity-90">Rôle de l'infirmier dans le suivi du patient thalassémique splénectomisé</p>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="medical-card w-full max-w-md space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <ClipboardList className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Identification</h2>
              <div className="w-12 h-1 bg-gradient-medical rounded-full mx-auto"></div>
              <p className="text-sm text-muted-foreground">
                Veuillez vous identifier avant de commencer le questionnaire
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Nom complet</Label>
                <div className="relative">
                  
                  <Input
                    id="name"
                    
                    value={user.name}
                    onChange={(e) => setUser((u) => ({ ...u, name: e.target.value }))}
                    className="pl-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  
                  <Input
                    id="email"
                    type="email"
                    
                    value={user.email}
                    onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))}
                    className="pl-12"
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleIdentify} className="w-full gap-2 h-11 text-base">
              Commencer le questionnaire
              <ChevronRight className="w-5 h-5" />
            </Button>

          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="medical-header py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6" />
            <h1 className="text-lg font-bold font-display">Enquête Thalassémie</h1>
          </div>
          <span className="medical-badge bg-primary-foreground/20 text-primary-foreground">
            {user.name}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-card border-b border-border/50 px-6 py-4 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              Section {currentSection + 1} / {totalSections}
            </span>
            <span className="text-xs font-semibold text-primary">
              {Math.round(((currentSection + 1) / totalSections) * 100)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-medical rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <Card className="medical-card animate-fade-in">
            <h2 className="section-title font-display">{section.title}</h2>
            <div className="space-y-1">
              {section.questions.map((q) => (
                <QuestionRenderer
                  key={q.id}
                  question={q}
                  value={answers[q.id] || (q.type === "checkbox" ? [] : "")}
                  onChange={(v) => handleAnswer(q.id, v)}
                />
              ))}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex gap-4 justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentSection((s) => Math.max(0, s - 1))}
              disabled={currentSection === 0}
              className="gap-2 px-6 h-11"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>

            {currentSection < totalSections - 1 ? (
              <Button
                onClick={() => setCurrentSection((s) => s + 1)}
                className="gap-2 px-6 h-11"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gap-2 px-6 h-11">
                <Send className="w-4 h-4" />
                Soumettre
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
