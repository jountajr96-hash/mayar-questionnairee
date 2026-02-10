import { CheckCircle, Stethoscope, Home, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
        <Card className="medical-card w-full max-w-lg text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-foreground">Merci pour votre temps</h2>
            <div className="w-12 h-1 bg-gradient-medical rounded-full mx-auto"></div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Vos réponses ont été enregistrées avec succès. Votre contribution est précieuse pour l'amélioration du suivi des patients thalassémiques splénectomisés.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Accueil
            </Button>
            
              
          </div>
        </Card>
      </div>
    </div>
  );
}
