"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Download, RefreshCw, Share2, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { PDFExportService } from "@/lib/pdf-export";
import { useAuth } from "@/hooks/use-auth";

interface ResultsDisplayProps {
  results: {
    scope1: number;
    scope2: number;
    scope3: number;
    total: number;
    breakdown: {
      scope1Percent: number;
      scope2Percent: number;
      scope3Percent: number;
    };
  };
  companyName: string;
  onStartOver: () => void;
  onSaveToDashboard?: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

export function ResultsDisplay({ results, companyName, onStartOver }: ResultsDisplayProps) {
  const { user } = useAuth();
  
  const pieData = [
    { name: 'Scope 1', value: results.scope1, percent: results.breakdown.scope1Percent },
    { name: 'Scope 2', value: results.scope2, percent: results.breakdown.scope2Percent },
    { name: 'Scope 3', value: results.scope3, percent: results.breakdown.scope3Percent },
  ];

  const barData = [
    { name: 'Scope 1\n(Direct)', emissions: results.scope1, color: '#10b981' },
    { name: 'Scope 2\n(Electricity)', emissions: results.scope2, color: '#3b82f6' },
    { name: 'Scope 3\n(Value Chain)', emissions: results.scope3, color: '#f59e0b' },
  ];

  const getEmissionLevel = (total: number) => {
    if (total < 100) return { level: "Low", color: "bg-green-500", icon: TrendingDown };
    if (total < 1000) return { level: "Medium", color: "bg-yellow-500", icon: AlertCircle };
    return { level: "High", color: "bg-red-500", icon: TrendingUp };
  };

  const emissionLevel = getEmissionLevel(results.total);
  const EmissionIcon = emissionLevel.icon;

  const handlePDFExport = async () => {
    const success = await PDFExportService.exportCarbonResults(results, companyName || user?.companyName || 'Your Company');
    if (!success) {
      alert('Failed to export PDF. Please try again.');
    }
  };

  const recommendations = [
    {
      scope: "Scope 1",
      suggestion: "Consider switching to electric vehicles or hybrid fleet",
      impact: "High",
      effort: "Medium"
    },
    {
      scope: "Scope 2", 
      suggestion: "Install solar panels or purchase renewable energy certificates",
      impact: "High",
      effort: "Medium"
    },
    {
      scope: "Scope 3",
      suggestion: "Implement remote work policies to reduce commuting",
      impact: "Medium",
      effort: "Low"
    },
    {
      scope: "General",
      suggestion: "Set science-based targets aligned with 1.5°C pathway",
      impact: "High",
      effort: "High"
    }
  ];

  return (
    <div id="carbon-results" className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Carbon Footprint Results
        </h1>
        <p className="text-lg text-muted-foreground">
          {companyName ? `Results for ${companyName}` : "Your organization's carbon footprint"}
        </p>
      </div>

      {/* Total Emissions Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Total Annual Emissions</CardTitle>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="text-5xl font-bold text-primary">
              {results.total.toLocaleString()}
            </div>
            <div className="text-xl text-muted-foreground">
              kg CO₂e
            </div>
          </div>
          <div className="flex items-center justify-center mt-2">
            <Badge variant="outline" className={`${emissionLevel.color} text-white border-0`}>
              <EmissionIcon className="mr-1 h-3 w-3" />
              {emissionLevel.level} Impact
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Emissions Breakdown</CardTitle>
            <CardDescription>Distribution across emission scopes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${percent}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} kg CO₂e`, 'Emissions']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Scope Comparison</CardTitle>
            <CardDescription>Emissions by scope category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} kg CO₂e`, 'Emissions']} />
                <Bar dataKey="emissions" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>Emissions by scope with percentages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.name === 'Scope 1' && 'Direct emissions from owned sources'}
                      {item.name === 'Scope 2' && 'Indirect emissions from purchased energy'}
                      {item.name === 'Scope 3' && 'Other indirect emissions from value chain'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.value.toLocaleString()} kg CO₂e</div>
                  <div className="text-sm text-muted-foreground">{item.percent}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Reduction Recommendations</CardTitle>
          <CardDescription>Actionable steps to reduce your carbon footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{rec.scope}</Badge>
                  <div className="flex space-x-1">
                    <Badge variant={rec.impact === 'High' ? 'default' : rec.impact === 'Medium' ? 'secondary' : 'outline'} className="text-xs">
                      {rec.impact} Impact
                    </Badge>
                    <Badge variant={rec.effort === 'Low' ? 'default' : rec.effort === 'Medium' ? 'secondary' : 'outline'} className="text-xs">
                      {rec.effort} Effort
                    </Badge>
                  </div>
                </div>
                <p className="text-sm">{rec.suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="px-8" onClick={handlePDFExport}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF Report
        </Button>
        <Button variant="outline" size="lg" className="px-8">
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
        {onSaveToDashboard && (
          <Button variant="outline" size="lg" className="px-8" onClick={onSaveToDashboard}>
            View in Dashboard
          </Button>
        )}
        <Button variant="outline" size="lg" className="px-8" onClick={onStartOver}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </div>
    </div>
  );
}