"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Users, Trash2, Building } from "lucide-react";

interface Scope3StepProps {
  data: {
    domesticFlights: number;
    internationalFlights: number;
    hotelNights: number;
    employees: number;
    avgCommute: number;
    wasteKg: number;
    recycledKg: number;
  };
  onUpdate: (data: any) => void;
}

export function Scope3Step({ data, onUpdate }: Scope3StepProps) {
  const updateField = (field: string, value: number) => {
    onUpdate({ scope3: { ...data, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Travel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Plane className="mr-2 h-5 w-5 text-primary" />
              Business Travel
            </CardTitle>
            <CardDescription>
              Employee travel for business purposes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domestic-flights">Domestic Flights (per year)</Label>
              <Input
                id="domestic-flights"
                type="number"
                placeholder="0"
                value={data.domesticFlights || ''}
                onChange={(e) => updateField('domesticFlights', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Average 500km per domestic flight
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="international-flights">International Flights (per year)</Label>
              <Input
                id="international-flights"
                type="number"
                placeholder="0"
                value={data.internationalFlights || ''}
                onChange={(e) => updateField('internationalFlights', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Average 3000km per international flight
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotel-nights">Hotel Nights (per year)</Label>
              <Input
                id="hotel-nights"
                type="number"
                placeholder="0"
                value={data.hotelNights || ''}
                onChange={(e) => updateField('hotelNights', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Factor: 30 kg CO₂/night
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Employee Commuting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Employee Commuting
            </CardTitle>
            <CardDescription>
              Daily commute to and from workplace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                type="number"
                placeholder="0"
                value={data.employees || ''}
                onChange={(e) => updateField('employees', parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avg-commute">Average Daily Commute (km)</Label>
              <Input
                id="avg-commute"
                type="number"
                placeholder="0"
                value={data.avgCommute || ''}
                onChange={(e) => updateField('avgCommute', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Round trip distance per employee
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Waste */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Trash2 className="mr-2 h-5 w-5 text-primary" />
              Waste Management
            </CardTitle>
            <CardDescription>
              Waste generated and disposal methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="waste">General Waste (kg/year)</Label>
              <Input
                id="waste"
                type="number"
                placeholder="0"
                value={data.wasteKg || ''}
                onChange={(e) => updateField('wasteKg', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Waste sent to landfill
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recycled">Recycled Waste (kg/year)</Label>
              <Input
                id="recycled"
                type="number"
                placeholder="0"
                value={data.recycledKg || ''}
                onChange={(e) => updateField('recycledKg', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Recycling reduces emissions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start">
          <Building className="h-5 w-5 text-orange-600 mt-0.5 mr-2" />
          <div>
            <h4 className="font-medium text-orange-900">Scope 3 Emissions</h4>
            <p className="text-sm text-orange-700 mt-1">
              These are indirect emissions from your value chain, including business travel, 
              employee commuting, and waste disposal. Often the largest source of emissions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}