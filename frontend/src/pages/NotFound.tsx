import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="medical-card w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page non trouvée</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Désolé, la page que vous recherchez n'existe pas. Vérifiez l'URL et réessayez.
        </p>
        <a href="/" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all">
          Retour à l'accueil
        </a>
      </Card>
    </div>
  );
};

export default NotFound;
