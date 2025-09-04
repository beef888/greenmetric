"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Eye, Settings, CheckCircle } from "lucide-react";
import { DataService } from "@/lib/auth";
import { useAuth } from "@/hooks/use-auth";

interface ReportConfig {
  title: string;
  reportType: string;
  template: string;
  includeExecutiveSummary: boolean;
  includeESGScores: boolean;
  includeCarbonData: boolean;
  includeMaterialityMatrix: boolean;
  includeRecommendations: boolean;
  customSections: string[];
  branding: {
    companyLogo: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

const reportTemplates = [
  {
    id: 'bursa-sustainability',
    name: 'Bursa Malaysia Sustainability Report',
    description: 'Comprehensive report aligned with Bursa Malaysia requirements',
    sections: ['Executive Summary', 'ESG Performance', 'Carbon Footprint', 'Materiality Assessment', 'Governance', 'Future Commitments']
  },
  {
    id: 'esg-summary',
    name: 'ESG Performance Summary',
    description: 'Concise overview of ESG performance and metrics',
    sections: ['ESG Scores', 'Key Achievements', 'Areas for Improvement', 'Action Plan']
  },
  {
    id: 'carbon-disclosure',
    name: 'Carbon Disclosure Report',
    description: 'Detailed carbon footprint and climate-related disclosures',
    sections: ['Emissions Overview', 'Scope 1-3 Breakdown', 'Reduction Targets', 'Climate Risks']
  },
  {
    id: 'stakeholder-report',
    name: 'Stakeholder Report',
    description: 'Stakeholder-focused sustainability communication',
    sections: ['Message from Leadership', 'Sustainability Highlights', 'Community Impact', 'Future Goals']
  }
];

export default function ReportGeneratorPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ReportConfig>({
    title: '',
    reportType: 'annual',
    template: '',
    includeExecutiveSummary: true,
    includeESGScores: true,
    includeCarbonData: true,
    includeMaterialityMatrix: false,
    includeRecommendations: true,
    customSections: [],
    branding: {
      companyLogo: '',
      primaryColor: '#10b981',
      secondaryColor: '#3b82f6'
    }
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  // Get user's data for report generation
  const assessments = DataService.getAssessments();
  const calculations = DataService.getCalculations();

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const latestAssessment = assessments[assessments.length - 1];
    const latestCalculation = calculations[calculations.length - 1];
    
    const report = {
      id: `report-${Date.now()}`,
      title: config.title || `${user?.companyName} Sustainability Report`,
      template: config.template,
      generatedAt: new Date().toISOString(),
      data: {
        company: {
          name: user?.companyName,
          industry: user?.industry,
          reportingPeriod: '2024'
        },
        esgScores: latestAssessment?.results || null,
        carbonData: latestCalculation?.results || null,
        sections: getSectionsForTemplate(config.template),
        config
      }
    };
    
    setGeneratedReport(report);
    setIsGenerating(false);
  };

  const getSectionsForTemplate = (templateId: string) => {
    const template = reportTemplates.find(t => t.id === templateId);
    return template?.sections || [];
  };

  const selectedTemplate = reportTemplates.find(t => t.id === config.template);

  if (generatedReport) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Report Generated Successfully!</h1>
            <p className="text-muted-foreground">
              Your sustainability report is ready for download and sharing
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{generatedReport.title}</CardTitle>
              <CardDescription>
                Generated on {new Date(generatedReport.generatedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Report Preview */}
                <div className="border rounded-lg p-6 bg-muted/50">
                  <h3 className="font-semibold mb-4">Report Contents:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatedReport.data.sections.map((section: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Report Stats */}
                {generatedReport.data.esgScores && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {generatedReport.data.esgScores.environmental}/100
                      </div>
                      <div className="text-sm text-muted-foreground">Environmental Score</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {generatedReport.data.esgScores.social}/100
                      </div>
                      <div className="text-sm text-muted-foreground">Social Score</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {generatedReport.data.esgScores.governance}/100
                      </div>
                      <div className="text-sm text-muted-foreground">Governance Score</div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Report
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8"
                    onClick={() => {
                      setGeneratedReport(null);
                      setStep(1);
                    }}
                  >
                    Generate New Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Report Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate professional sustainability reports automatically
          </p>
          <Badge variant="outline" className="mt-2">
            🇲🇾 Bursa Malaysia Compliant
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Report Configuration</span>
            <span>Step {step} of 3</span>
          </div>
          <Progress value={step * 33.33} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Select Report Template"}
              {step === 2 && "Configure Report Content"}
              {step === 3 && "Customize Branding"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Choose the type of sustainability report you want to generate"}
              {step === 2 && "Select which sections and data to include in your report"}
              {step === 3 && "Add your company branding and finalize the report"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="report-title">Report Title</Label>
                  <Input
                    id="report-title"
                    placeholder="e.g., 2024 Sustainability Report"
                    value={config.title}
                    onChange={(e) => setConfig({...config, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={config.reportType} onValueChange={(value) => setConfig({...config, reportType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Report</SelectItem>
                      <SelectItem value="quarterly">Quarterly Report</SelectItem>
                      <SelectItem value="project">Project Report</SelectItem>
                      <SelectItem value="assessment">Assessment Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Report Template</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          config.template === template.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setConfig({...config, template: template.id})}
                      >
                        <h4 className="font-medium mb-2">{template.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {template.description}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Includes: {template.sections.slice(0, 3).join(', ')}
                          {template.sections.length > 3 && ` +${template.sections.length - 3} more`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Include Data Sections</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="executive-summary"
                        checked={config.includeExecutiveSummary}
                        onCheckedChange={(checked) => 
                          setConfig({...config, includeExecutiveSummary: checked as boolean})
                        }
                      />
                      <Label htmlFor="executive-summary">Executive Summary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="esg-scores"
                        checked={config.includeESGScores}
                        onCheckedChange={(checked) => 
                          setConfig({...config, includeESGScores: checked as boolean})
                        }
                      />
                      <Label htmlFor="esg-scores">
                        ESG Performance Scores
                        {assessments.length === 0 && (
                          <span className="text-xs text-muted-foreground ml-2">(No data available)</span>
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="carbon-data"
                        checked={config.includeCarbonData}
                        onCheckedChange={(checked) => 
                          setConfig({...config, includeCarbonData: checked as boolean})
                        }
                      />
                      <Label htmlFor="carbon-data">
                        Carbon Footprint Data
                        {calculations.length === 0 && (
                          <span className="text-xs text-muted-foreground ml-2">(No data available)</span>
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="materiality-matrix"
                        checked={config.includeMaterialityMatrix}
                        onCheckedChange={(checked) => 
                          setConfig({...config, includeMaterialityMatrix: checked as boolean})
                        }
                      />
                      <Label htmlFor="materiality-matrix">Materiality Matrix</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recommendations"
                        checked={config.includeRecommendations}
                        onCheckedChange={(checked) => 
                          setConfig({...config, includeRecommendations: checked as boolean})
                        }
                      />
                      <Label htmlFor="recommendations">Recommendations & Action Plan</Label>
                    </div>
                  </div>
                </div>

                {selectedTemplate && (
                  <div>
                    <h4 className="font-medium mb-2">Template Sections</h4>
                    <div className="text-sm text-muted-foreground">
                      This template will include: {selectedTemplate.sections.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={config.branding.primaryColor}
                        onChange={(e) => setConfig({
                          ...config, 
                          branding: {...config.branding, primaryColor: e.target.value}
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={config.branding.primaryColor}
                        onChange={(e) => setConfig({
                          ...config, 
                          branding: {...config.branding, primaryColor: e.target.value}
                        })}
                        placeholder="#10b981"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={config.branding.secondaryColor}
                        onChange={(e) => setConfig({
                          ...config, 
                          branding: {...config.branding, secondaryColor: e.target.value}
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={config.branding.secondaryColor}
                        onChange={(e) => setConfig({
                          ...config, 
                          branding: {...config.branding, secondaryColor: e.target.value}
                        })}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-logo">Company Logo URL (Optional)</Label>
                  <Input
                    id="company-logo"
                    placeholder="https://example.com/logo.png"
                    value={config.branding.companyLogo}
                    onChange={(e) => setConfig({
                      ...config, 
                      branding: {...config.branding, companyLogo: e.target.value}
                    })}
                  />
                </div>

                {/* Preview */}
                <div className="border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-medium mb-2">Report Preview</h4>
                  <div className="text-sm space-y-1">
                    <div><strong>Title:</strong> {config.title || 'Untitled Report'}</div>
                    <div><strong>Template:</strong> {selectedTemplate?.name || 'None selected'}</div>
                    <div><strong>Company:</strong> {user?.companyName || 'Your Company'}</div>
                    <div><strong>Data Sources:</strong> 
                      {config.includeESGScores && ' ESG Scores'}
                      {config.includeCarbonData && ' Carbon Data'}
                      {config.includeMaterialityMatrix && ' Materiality Matrix'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < 3 ? (
                <Button 
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && !config.template}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={generateReport}
                  disabled={isGenerating || !config.template}
                >
                  {isGenerating ? (
                    <>
                      <Settings className="mr-2 h-4 w-4 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}