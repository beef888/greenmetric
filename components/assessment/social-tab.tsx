"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Users, Heart, GraduationCap, Shield, Building } from "lucide-react";

interface SocialTabProps {
  data: Record<string, any>;
  onUpdate: (data: any) => void;
}

const socialQuestions = [
  {
    id: "employee_welfare",
    category: "Employee Relations",
    question: "What employee welfare programs do you provide?",
    type: "multiple",
    options: [
      { value: "health_insurance", label: "Comprehensive health insurance", score: 2 },
      { value: "mental_health", label: "Mental health support", score: 2 },
      { value: "flexible_work", label: "Flexible working arrangements", score: 2 },
      { value: "wellness", label: "Wellness programs", score: 2 },
      { value: "childcare", label: "Childcare support", score: 2 }
    ],
    regulatory: "Employment Act 1955 - Employee benefits",
    icon: Heart
  },
  {
    id: "diversity_inclusion",
    category: "Diversity",
    question: "What is your approach to diversity and inclusion?",
    type: "radio",
    options: [
      { value: "comprehensive", label: "Comprehensive D&I strategy with targets", score: 10 },
      { value: "policies", label: "D&I policies in place", score: 7 },
      { value: "basic", label: "Basic equal opportunity practices", score: 4 },
      { value: "none", label: "No formal approach", score: 0 }
    ],
    regulatory: "Malaysian Code on Corporate Governance",
    icon: Users
  },
  {
    id: "training_development",
    category: "Human Capital",
    question: "How do you approach employee training and development?",
    type: "radio",
    options: [
      { value: "comprehensive", label: "Comprehensive development programs", score: 10 },
      { value: "regular", label: "Regular training programs", score: 7 },
      { value: "basic", label: "Basic skills training", score: 4 },
      { value: "minimal", label: "Minimal training provided", score: 0 }
    ],
    regulatory: "Human Resources Development Act 1992",
    icon: GraduationCap
  },
  {
    id: "health_safety",
    category: "Health & Safety",
    question: "What is your occupational health and safety performance?",
    type: "radio",
    options: [
      { value: "excellent", label: "Zero incidents, certified OHSAS 18001/ISO 45001", score: 10 },
      { value: "good", label: "Low incident rate, safety programs", score: 7 },
      { value: "average", label: "Basic safety compliance", score: 4 },
      { value: "poor", label: "Safety incidents reported", score: 0 }
    ],
    regulatory: "Occupational Safety and Health Act 1994",
    icon: Shield
  },
  {
    id: "community_engagement",
    category: "Community",
    question: "How does your organization engage with local communities?",
    type: "multiple",
    options: [
      { value: "investment", label: "Community investment programs", score: 3 },
      { value: "volunteering", label: "Employee volunteering", score: 2 },
      { value: "partnerships", label: "Local partnerships", score: 2 },
      { value: "education", label: "Education support", score: 3 }
    ],
    regulatory: "Corporate Social Responsibility guidelines",
    icon: Building
  }
];

export function SocialTab({ data, onUpdate }: SocialTabProps) {
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
          <h3 className="text-xl font-semibold mb-2">Social Criteria</h3>
          <p className="text-muted-foreground">
            Evaluate your organization's social impact and stakeholder relationships
          </p>
        </div>

        {socialQuestions.map((question) => {
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