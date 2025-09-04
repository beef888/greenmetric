"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Trash2,
  ClipboardCheck,
  Calculator
} from "lucide-react";
import { DataService } from "@/lib/auth";

export default function AssessmentsPage() {
  // Get user's saved data
  const assessments = DataService.getAssessments();
  const calculations = DataService.getCalculations();

  // Combine assessments and calculations
  const allAssessments = [
    ...assessments.map(a => ({
      id: a.id,
      type: "ESG Assessment",
      title: `ESG Assessment - ${new Date(a.createdAt).toLocaleDateString()}`,
      status: "Completed",
      score: a.overall_score || 0,
      date: new Date(a.createdAt).toLocaleDateString(),
      lastModified: new Date(a.updatedAt || a.createdAt).toLocaleDateString()
    })),
    ...calculations.map(c => ({
      id: c.id,
      type: "Carbon Calculation",
      title: `Carbon Footprint - ${new Date(c.createdAt).toLocaleDateString()}`,
      status: "Completed",
      score: c.total_emissions || 0,
      date: new Date(c.createdAt).toLocaleDateString(),
      lastModified: new Date(c.createdAt).toLocaleDateString()
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Review":
        return "secondary";
      case "Draft":
        return "outline";
      default:
        return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "ESG Assessment" ? ClipboardCheck : Calculator;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground">
            Manage your ESG assessments and carbon calculations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/tools/esg-assessment">
              <Plus className="mr-2 h-4 w-4" />
              New Assessment
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allAssessments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ESG Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{assessments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Carbon Calculations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{calculations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average ESG Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments.length > 0 
                ? Math.round(assessments.reduce((sum, a) => sum + (a.overall_score || 0), 0) / assessments.length)
                : 0
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Assessments</CardTitle>
              <CardDescription>
                View and manage your assessment history
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search assessments..." className="pl-8 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {allAssessments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAssessments.map((assessment) => {
                  const TypeIcon = getTypeIcon(assessment.type);
                  return (
                    <TableRow key={assessment.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <TypeIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{assessment.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{assessment.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {assessment.type === "ESG Assessment" 
                            ? `${assessment.score}/100`
                            : `${assessment.score.toLocaleString()} kg CO₂e`
                          }
                        </div>
                      </TableCell>
                      <TableCell>{assessment.date}</TableCell>
                      <TableCell>{assessment.lastModified}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <ClipboardCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">No assessments yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your first ESG assessment or carbon calculation to see results here.
              </p>
              <div className="flex justify-center space-x-2">
                <Button asChild>
                  <Link href="/tools/esg-assessment">
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Start ESG Assessment
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/tools/carbon-calculator">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Carbon Footprint
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" asChild>
          <Link href="/tools/esg-assessment">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
                Start ESG Assessment
              </CardTitle>
              <CardDescription>
                Complete a comprehensive ESG readiness evaluation
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" asChild>
          <Link href="/tools/carbon-calculator">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-primary" />
                Calculate Carbon Footprint
              </CardTitle>
              <CardDescription>
                Measure your organization's carbon emissions
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  );
}