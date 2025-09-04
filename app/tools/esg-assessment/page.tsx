"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ESGResults } from "@/components/assessment/esg-results";
import { EnvironmentalTab } from "@/components/assessment/environmental-tab";
import { SocialTab } from "@/components/assessment/social-tab";
import { GovernanceTab } from "@/components/assessment/governance-tab";
import { ClipboardCheck, Leaf, Users, Shield, ArrowRight } from "lucide-react";
import { DataService } from "@/lib/auth";
import { useAuth } from "@/hooks/use-auth";

interface ESGData {
  environmental: Record<string, any>;
  social: Record<string, any>;
  governance: Record<string, any>;
}

export default function ESGAssessmentPage() {
  const [currentTab, setCurrentTab] = useState("environmental");
  const [data, setData] = useState<ESGData>({
    environmental: {},
    social: {},
    governance: {}
  });
  const [results, setResults] = useState<any>(null);
  const { user } = useAuth();
  const router = useRouter();

  const updateData = (section: keyof ESGData, sectionData: any) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...sectionData }
    }));
  };

  const calculateResults = () => {
    // Calculate scores for each section (simplified scoring)
    const envScore = Object.keys(data.environmental).length * 10; // Max 100
    const socScore = Object.keys(data.social).length * 10; // Max 100  
    const govScore = Object.keys(data.governance).length * 10; // Max 100

    // Weighted average (E:35%, S:30%, G:35%)
    const overallScore = Math.round((envScore * 0.35) + (socScore * 0.30) + (govScore * 0.35));

    setResults({
      environmental: Math.min(envScore, 100),
      social: Math.min(socScore, 100),
      governance: Math.min(govScore, 100),
      overall: overallScore,
      completeness: {
        environmental: Math.min((Object.keys(data.environmental).length / 10) * 100, 100),
        social: Math.min((Object.keys(data.social).length / 10) * 100, 100),
        governance: Math.min((Object.keys(data.governance).length / 10) * 100, 100)
      }
    });

    // Save assessment to local storage
    if (user) {
      const assessmentData = {
        userId: user.id,
        companyName: user.companyName,
        environmental_score: Math.min(envScore, 100),
        social_score: Math.min(socScore, 100),
        governance_score: Math.min(govScore, 100),
        overall_score: overallScore,
        responses: data,
        status: 'completed',
        results: {
          environmental: Math.min(envScore, 100),
          social: Math.min(socScore, 100),
          governance: Math.min(govScore, 100),
          overall: overallScore,
          completeness: {
            environmental: Math.min((Object.keys(data.environmental).length / 10) * 100, 100),
            social: Math.min((Object.keys(data.social).length / 10) * 100, 100),
            governance: Math.min((Object.keys(data.governance).length / 10) * 100, 100)
          }
        }
      };
      DataService.saveAssessment(assessmentData);
    }
  };

  const getCompletionPercentage = () => {
    const totalQuestions = 30; // 10 per section
    const answeredQuestions = Object.keys(data.environmental).length + 
                             Object.keys(data.social).length + 
                             Object.keys(data.governance).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  if (results) {
    return (
      <div className="container-custom py-12">
        <ESGResults 
          results={results}
          onStartOver={() => {
            setResults(null);
            setData({ environmental: {}, social: {}, governance: {} });
            setCurrentTab("environmental");
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <ClipboardCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            ESG Readiness Assessment
          </h1>
          <p className="text-lg text-muted-foreground">
            Evaluate your compliance with Malaysian ESG requirements
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Badge variant="outline">🇲🇾 Bursa Malaysia Aligned</Badge>
            <Badge variant="outline">📊 30 Key Criteria</Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Assessment Progress</span>
            <span>{getCompletionPercentage()}% Complete</span>
          </div>
          <Progress value={getCompletionPercentage()} className="h-2" />
        </div>

        {/* Assessment Card */}
        <Card>
          <CardHeader>
            <CardTitle>ESG Assessment Framework</CardTitle>
            <CardDescription>
              Complete all three sections to receive your comprehensive ESG readiness score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="environmental" className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4" />
                  <span>Environmental</span>
                  <Badge variant="outline" className="ml-1 text-xs">
                    {Object.keys(data.environmental).length}/10
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Social</span>
                  <Badge variant="outline" className="ml-1 text-xs">
                    {Object.keys(data.social).length}/10
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="governance" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Governance</span>
                  <Badge variant="outline" className="ml-1 text-xs">
                    {Object.keys(data.governance).length}/10
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="environmental" className="mt-6">
                <EnvironmentalTab 
                  data={data.environmental} 
                  onUpdate={(envData) => updateData('environmental', envData)} 
                />
              </TabsContent>

              <TabsContent value="social" className="mt-6">
                <SocialTab 
                  data={data.social} 
                  onUpdate={(socData) => updateData('social', socData)} 
                />
              </TabsContent>

              <TabsContent value="governance" className="mt-6">
                <GovernanceTab 
                  data={data.governance} 
                  onUpdate={(govData) => updateData('governance', govData)} 
                />
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <div className="flex space-x-2">
                {currentTab !== "environmental" && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      if (currentTab === "social") setCurrentTab("environmental");
                      if (currentTab === "governance") setCurrentTab("social");
                    }}
                  >
                    Previous Section
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-2">
                {currentTab !== "governance" && (
                  <Button 
                    onClick={() => {
                      if (currentTab === "environmental") setCurrentTab("social");
                      if (currentTab === "social") setCurrentTab("governance");
                    }}
                  >
                    Next Section
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                
                {currentTab === "governance" && (
                  <Button onClick={calculateResults} size="lg">
                    Calculate ESG Score
                    <ClipboardCheck className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}