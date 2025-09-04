"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CompanyInfoStepProps {
  data: {
    name: string;
    industry: string;
    size: string;
    state: string;
  };
  onUpdate: (data: any) => void;
}

const industries = [
  "Manufacturing",
  "Financial Services",
  "Technology",
  "Healthcare",
  "Retail & Consumer",
  "Energy & Utilities",
  "Real Estate",
  "Transportation",
  "Agriculture",
  "Construction",
  "Education",
  "Other"
];

const malaysianStates = [
  "Johor",
  "Kedah", 
  "Kelantan",
  "Kuala Lumpur",
  "Labuan",
  "Malacca",
  "Negeri Sembilan",
  "Pahang",
  "Penang",
  "Perak",
  "Perlis",
  "Putrajaya",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu"
];

export function CompanyInfoStep({ data, onUpdate }: CompanyInfoStepProps) {
  const updateField = (field: string, value: string) => {
    onUpdate({ company: { ...data, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name *</Label>
          <Input
            id="company-name"
            placeholder="Enter your company name"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry *</Label>
          <Select value={data.industry} onValueChange={(value) => updateField('industry', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State/Territory *</Label>
          <Select value={data.state} onValueChange={(value) => updateField('state', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {malaysianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Company Size *</Label>
          <RadioGroup 
            value={data.size} 
            onValueChange={(value) => updateField('size', value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SME" id="sme" />
              <Label htmlFor="sme" className="font-normal">
                SME (Small-Medium Enterprise)
                <span className="block text-sm text-muted-foreground">Less than 200 employees</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Large" id="large" />
              <Label htmlFor="large" className="font-normal">
                Large Enterprise
                <span className="block text-sm text-muted-foreground">200+ employees</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MNC" id="mnc" />
              <Label htmlFor="mnc" className="font-normal">
                Multinational Corporation
                <span className="block text-sm text-muted-foreground">Multiple countries</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}