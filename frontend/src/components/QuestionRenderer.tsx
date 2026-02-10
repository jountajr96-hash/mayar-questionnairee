import { Question } from "@/types/questionnaire";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export function QuestionRenderer({ question, value, onChange }: Props) {
  if (question.type === "text") {
    return (
      <div className="question-group">
        <Label className="text-sm font-medium text-foreground">{question.text}</Label>
        <Textarea
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Votre réponse..."
          className="mt-2 bg-card border-border focus:ring-primary"
        />
      </div>
    );
  }

  if (question.type === "radio") {
    return (
      <div className="question-group">
        <Label className="text-sm font-medium text-foreground">{question.text}</Label>
        <RadioGroup
          value={(value as string) || ""}
          onValueChange={(v) => onChange(v)}
          className="mt-2 flex flex-wrap gap-3"
        >
          {question.options?.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem value={opt.value} id={`${question.id}-${opt.value}`} />
              <Label htmlFor={`${question.id}-${opt.value}`} className="text-sm text-foreground cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (question.type === "checkbox") {
    const selected = (value as string[]) || [];
    return (
      <div className="question-group">
        <Label className="text-sm font-medium text-foreground">{question.text}</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {question.options?.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <Checkbox
                id={`${question.id}-${opt.value}`}
                checked={selected.includes(opt.value)}
                onCheckedChange={(checked) => {
                  if (checked) onChange([...selected, opt.value]);
                  else onChange(selected.filter((v) => v !== opt.value));
                }}
              />
              <Label htmlFor={`${question.id}-${opt.value}`} className="text-sm text-foreground cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
