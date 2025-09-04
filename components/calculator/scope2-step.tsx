"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Leaf } from "lucide-react";

interface Scope2StepProps {
  data: {
    electricityKwh: number;
    provider: string;
    renewablePercent: number;
  };
  onUpdate: (data: any) => void;
}

const electricityProviders = [
  { value: "TNB", label: "TNB (Tenaga Nasional)", factor: 0.585, region: "Peninsular Malaysia" },
  { value: "SESB", label: "SESB (Sabah Electricity)", factor: 0.694, region: "Sabah" },
  { value: "SEB", label: "SEB (Sarawak Energy)", factor: 0.702, region: "Sarawak" }
];

export function Scope2Step({ data, onUpdate }: Scope2StepProps) {
  const updateField = (field: string, value: any) => {
    onUpdate({ scope2: { ...data, [field]: value } });
  };

  const selectedProvider = electricityProviders.find(p => p.value === data.provider);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Zap className="mr-2 h-5 w-5 text-primary" />
            Electricity Consumption
          </CardTitle>
          <CardDescription>
            Indirect emissions from purchased electricity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="electricity">Annual Electricity Usage (kWh)</Label>
              <Input
                id="electricity"
                type="number"
                placeholder="0"
                value={data.electricityKwh || ''}
                onChange={(e) => updateField('electricityKwh', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Check your electricity bills for annual consumption
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider">Electricity Provider</Label>
              <Select value={data.provider} onValueChange={(value) => updateField('provider', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your provider" />
                </SelectTrigger>
                <SelectContent>
                  {electricityProviders.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      <div>
                        <div className="font-medium">{provider.label}</div>
                        <div className="text-xs text-muted-foreground">{provider.region}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProvider && (
                <p className="text-xs text-muted-foreground">
                  Grid factor: {selectedProvider.factor} kg CO₂/kWh
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="renewable">Renewable Energy Percentage</Label>
              <span className="text-sm font-medium">{data.renewablePercent}%</span>
            </div>
            <Slider
              id="renewable"
              min={0}
              max={100}
              step={5}
              value={[data.renewablePercent]}
              onValueChange={(value) => updateField('renewablePercent', value[0])}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Percentage of electricity from renewable sources (solar, wind, hydro)
            </p>
          </div>

          {data.renewablePercent > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <Leaf className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-green-900">Great! You're using renewable energy</h4>
                  <p className="text-sm text-green-700 mt-1">
                    {data.renewablePercent}% renewable energy will reduce your Scope 2 emissions significantly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Zap className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div>
            <h4 className="font-medium text-blue-900">Scope 2 Emissions</h4>
            <p className="text-sm text-blue-700 mt-1">
              These are indirect emissions from purchased electricity, steam, heating, and cooling 
              consumed by your organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}