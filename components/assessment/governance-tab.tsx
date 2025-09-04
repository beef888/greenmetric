"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Shield, Users, FileText, AlertTriangle, Eye } from "lucide-react";

interface GovernanceTabProps {
  data: Record<string, any>;
  onUpdate: (data: any) => void;
}

const governanceQuestions = [
  {
    id: "board_composition",
    category: "Board Structure",
    question: "What is your board composition and independence?",
    type: "radio",
    options: [
      { value: "majority_independent", label: "Majority independent directors", score: 10 },
      { value: "one_third_independent", label: "At least 1/3 independent directors", score: 7 },
      { value: "some_independent", label: "Some independent directors", score: 4 },
      { value: "no_independent", label: "No independent directors", score: 0 }
    ],
    regulatory: "Malaysian Code on Corporate Governance",
    icon: Users
  },
  {
    id: "anti_corruption",
    category: "Ethics",
    question: "What anti-corruption measures do you have in place?",
    type: "multiple",
    options: [
      { value: "policy", label: "Anti-corruption policy", score: 2 },
      { value: "training", label: "Regular training programs", score: 2 },
      { value: "whistleblowing", label: "Whistleblowing mechanism", score: 3 },
      { value: "due_diligence", label: "Third-party due diligence", score: 3 }
    ],
    regulatory: "Malaysian Anti-Corruption Commission Act 2009",
    icon: Shield
  },
  {
    id: "risk_management",
    category: "Risk Management",
    question: "How comprehensive is your risk management framework?",
    type: "radio",
    options: [
      { value: "comprehensive", label: "Comprehensive framework with regular review", score: 10 },
      { value: "established", label: "Established framework", score: 7 },
      { value: "basic", label: "Basic risk identification", score: 4 },
      { value: "none", label: "No formal framework", score: 0 }
    ],
    regulatory: "Statement on Risk Management & Internal Control",
    icon: AlertTriangle
  },
  {
    id: "transparency",
    category: "Transparency",
    question: "How do you ensure transparency and disclosure?",
    type: "multiple",
    options: [
      { value: "annual_report", label: "Comprehensive annual reporting", score: 2 },
      { value: "sustainability_report", label: "Sustainability reporting", score: 3 },
      { value: "stakeholder_engagement", label: "Regular stakeholder engagement", score: 2 },
      { value: "website_disclosure", label: "Website transparency", score: 2 },
      { value: "third_party_assurance", label: "Third-party assurance", score: 1 }
    ],
    regulatory: "Bursa Malaysia Listing Requirements",
    icon: Eye
  },
  {
    id: "data_privacy",
    category: "Data Protection",
    question: "What data privacy and protection measures do you have?",
    type: "radio",
    options: [
      { value: "comprehensive", label: "Comprehensive PDPA compliance program", score: 10 },
      { value: "policies", label: "Data protection policies in place", score: 7 },
      { value: "basic", label: "Basic data handling procedures", score: 4 },
      { value: "none", label: "No formal data protection", score: 0 }
    ],
    regulatory: "Personal Data Protection Act 2010",
    icon: FileText
  }
];

export function GovernanceTab({ data, onUpdate }: GovernanceTabProps) {
  const handleRadioChange = (questionId: string, value: string, score: number) => {
    onUpdate({ [questionId]: { value, score } });
  };

  const handleCheckboxChange = (questionId: string, optionValue: string, checked: boolean, score: number) => {
    const currentData = data[questionId] || { values: [], score: 0 };
    let newValues = [...currentData.values];
    let newScore = currentData.score;

    if (checked) {
      newValues.push(optionValue);
      newScore += score;
    } else {
      newValues = newValues.filter(v => v !== optionValue);
      newScore -= score;
    }

    onUpdate({ [questionId]: { values: newValues, score: newScore } });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">Governance Criteria</h3>
          <p className="text-muted-foreground">
            Assess your organization's governance structures and ethical practices
          </p>
        </div>

        {governanceQuestions.map((question) => {
          const QuestionIcon = question.icon;
          return (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center space-x-2">
                    <QuestionIcon className="h-5 w-5 text-primary" />
                    <span>{question.question}</span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{question.regulatory}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
                <CardDescription>
                  Category: {question.category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {question.type === "radio" ? (
                  <RadioGroup
                    value={data[question.id]?.value || ""}
                    onValueChange={(value) => {
                      const option = question.options.find(opt => opt.value === value);
                      if (option) {
                        handleRadioChange(question.id, value, option.score);
                      }
                    }}
                  >
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                        <Label htmlFor={`${question.id}-${option.value}`} className="flex-1">
                          {option.label}
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          {option.score} pts
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${question.id}-${option.value}`}
                          checked={data[question.id]?.values?.includes(option.value) || false}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange(question.id, option.value, checked as boolean, option.score)
                          }
                        />
                        <Label htmlFor={`${question.id}-${option.value}`} className="flex-1">
                          {option.label}
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          {option.score} pts
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </TooltipProvider>
  );
}