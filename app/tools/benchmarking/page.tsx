"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { BarChart3, TrendingUp, Award, Target, Building, Users } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { DataService } from "@/lib/auth";

const industryBenchmarks = {
  "Financial Services": {
    avgESGScore: 78,
    avgCarbonIntensity: 12.5, // kg CO2e per employee
    topPerformers: ["Public Bank", "CIMB Group", "RHB Bank"],
    trends: {
      environmental: [65, 68, 72, 75, 78],
      social: [72, 74, 76, 78, 80],
      governance: [80, 82, 83, 85, 87]
    }
  },
  "Manufacturing": {
    avgESGScore: 65,
    avgCarbonIntensity: 45.2,
    topPerformers: ["Genting Group", "IOI Corporation", "Sime Darby"],
    trends: {
      environmental: [55, 58, 60, 63, 65],
      social: [68, 70, 72, 74, 76],
      governance: [75, 76, 78, 79, 81]
    }
  },
  "Technology": {
    avgESGScore: 72,
    avgCarbonIntensity: 8.3,
    topPerformers: ["Axiata Group", "TM Group", "Silverlake Axis"],
    trends: {
      environmental: [60, 64, 68, 70, 72],
      social: [75, 77, 79, 81, 83],
      governance: [78, 79, 80, 82, 84]
    }
  },
  "Healthcare": {
    avgESGScore: 69,
    avgCarbonIntensity: 18.7,
    topPerformers: ["IHH Healthcare", "KPJ Healthcare", "Pharmaniaga"],
    trends: {
      environmental: [58, 61, 64, 67, 69],
      social: [80, 82, 84, 86, 88],
      governance: [72, 74, 76, 78, 80]
    }
  }
};

const malaysianMarketData = {
  averageESGScore: 71,
  topQuartile: 85,
  medianScore: 68,
  bottomQuartile: 52,
  carbonIntensityAvg: 28.4,
  complianceRate: 87
};

export default function BenchmarkingPage() {
  const { user } = useAuth();
  const [selectedIndustry, setSelectedIndustry] = useState(user?.industry || "Financial Services");
  const [activeTab, setActiveTab] = useState("overview");

  // Get user's latest data
  const assessments = DataService.getAssessments();
  const calculations = DataService.getCalculations();
  const latestAssessment = assessments[assessments.length - 1];
  const latestCalculation = calculations[calculations.length - 1];

  const userESGScore = latestAssessment?.overall_score || 0;
  const userCarbonFootprint = latestCalculation?.total_emissions || 0;

  const industryData = industryBenchmarks[selectedIndustry as keyof typeof industryBenchmarks] || industryBenchmarks["Financial Services"];

  const comparisonData = [
    {
      name: 'Your Company',
      Environmental: latestAssessment?.environmental_score || 0,
      Social: latestAssessment?.social_score || 0,
      Governance: latestAssessment?.governance_score || 0,
      Overall: userESGScore
    },
    {
      name: 'Industry Average',
      Environmental: industryData.trends.environmental[4],
      Social: industryData.trends.social[4],
      Governance: industryData.trends.governance[4],
      Overall: industryData.avgESGScore
    },
    {
      name: 'Top Quartile',
      Environmental: Math.min(industryData.trends.environmental[4] + 15, 100),
      Social: Math.min(industryData.trends.social[4] + 12, 100),
      Governance: Math.min(industryData.trends.governance[4] + 10, 100),
      Overall: Math.min(industryData.avgESGScore + 15, 100)
    }
  ];

  const trendData = [
    { year: '2020', industry: industryData.trends.environmental[0], user: Math.max(0, userESGScore - 20) },
    { year: '2021', industry: industryData.trends.environmental[1], user: Math.max(0, userESGScore - 15) },
    { year: '2022', industry: industryData.trends.environmental[2], user: Math.max(0, userESGScore - 10) },
    { year: '2023', industry: industryData.trends.environmental[3], user: Math.max(0, userESGScore - 5) },
    { year: '2024', industry: industryData.trends.environmental[4], user: userESGScore }
  ];

  const radarData = [
    { subject: 'Environmental', A: latestAssessment?.environmental_score || 0, B: industryData.trends.environmental[4], fullMark: 100 },
    { subject: 'Social', A: latestAssessment?.social_score || 0, B: industryData.trends.social[4], fullMark: 100 },
    { subject: 'Governance', A: latestAssessment?.governance_score || 0, B: industryData.trends.governance[4], fullMark: 100 },
    { subject: 'Innovation', A: Math.min((latestAssessment?.overall_score || 0) + 5, 100), B: industryData.avgESGScore + 3, fullMark: 100 },
    { subject: 'Transparency', A: Math.min((latestAssessment?.governance_score || 0) + 3, 100), B: industryData.trends.governance[4] + 2, fullMark: 100 }
  ];

  const getPerformanceLevel = (score: number, benchmark: number) => {
    const diff = score - benchmark;
    if (diff >= 10) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100" };
    if (diff >= 0) return { level: "Above Average", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (diff >= -10) return { level: "Below Average", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const performanceLevel = getPerformanceLevel(userESGScore, industryData.avgESGScore);

  return (
    <div className="container-custom py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            ESG Benchmarking
          </h1>
          <p className="text-lg text-muted-foreground">
            Compare your ESG performance against Malaysian industry standards
          </p>
          <Badge variant="outline" className="mt-2">
            🇲🇾 Malaysian Market Data
          </Badge>
        </div>

        {/* Industry Selection */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Industry for Comparison</CardTitle>
              <CardDescription>
                Choose your industry to see relevant benchmarks and peer comparisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(industryBenchmarks).map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="peers">Peer Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Your ESG Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userESGScore}/100</div>
                  <Badge className={`${performanceLevel.bgColor} ${performanceLevel.color} border-0 mt-2`}>
                    {performanceLevel.level}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Industry Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{industryData.avgESGScore}/100</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {selectedIndustry}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Market Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userESGScore > malaysianMarketData.topQuartile ? "Top 25%" :
                     userESGScore > malaysianMarketData.medianScore ? "Top 50%" :
                     userESGScore > malaysianMarketData.bottomQuartile ? "Bottom 50%" : "Bottom 25%"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Malaysian Market
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Improvement Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    +{Math.max(0, industryData.avgESGScore - userESGScore)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Points to industry avg
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>ESG Score Comparison</CardTitle>
                <CardDescription>
                  Your performance vs industry benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Environmental" fill="#10b981" />
                    <Bar dataKey="Social" fill="#3b82f6" />
                    <Bar dataKey="Governance" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Performance Analysis</CardTitle>
                <CardDescription>
                  Multi-dimensional comparison across key ESG areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Your Company" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="Industry Average" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Improvement Recommendations</CardTitle>
                <CardDescription>
                  Based on your performance vs industry benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      area: "Environmental",
                      current: latestAssessment?.environmental_score || 0,
                      target: industryData.trends.environmental[4],
                      recommendation: "Focus on energy efficiency and renewable energy adoption"
                    },
                    {
                      area: "Social",
                      current: latestAssessment?.social_score || 0,
                      target: industryData.trends.social[4],
                      recommendation: "Enhance employee welfare programs and community engagement"
                    },
                    {
                      area: "Governance",
                      current: latestAssessment?.governance_score || 0,
                      target: industryData.trends.governance[4],
                      recommendation: "Strengthen board independence and risk management"
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{item.area}</h4>
                        <Badge variant={item.current >= item.target ? "default" : "secondary"}>
                          {item.current}/{item.target}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {/* Trend Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>5-Year ESG Performance Trends</CardTitle>
                <CardDescription>
                  Historical performance comparison with industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="industry" stroke="#3b82f6" name="Industry Average" />
                    <Line type="monotone" dataKey="user" stroke="#10b981" name="Your Performance" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="peers" className="space-y-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-yellow-500" />
                  Industry Leaders
                </CardTitle>
                <CardDescription>
                  Top performing companies in {selectedIndustry}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryData.topPerformers.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{company}</div>
                          <div className="text-sm text-muted-foreground">ESG Leader</div>
                        </div>
                      </div>
                      <Badge variant="default">
                        {Math.floor(industryData.avgESGScore + Math.random() * 15 + 5)}/100
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5 text-blue-500" />
                  Malaysian Market Overview
                </CardTitle>
                <CardDescription>
                  Overall ESG performance statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{malaysianMarketData.averageESGScore}</div>
                    <div className="text-sm text-muted-foreground">Market Average</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{malaysianMarketData.topQuartile}</div>
                    <div className="text-sm text-muted-foreground">Top Quartile</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{malaysianMarketData.complianceRate}%</div>
                    <div className="text-sm text-muted-foreground">Compliance Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}