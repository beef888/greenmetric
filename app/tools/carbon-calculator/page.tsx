"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CompanyInfoStep } from "@/components/calculator/company-info-step";
import { Scope1Step } from "@/components/calculator/scope1-step";
import { Scope2Step } from "@/components/calculator/scope2-step";
import { Scope3Step } from "@/components/calculator/scope3-step";
import { ResultsDisplay } from "@/components/calculator/results-display";
import { Calculator, ArrowLeft, ArrowRight, Download } from "lucide-react";
import { DataService } from "@/lib/auth";
import { useAuth } from "@/hooks/use-auth";

interface CalculatorData {
  company: {
    name: string;
    industry: string;
    size: string;
    state: string;
  };
  scope1: {
    petrolLiters: number;
    dieselLiters: number;
    naturalGasM3: number;
    generatorDiesel: number;
  };
  scope2: {
    electricityKwh: number;
    provider: string;
    renewablePercent: number;
  };
  scope3: {
    domesticFlights: number;
    internationalFlights: number;
    hotelNights: number;
    employees: number;
    avgCommute: number;
    wasteKg: number;
    recycledKg: number;
  };
}

const EmissionFactors = {
  electricity: {
    TNB: 0.585, // kg CO2/kWh (Peninsular Malaysia)
    SESB: 0.694, // kg CO2/kWh (Sabah)
    SEB: 0.702, // kg CO2/kWh (Sarawak)
  },
  fuel: {
    petrol: 2.31, // kg CO2/liter
    diesel: 2.68, // kg CO2/liter
    naturalGas: 1.96, // kg CO2/m³
  },
  travel: {
    domesticFlight: 0.255, // kg CO2/km
    internationalFlight: 0.195, // kg CO2/km
    accommodation: 30.0, // kg CO2/night
  },
  waste: {
    landfill: 0.467, // kg CO2/kg
    recycling: -0.285, // kg CO2/kg (avoided)
  },
  commuting: 0.21, // kg CO2/km (average)
};

export default function CarbonCalculatorPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CalculatorData>({
    company: { name: "", industry: "", size: "", state: "" },
    scope1: { petrolLiters: 0, dieselLiters: 0, naturalGasM3: 0, generatorDiesel: 0 },
    scope2: { electricityKwh: 0, provider: "TNB", renewablePercent: 0 },
    scope3: { domesticFlights: 0, internationalFlights: 0, hotelNights: 0, employees: 0, avgCommute: 0, wasteKg: 0, recycledKg: 0 }
  });
  const [results, setResults] = useState<any>(null);
  const { user } = useAuth();
  const router = useRouter();

  const calculateEmissions = () => {
    // Scope 1 calculations
    const scope1 = 
      (data.scope1.petrolLiters * EmissionFactors.fuel.petrol) +
      (data.scope1.dieselLiters * EmissionFactors.fuel.diesel) +
      (data.scope1.naturalGasM3 * EmissionFactors.fuel.naturalGas) +
      (data.scope1.generatorDiesel * EmissionFactors.fuel.diesel);

    // Scope 2 calculations
    const electricityFactor = EmissionFactors.electricity[data.scope2.provider as keyof typeof EmissionFactors.electricity];
    const scope2 = data.scope2.electricityKwh * electricityFactor * (1 - data.scope2.renewablePercent / 100);

    // Scope 3 calculations
    const scope3 = 
      (data.scope3.domesticFlights * 500 * EmissionFactors.travel.domesticFlight) + // Assume 500km avg domestic flight
      (data.scope3.internationalFlights * 3000 * EmissionFactors.travel.internationalFlight) + // Assume 3000km avg international
      (data.scope3.hotelNights * EmissionFactors.travel.accommodation) +
      (data.scope3.employees * data.scope3.avgCommute * 250 * EmissionFactors.commuting) + // 250 working days
      (data.scope3.wasteKg * EmissionFactors.waste.landfill) +
      (data.scope3.recycledKg * EmissionFactors.waste.recycling);

    const total = scope1 + scope2 + scope3;

    setResults({
      scope1: Math.round(scope1),
      scope2: Math.round(scope2),
      scope3: Math.round(scope3),
      total: Math.round(total),
      breakdown: {
        scope1Percent: Math.round((scope1 / total) * 100),
        scope2Percent: Math.round((scope2 / total) * 100),
        scope3Percent: Math.round((scope3 / total) * 100),
      }
    });

    // Save calculation to local storage
    if (user) {
      const calculationData = {
        userId: user.id,
        companyName: data.company.name,
        scope1_emissions: scope1,
        scope2_emissions: scope2,
        scope3_emissions: scope3,
        total_emissions: total,
        calculation_data: data,
        results: {
          scope1: Math.round(scope1),
          scope2: Math.round(scope2),
          scope3: Math.round(scope3),
          total: Math.round(total),
          breakdown: {
            scope1Percent: Math.round((scope1 / total) * 100),
            scope2Percent: Math.round((scope2 / total) * 100),
            scope3Percent: Math.round((scope3 / total) * 100),
          }
        }
      };
      DataService.saveCalculation(calculationData);
    }
  };

  const updateData = (stepData: any) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      calculateEmissions();
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepTitles = [
    "Company Information",
    "Scope 1: Direct Emissions",
    "Scope 2: Electricity",
    "Scope 3: Value Chain"
  ];

  if (results) {
    return (
      <div className="container-custom py-12">
        <ResultsDisplay 
          results={results} 
          companyName={data.company.name}
          onStartOver={() => {
            setStep(1);
            setResults(null);
            setData({
              company: { name: "", industry: "", size: "", state: "" },
              scope1: { petrolLiters: 0, dieselLiters: 0, naturalGasM3: 0, generatorDiesel: 0 },
              scope2: { electricityKwh: 0, provider: "TNB", renewablePercent: 0 },
              scope3: { domesticFlights: 0, internationalFlights: 0, hotelNights: 0, employees: 0, avgCommute: 0, wasteKg: 0, recycledKg: 0 }
            });
          }}
          onSaveToDashboard={() => {
            router.push('/dashboard/assessments');
          }}
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate your organization's carbon emissions using Malaysian emission factors
          </p>
          <Badge variant="outline" className="mt-2">
            🇲🇾 Malaysian Grid Factors
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{stepTitles[step - 1]}</span>
            <span>Step {step} of 4</span>
          </div>
          <Progress value={step * 25} className="h-2" />
        </div>

        {/* Calculator Card */}
        <Card>
          <CardHeader>
            <CardTitle>{stepTitles[step - 1]}</CardTitle>
            <CardDescription>
              {step === 1 && "Tell us about your organization"}
              {step === 2 && "Direct emissions from fuel combustion and processes"}
              {step === 3 && "Indirect emissions from purchased electricity"}
              {step === 4 && "Other indirect emissions from your value chain"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && <CompanyInfoStep data={data.company} onUpdate={updateData} />}
            {step === 2 && <Scope1Step data={data.scope1} onUpdate={updateData} />}
            {step === 3 && <Scope2Step data={data.scope2} onUpdate={updateData} />}
            {step === 4 && <Scope3Step data={data.scope3} onUpdate={updateData} />}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={nextStep}>
                {step < 4 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Calculate Emissions
                    <Calculator className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}