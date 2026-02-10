import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getResponses, deleteResponse, updateResponse } from "@/lib/storage";
import { QuestionnaireResponse } from "@/types/questionnaire";
import { questionnaireSections } from "@/data/questions";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Users,
  Trash2,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Loader2,
  Lock,
  Mail,
  BarChart3,
} from "lucide-react";

const ADMIN_EMAIL = "mayar@gmail.com";
const ADMIN_PASSWORD = "mayarmayar1212";

// helper functions
function getQuestionLabel(questionId: string): string {
  for (const section of questionnaireSections) {
    const q = section.questions.find((q) => q.id === questionId);
    if (q) return q.text;
  }
  return questionId;
}

function getOptionLabel(questionId: string, value: string): string {
  for (const section of questionnaireSections) {
    const q = section.questions.find((q) => q.id === questionId);
    if (q?.options) {
      const opt = q.options.find((o) => o.value === value);
      if (opt) return opt.label;
    }
  }
  return value;
}

function formatAnswer(questionId: string, value: string | string[]): string {
  if (Array.isArray(value)) {
    return value.map((v) => getOptionLabel(questionId, v)).join(", ");
  }
  return getOptionLabel(questionId, value);
}

function generateLocalAnalysis(response: QuestionnaireResponse): string {
  const { answers, user } = response;
  const lines: string[] = [];

  lines.push(`📋 **Analyse du questionnaire de ${user.name}**\n`);
  lines.push(`Date de soumission : ${new Date(response.submittedAt).toLocaleDateString("fr-FR")}\n`);

  lines.push(`## Profil`);
  if (answers.age) lines.push(`- Tranche d'âge : ${formatAnswer("age", answers.age)}`);
  if (answers.genre) lines.push(`- Genre : ${formatAnswer("genre", answers.genre)}`);
  if (answers.experience) lines.push(`- Expérience : ${formatAnswer("experience", answers.experience)}`);
  if (answers.grade) lines.push(`- Grade : ${formatAnswer("grade", answers.grade)}`);
  if (answers.service) lines.push(`- Service : ${formatAnswer("service", answers.service)}`);

  lines.push(`\n## Évaluation des connaissances`);
  const knowledgeQuestions = ["splenectomie_risque_infection", "fievre_urgence", "vaccins_obligatoires_connaissance"];
  let correctCount = 0;
  for (const qid of knowledgeQuestions) {
    if (answers[qid] === "oui") correctCount++;
  }
  lines.push(`- Score connaissances : ${correctCount}/${knowledgeQuestions.length} réponses correctes`);
  if (correctCount === knowledgeQuestions.length) {
    lines.push(`- ✅ Excellent niveau de connaissances sur les risques post-splénectomie`);
  } else if (correctCount >= 2) {
    lines.push(`- ⚠️ Connaissances satisfaisantes mais à renforcer`);
  } else {
    lines.push(`- ❌ Formation complémentaire recommandée sur les risques post-splénectomie`);
  }

  lines.push(`\n## Complications observées`);
  const compKeys = ["fievre", "infection_grave", "thrombose", "osteoporose", "hypertension_pulmonaire", "surcharge_martiale"];
  const observed = compKeys.filter((k) => answers[k] === "oui");
  if (observed.length > 0) {
    lines.push(`- ${observed.length} complications signalées : ${observed.map((k) => getQuestionLabel(k).replace(" :", "")).join(", ")}`);
  } else {
    lines.push(`- Aucune complication majeure signalée`);
  }

  lines.push(`\n## Pratiques de surveillance`);
  const survKeys = ["surveillance_temperature", "surveillance_ta", "surveillance_operation", "surveillance_fatigue"];
  const alwaysDone = survKeys.filter((k) => answers[k] === "toujours");
  lines.push(`- ${alwaysDone.length}/${survKeys.length} actes de surveillance réalisés systématiquement`);

  lines.push(`\n## Prévention`);
  if (answers.verification_carnet === "toujours") {
    lines.push(`- ✅ Vérification systématique du carnet vaccinal`);
  } else {
    lines.push(`- ⚠️ Vérification du carnet vaccinal non systématique`);
  }
  if (answers.difficultes_prevention === "oui") {
    lines.push(`- ⚠️ Des difficultés sont rapportées dans l'application de la prévention`);
  }

  lines.push(`\n## Diagnostic global`);
  if (correctCount === knowledgeQuestions.length && alwaysDone.length >= 3) {
    lines.push(`**Profil compétent** : L'infirmier(ère) démontre de bonnes connaissances et une surveillance rigoureuse.`);
  } else if (correctCount >= 2 || alwaysDone.length >= 2) {
    lines.push(`**Profil intermédiaire** : Des acquis solides mais des axes d'amélioration identifiés.`);
  } else {
    lines.push(`**Profil nécessitant un renforcement** : Formation ciblée recommandée.`);
  }

  return lines.join("\n");
}

function generateGlobalAnalysis(responses: QuestionnaireResponse[]): string {
  const lines: string[] = [];
  const total = responses.length;

  lines.push(`📊 **Analyse globale — ${total} répondant(s)**\n`);

  // Demographics
  const ageGroups: Record<string, number> = {};
  const services: Record<string, number> = {};
  const grades: Record<string, number> = {};
  responses.forEach((r) => {
    const age = r.answers.age as string;
    if (age) ageGroups[age] = (ageGroups[age] || 0) + 1;
    const svc = r.answers.service as string;
    if (svc) services[formatAnswer("service", svc)] = (services[formatAnswer("service", svc)] || 0) + 1;
    const gr = r.answers.grade as string;
    if (gr) grades[formatAnswer("grade", gr)] = (grades[formatAnswer("grade", gr)] || 0) + 1;
  });

  lines.push(`## Démographie`);
  lines.push(`- Répartition par âge : ${Object.entries(ageGroups).map(([k, v]) => `${k} (${v})`).join(", ")}`);
  lines.push(`- Services : ${Object.entries(services).map(([k, v]) => `${k} (${v})`).join(", ")}`);
  lines.push(`- Grades : ${Object.entries(grades).map(([k, v]) => `${k} (${v})`).join(", ")}`);

  // Knowledge
  lines.push(`\n## Connaissances`);
  const knowledgeQs = ["splenectomie_risque_infection", "fievre_urgence", "vaccins_obligatoires_connaissance"];
  knowledgeQs.forEach((qid) => {
    const yesCount = responses.filter((r) => r.answers[qid] === "oui").length;
    lines.push(`- ${getQuestionLabel(qid).replace(" :", "")} : ${yesCount}/${total} (${Math.round((yesCount / total) * 100)}%) répondent Oui`);
  });

  // Complications
  lines.push(`\n## Complications les plus observées`);
  const compKeys = ["fievre", "infection_grave", "thrombose", "osteoporose", "hypertension_pulmonaire", "surcharge_martiale"];
  const compStats = compKeys.map((k) => ({
    label: getQuestionLabel(k).replace(" :", ""),
    count: responses.filter((r) => r.answers[k] === "oui").length,
  })).sort((a, b) => b.count - a.count);
  compStats.forEach((c) => {
    lines.push(`- ${c.label} : ${c.count}/${total} (${Math.round((c.count / total) * 100)}%)`);
  });

  // Surveillance
  lines.push(`\n## Surveillance`);
  const survKeys = ["surveillance_temperature", "surveillance_ta", "surveillance_operation", "surveillance_fatigue"];
  survKeys.forEach((k) => {
    const always = responses.filter((r) => r.answers[k] === "toujours").length;
    lines.push(`- ${getQuestionLabel(k).replace(" :", "")} — Toujours : ${always}/${total} (${Math.round((always / total) * 100)}%)`);
  });

  // Prevention
  lines.push(`\n## Prévention`);
  const carnetAlways = responses.filter((r) => r.answers.verification_carnet === "toujours").length;
  lines.push(`- Vérification carnet vaccinal systématique : ${carnetAlways}/${total}`);

  // Global diagnostic
  lines.push(`\n## Diagnostic global`);
  let competent = 0, intermediate = 0, needsTraining = 0;
  responses.forEach((r) => {
    let correct = 0;
    knowledgeQs.forEach((q) => { if (r.answers[q] === "oui") correct++; });
    const alwaysSurv = survKeys.filter((k) => r.answers[k] === "toujours").length;
    if (correct === knowledgeQs.length && alwaysSurv >= 3) competent++;
    else if (correct >= 2 || alwaysSurv >= 2) intermediate++;
    else needsTraining++;
  });
  lines.push(`- ✅ Profils compétents : ${competent}/${total}`);
  lines.push(`- ⚠️ Profils intermédiaires : ${intermediate}/${total}`);
  lines.push(`- ❌ Profils nécessitant un renforcement : ${needsTraining}/${total}`);

  if (needsTraining > total / 2) {
    lines.push(`\n**Recommandation** : La majorité des répondants nécessite une formation complémentaire sur le suivi post-splénectomie.`);
  } else if (competent > total / 2) {
    lines.push(`\n**Recommandation** : Le niveau global est satisfaisant. Renforcer les points faibles identifiés.`);
  } else {
    lines.push(`\n**Recommandation** : Des formations ciblées sont recommandées pour homogénéiser les pratiques.`);
  }

  return lines.join("\n");
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [responses, setResponses] = useState<QuestionnaireResponse[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [globalAnalysis, setGlobalAnalysis] = useState<string | null>(null);
  const [generatingGlobal, setGeneratingGlobal] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setResponses(getResponses());
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("Connexion réussie !");
    } else {
      toast.error("Email ou mot de passe incorrect.");
    }
  };

  const handleDelete = (id: string) => {
    deleteResponse(id);
    setResponses(getResponses());
    toast.success("Réponse supprimée");
  };

  const handleGenerateAnalysis = (id: string) => {
    setGeneratingId(id);
    setTimeout(() => {
      const resp = responses.find((r) => r.id === id);
      if (resp) {
        const analysis = generateLocalAnalysis(resp);
        updateResponse(id, { analysis });
        setResponses(getResponses());
        setExpandedId(id);
      }
      setGeneratingId(null);
      toast.success("Analyse générée avec succès !");
    }, 1200);
  };

  const handleGlobalAnalysis = () => {
    if (responses.length === 0) {
      toast.error("Aucune réponse à analyser.");
      return;
    }
    setGeneratingGlobal(true);
    setTimeout(() => {
      setGlobalAnalysis(generateGlobalAnalysis(responses));
      setGeneratingGlobal(false);
      toast.success("Diagnostic global généré !");
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="medical-header py-6 px-6">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Stethoscope className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold font-display">Tableau de bord</h1>
              <p className="text-sm opacity-90">Accès administrateur uniquement</p>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="medical-card w-full max-w-md space-y-8 animate-fade-in">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <Lock className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Connexion Admin</h2>
              <div className="w-12 h-1 bg-gradient-medical rounded-full mx-auto"></div>
              <p className="text-sm text-muted-foreground">Entrez vos identifiants pour accéder au tableau de bord</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  
                  <Input
                    id="login-email"
                    type="email"
                    
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-12"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium">Mot de passe</Label>
                <div className="relative">
                  
                  <Input
                    id="login-password"
                    type="password"
                    
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-12"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleLogin} className="w-full gap-2 h-11 text-base">
              Se connecter
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="medical-header py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6" />
            <h1 className="text-lg font-bold font-display">Tableau de bord</h1>
          </div>
          <span className="medical-badge bg-primary-foreground/20 text-primary-foreground">Admin</span>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Global Diagnostic Button */}
          <div className="mb-6">
            <Button
              onClick={handleGlobalAnalysis}
              disabled={generatingGlobal || responses.length === 0}
              className="w-full gap-2 h-12 text-base"
            >
              {generatingGlobal ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <BarChart3 className="w-5 h-5" />
              )}
              Diagnostic global de toutes les réponses
            </Button>
          </div>

          {/* Global Analysis Result */}
          {globalAnalysis && (
            <Card className="medical-card mb-6">
              <div className="p-4 bg-accent/50 rounded-lg border border-border">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Diagnostic Global
                </h4>
                <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {globalAnalysis.split("\n").map((line, i) => {
                    if (line.startsWith("## ")) {
                      return <h5 key={i} className="font-bold mt-3 mb-1 text-primary">{line.replace("## ", "")}</h5>;
                    }
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return <p key={i} className="font-bold mt-2">{line.replace(/\*\*/g, "")}</p>;
                    }
                    if (line.startsWith("- ")) {
                      return <p key={i} className="ml-4">{line}</p>;
                    }
                    return <p key={i}>{line}</p>;
                  })}
                </div>
              </div>
            </Card>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="medical-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{responses.length}</p>
                <p className="text-sm text-muted-foreground">Réponses</p>
              </div>
            </Card>
            <Card className="medical-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{responses.filter((r) => r.analysis).length}</p>
                <p className="text-sm text-muted-foreground">Analyses générées</p>
              </div>
            </Card>
            <Card className="medical-card flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{questionnaireSections.reduce((acc, s) => acc + s.questions.length, 0)}</p>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
            </Card>
          </div>

          {/* Responses list */}
          {responses.length === 0 ? (
            <Card className="medical-card text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">Aucune réponse</h3>
              <p className="text-sm text-muted-foreground">Les réponses soumises apparaîtront ici</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {responses.map((resp) => (
                <Card key={resp.id} className="medical-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {resp.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{resp.user.name}</h3>
                        <p className="text-xs text-muted-foreground">{resp.user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(resp.submittedAt).toLocaleDateString("fr-FR", {
                            day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleGenerateAnalysis(resp.id)} disabled={generatingId === resp.id} className="gap-1.5">
                        {generatingId === resp.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                        {resp.analysis ? "Regénérer" : "Analyser"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setExpandedId(expandedId === resp.id ? null : resp.id)} className="gap-1">
                        {expandedId === resp.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        Détails
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(resp.id)} className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {resp.analysis && expandedId === resp.id && (
                    <div className="mt-4 p-4 bg-accent/50 rounded-lg border border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Analyse & Diagnostic
                      </h4>
                      <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                        {resp.analysis.split("\n").map((line, i) => {
                          if (line.startsWith("## ")) return <h5 key={i} className="font-bold mt-3 mb-1 text-primary">{line.replace("## ", "")}</h5>;
                          if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold mt-2">{line.replace(/\*\*/g, "")}</p>;
                          if (line.startsWith("- ")) return <p key={i} className="ml-4">{line}</p>;
                          return <p key={i}>{line}</p>;
                        })}
                      </div>
                    </div>
                  )}

                  {expandedId === resp.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Réponses détaillées</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(resp.answers).map(([key, val]) => {
                          if (!val || (Array.isArray(val) && val.length === 0)) return null;
                          return (
                            <div key={key} className="text-xs p-2 bg-muted/50 rounded">
                              <span className="font-medium text-foreground">{getQuestionLabel(key)}</span>
                              <br />
                              <span className="text-muted-foreground">{formatAnswer(key, val)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
