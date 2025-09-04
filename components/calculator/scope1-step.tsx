"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Fuel, Zap } from "lucide-react";

interface Scope1StepProps {
  data: {
    petrolLiters: number;
    dieselLiters: number;
    naturalGasM3: number;
    generatorDiesel: number;
  };
  onUpdate: (data: any) => void;
}

export function Scope1Step({ data, onUpdate }: Scope1StepProps) {
  const updateField = (field: string, value: number) => {
    onUpdate({ scope1: { ...data, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vehicle Fuels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Car className="mr-2 h-5 w-5 text-primary" />
              Vehicle Fuels
            </CardTitle>
            <CardDescription>
              Fuel consumption from company vehicles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="petrol">Petrol (Liters/year)</Label>
              <Input
                id="petrol"
                type="number"
                placeholder="0"
                value={data.petrolLiters || ''}
                onChange={(e) => updateField('petrolLiters', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Factor: 2.31 kg CO₂/liter
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diesel">Diesel (Liters/year)</Label>
              <Input
                id="diesel"
                type="number"
                placeholder="0"
                value={data.dieselLiters || ''}
                onChange={(e) => updateField('dieselLiters', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Factor: 2.68 kg CO₂/liter
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stationary Combustion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Fuel className="mr-2 h-5 w-5 text-primary" />
              Stationary Combustion
            </CardTitle>
            <CardDescription>
              Fuel used for heating, cooking, and processes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="natural-gas">Natural Gas (m³/year)</Label>
              <Input
                id="natural-gas"
                type="number"
                placeholder="0"
                value={data.naturalGasM3 || ''}
                onChange={(e) => updateField('naturalGasM3', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Factor: 1.96 kg CO₂/m³
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="generator">Generator Diesel (Liters/year)</Label>
              <Input
                id="generator"
                type="number"
                placeholder="0"
                value={data.generatorDiesel || ''}
                onChange={(e) => updateField('generatorDiesel', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Factor: 2.68 kg CO₂/liter
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Zap className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div>
            <h4 className="font-medium text-blue-900">Scope 1 Emissions</h4>
            <p className="text-sm text-blue-700 mt-1">
              These are direct emissions from sources owned or controlled by your organization, 
              such as company vehicles, boilers, and generators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}