"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Calculator,
  ClipboardCheck,
  FileText,
  AlertCircle,
  Calendar,
  Users,
  Leaf
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { DataService } from "@/lib/auth";

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Get user's saved data
  const assessments = DataService.getAssessments();
  const calculations = DataService.getCalculations();

  // Mock stats - in real app, calculate from actual data
  const stats = {
    esgScore: assessments.length > 0 ? assessments[assessments.length - 1].overall_score || 72 : 0,
    carbonFootprint: calculations.length > 0 ? calculations[calculations.length - 1].total_emissions || 1250 : 0,
    assessmentsCompleted: assessments.length,
    reportsGenerated: 0
  };

  const recentAssessments = [
    ...assessments.slice(-2).map(a => ({
      id: a.id,
      type: "ESG Assessment",
      score: a.overall_score || 0,
      status: "Completed",
      date: new Date(a.createdAt).toLocaleDateString(),
      trend: "up"
    })),
    ...calculations.slice(-2).map(c => ({
      id: c.id,
      type: "Carbon Calculation",
      score: c.total_emissions || 0,
      status: "Completed", 
      date: new Date(c.createdAt).toLocaleDateString(),
      trend: "down"
    }))
  ].slice(-3);

  const upcomingDeadlines = [
    {
      title: "Bursa Malaysia Sustainability Report",
      date: "2024-03-31",
      daysLeft: 45,
      priority: "high"
    },
    {
      title: "Carbon Disclosure Project",
      date: "2024-04-15",
      daysLeft: 60,
      priority: "medium"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.fullName || user?.email}
        </h1>
        <p className="text-muted-foreground">
          Here's your ESG performance overview for {user?.companyName || 'your organization'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ESG Score</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.esgScore}/100</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              {stats.esgScore > 0 ? '+5 from last month' : 'Complete assessment to see score'}
            </div>
            <Progress value={stats.esgScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.carbonFootprint.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              {stats.carbonFootprint > 0 ? '-12% from last year' : 'Calculate to see footprint'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">kg CO₂e annually</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assessmentsCompleted}</div>
            <p className="text-xs text-muted-foreground">
              Completed assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reportsGenerated}</div>
            <p className="text-xs text-muted-foreground">
              Generated this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>
              Your latest ESG assessments and carbon calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAssessments.length > 0 ? (
                recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        {assessment.type === "ESG Assessment" ? (
                          <ClipboardCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Calculator className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{assessment.type}</p>
                        <p className="text-sm text-muted-foreground">{assessment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">
                        {assessment.status}
                      </Badge>
                      {assessment.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No assessments completed yet</p>
                  <p className="text-sm">Start your first ESG assessment to see results here</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/assessments">View All Assessments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Important compliance and reporting deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      deadline.priority === "high" ? "bg-red-100" : "bg-yellow-100"
                    }`}>
                      <Calendar className={`h-4 w-4 ${
                        deadline.priority === "high" ? "text-red-600" : "text-yellow-600"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{deadline.title}</p>
                      <p className="text-sm text-muted-foreground">{deadline.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{deadline.daysLeft} days</p>
                    <Badge variant={deadline.priority === "high" ? "destructive" : "secondary"}>
                      {deadline.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <AlertCircle className="mr-2 h-4 w-4" />
                View All Deadlines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Get started with your ESG journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2" asChild>
              <Link href="/tools/esg-assessment">
                <ClipboardCheck className="h-6 w-6" />
                <span>Start ESG Assessment</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
              <Link href="/tools/carbon-calculator">
                <Calculator className="h-6 w-6" />
                <span>Calculate Carbon Footprint</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
              <Link href="/dashboard/reports">
                <FileText className="h-6 w-6" />
                <span>Generate Report</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}