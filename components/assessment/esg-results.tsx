"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Download, RefreshCw, Share2, TrendingUp, AlertCircle, CheckCircle, Leaf, Users, Shield } from "lucide-react";
import { PDFExportService } from "@/lib/pdf-export";
import { useAuth } from "@/hooks/use-auth";

interface ESGResultsProps {
  results: {
    environmental: number;
    social: number;
    governance: number;
    overall: number;
    completeness: {
      environmental: number;
      social: number;
      governance: number;
    };
  };
  onStartOver: () => void;
  onSaveToDashboard?: () => void;
}

export function ESGResults({ results, onStartOver }: ESGResultsProps) {
  const { user } = useAuth();
  
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle };
    if (score >= 60) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100", icon: TrendingUp };
    if (score >= 40) return { level: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-100", icon: AlertCircle };
    return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-100", icon: AlertCircle };
  };

  const overallLevel = getScoreLevel(results.overall);
  const OverallIcon = overallLevel.icon;

  const handlePDFExport = async () => {
    const success = await PDFExportService.exportESGResults(results, user?.companyName || 'Your Company');
    if (!success) {
      alert('Failed to export PDF. Please try again.');
    }
  };

  const radialData = [
    { name: 'Overall Score', value: results.overall, fill: '#10b981' }
  ];

  const barData = [
    { name: 'Environmental', score: results.environmental, fill: '#10b981', icon: '🌱' },
    { name: 'Social', score: results.social, fill: '#3b82f6', icon: '👥' },
    { name: 'Governance', score: results.governance, fill: '#8b5cf6', icon: '🛡️' }
  ];

  const recommendations = [
    {
      category: "Environmental",
      priority: results.environmental < 60 ? "High" : "Medium",
      suggestion: "Implement energy management system and set science-based targets",
      compliance: "Bursa Malaysia sustainability reporting requirements"
    },
    {
      category: "Social", 
      priority: results.social < 60 ? "High" : "Medium",
      suggestion: "Enhance employee welfare programs and diversity initiatives",
      compliance: "Malaysian Code on Corporate Governance"
    },
    {
      category: "Governance",
      priority: results.governance < 60 ? "High" : "Medium", 
      suggestion: "Strengthen board independence and risk management framework",
      compliance: "Corporate governance best practices"
    }
  ];

  const nextSteps = [
    "Download detailed assessment report",
    "Schedule consultation with ESG expert",
    "Begin implementation of priority recommendations",
    "Set up quarterly progress monitoring",
    "Prepare for next year's assessment"
  ];

  return (
    <div id="esg-results" className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          ESG Assessment Results
        </h1>
        <p className="text-lg text-muted-foreground">
          Your comprehensive ESG readiness evaluation
        </p>
      </div>

      {/* Overall Score Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Overall ESG Score</CardTitle>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData}>
                  <RadialBar dataKey="value" cornerRadius={10} fill="#10b981" />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{results.overall}</div>
                  <div className="text-sm text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
            <div className="text-left">
              <Badge className={`${overallLevel.bgColor} ${overallLevel.color} border-0 mb-2`}>
                <OverallIcon className="mr-1 h-3 w-3" />
                {overallLevel.level}
              </Badge>
              <p className="text-sm text-muted-foreground max-w-xs">
                {results.overall >= 80 && "Excellent ESG performance with strong compliance readiness"}
                {results.overall >= 60 && results.overall < 80 && "Good ESG foundation with room for improvement"}
                {results.overall >= 40 && results.overall < 60 && "Fair ESG practices, focus on key areas needed"}
                {results.overall < 40 && "Significant ESG improvements required for compliance"}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Leaf className="mr-2 h-5 w-5 text-green-600" />
              Environmental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{results.environmental}/100</span>
                <Badge variant={results.environmental >= 60 ? "default" : "destructive"}>
                  {getScoreLevel(results.environmental).level}
                </Badge>
              </div>
              <Progress value={results.environmental} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Completion: {results.completeness.environmental}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Social
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{results.social}/100</span>
                <Badge variant={results.social >= 60 ? "default" : "destructive"}>
                  {getScoreLevel(results.social).level}
                </Badge>
              </div>
              <Progress value={results.social} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Completion: {results.completeness.social}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Shield className="mr-2 h-5 w-5 text-purple-600" />
              Governance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{results.governance}/100</span>
                <Badge variant={results.governance >= 60 ? "default" : "destructive"}>
                  {getScoreLevel(results.governance).level}
                </Badge>
              </div>
              <Progress value={results.governance} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Completion: {results.completeness.governance}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Score Comparison</CardTitle>
          <CardDescription>Performance across ESG categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}/100`, 'Score']} />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Recommendations</CardTitle>
          <CardDescription>Key areas for improvement to enhance your ESG performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{rec.category}</h4>
                  <Badge variant={rec.priority === 'High' ? 'destructive' : 'secondary'}>
                    {rec.priority} Priority
                  </Badge>
                </div>
                <p className="text-sm mb-2">{rec.suggestion}</p>
                <p className="text-xs text-muted-foreground">
                  Compliance: {rec.compliance}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>Recommended actions to improve your ESG performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="px-8" onClick={handlePDFExport}>
          <Download className="mr-2 h-4 w-4" />
          Download Full Report
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
          Retake Assessment
        </Button>
      </div>
    </div>
  );
}