"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Leaf, Zap, Droplets, Recycle } from "lucide-react";

interface EnvironmentalTabProps {
  data: Record<string, any>;
  onUpdate: (data: any) => void;
}

const environmentalQuestions = [
  {
    id: "energy_management",
    category: "Energy",
    question: "Does your organization have an energy management system?",
    type: "radio",
    options: [
      { value: "yes_certified", label: "Yes, ISO 50001 certified", score: 10 },
      { value: "yes_informal", label: "Yes, informal system", score: 7 },
      { value: "planning", label: "Planning to implement", score: 3 },
      { value: "no", label: "No", score: 0 }
    ],
    regulatory: "Bursa Malaysia: Energy efficiency initiatives",
    icon: Zap
  },
  {
    id: "renewable_energy",
    category: "Energy", 
    question: "What percentage of your energy comes from renewable sources?",
    type: "radio",
    options: [
      { value: "high", label: "More than 50%", score: 10 },
      { value: "medium", label: "25-50%", score: 7 },
      { value: "low", label: "1-25%", score: 4 },
      { value: "none", label: "0%", score: 0 }
    ],
    regulatory: "Malaysia Renewable Energy Roadmap",
    icon: Leaf
  },
  {
    id: "carbon_targets",
    category: "Climate",
    question: "Has your organization set science-based carbon reduction targets?",
    type: "radio", 
    options: [
      { value: "sbti_approved", label: "Yes, SBTi approved", score: 10 },
      { value: "science_based", label: "Yes, science-based", score: 8 },
      { value: "targets_set", label: "Yes, general targets", score: 5 },
      { value: "no_targets", label: "No targets set", score: 0 }
    ],
    regulatory: "Paris Agreement alignment",
    icon: Leaf
  },
  {
    id: "water_management",
    category: "Water",
    question: "Do you have water conservation and management programs?",
    type: "radio",
    options: [
      { value: "comprehensive", label: "Comprehensive program", score: 10 },
      { value: "basic", label: "Basic conservation measures", score: 6 },
      { value: "planning", label: "Planning implementation", score: 3 },
      { value: "none", label: "No program", score: 0 }
    ],
    regulatory: "Water Services Industry Act 2006",
    icon: Droplets
  },
  {
    id: "waste_reduction",
    category: "Waste",
    question: "What waste reduction initiatives do you have?",
    type: "multiple",
    options: [
      { value: "zero_waste", label: "Zero waste to landfill program", score: 3 },
      { value: "recycling", label: "Comprehensive recycling", score: 2 },
      { value: "reduction", label: "Waste reduction targets", score: 2 },
      { value: "circular", label: "Circular economy principles", score: 3 }
    ],
    regulatory: "Solid Waste Management Act 2007",
    icon: Recycle
  }
];

export function EnvironmentalTab({ data, onUpdate }: EnvironmentalTabProps) {
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
          <h3 className="text-xl font-semibold mb-2">Environmental Criteria</h3>
          <p className="text-muted-foreground">
            Assess your organization's environmental management practices and performance
          </p>
        </div>

        {environmentalQuestions.map((question) => {
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