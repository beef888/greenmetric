import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  AlertCircle,
  TrendingUp,
  Users,
  Download,
  Search,
  Filter
} from "lucide-react";

const resourceCategories = [
  {
    icon: BookOpen,
    title: "Compliance Guides",
    description: "Comprehensive guides for Bursa Malaysia, BNM, and MITI requirements",
    href: "/resources/guides",
    count: "15 guides",
    items: [
      "Bursa Malaysia Sustainability Reporting Guide",
      "Bank Negara Climate Risk Management",
      "MITI Green Technology Guidelines"
    ]
  },
  {
    icon: FileText,
    title: "Report Templates",
    description: "Ready-to-use templates for sustainability and ESG reporting",
    href: "/resources/templates",
    count: "25 templates",
    items: [
      "Sustainability Report Template",
      "Carbon Disclosure Template", 
      "ESG Data Collection Sheet"
    ]
  },
  {
    icon: AlertCircle,
    title: "Regulatory Updates",
    description: "Latest changes in ESG regulations and compliance requirements",
    href: "/resources/regulations",
    count: "Latest updates",
    items: [
      "New Bursa Requirements 2024",
      "BNM Climate Guidelines Update",
      "TCFD Implementation Timeline"
    ]
  },
  {
    icon: TrendingUp,
    title: "Case Studies",
    description: "Real-world examples of successful ESG implementations",
    href: "/resources/case-studies",
    count: "12 case studies",
    items: [
      "Public Bank ESG Journey",
      "Genting Carbon Neutrality Plan",
      "IHH Healthcare Sustainability"
    ]
  },
  {
    icon: Users,
    title: "Industry Benchmarks",
    description: "Performance benchmarks across Malaysian industries",
    href: "/resources/benchmarks",
    count: "8 industries",
    items: [
      "Banking & Finance ESG Metrics",
      "Manufacturing Sustainability KPIs",
      "REIT ESG Performance Data"
    ]
  }
];

const allResources = [
  {
    id: 1,
    title: "Bursa Malaysia Sustainability Reporting Guide 2024",
    category: "Compliance Guides",
    type: "PDF Guide",
    industry: "All Industries",
    framework: "Bursa Malaysia",
    downloadCount: 1250,
    rating: 4.8,
    size: "2.4 MB",
    description: "Complete guide to Bursa Malaysia sustainability reporting requirements"
  },
  {
    id: 2,
    title: "Carbon Accounting Template for Malaysian SMEs",
    category: "Report Templates",
    type: "Excel Template",
    industry: "All Industries", 
    framework: "GHG Protocol",
    downloadCount: 890,
    rating: 4.6,
    size: "1.8 MB",
    description: "Ready-to-use carbon accounting spreadsheet with Malaysian emission factors"
  },
  {
    id: 3,
    title: "Bank Negara Climate Risk Management Guidelines",
    category: "Regulatory Updates",
    type: "Regulatory Guide",
    industry: "Financial Services",
    framework: "BNM Guidelines",
    downloadCount: 567,
    rating: 4.9,
    size: "3.2 MB",
    description: "Latest climate risk management requirements for financial institutions"
  },
  {
    id: 4,
    title: "Manufacturing ESG Benchmarks Malaysia 2024",
    category: "Industry Benchmarks",
    type: "Research Report",
    industry: "Manufacturing",
    framework: "Industry Analysis",
    downloadCount: 445,
    rating: 4.5,
    size: "4.1 MB",
    description: "Comprehensive ESG performance benchmarks for Malaysian manufacturers"
  },
  {
    id: 5,
    title: "TCFD Implementation Roadmap",
    category: "Case Studies",
    type: "Implementation Guide",
    industry: "All Industries",
    framework: "TCFD",
    downloadCount: 723,
    rating: 4.7,
    size: "2.9 MB",
    description: "Step-by-step guide to implementing TCFD recommendations"
  }
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedFramework, setSelectedFramework] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesIndustry = selectedIndustry === "all" || resource.industry === selectedIndustry || resource.industry === "All Industries";
    const matchesFramework = selectedFramework === "all" || resource.framework === selectedFramework;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesFramework;
  });

  return (
    <div className="container-custom py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          ESG <span className="text-primary">Resource Library</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Access comprehensive guides, templates, and insights to navigate Malaysia's 
          ESG regulatory landscape with confidence.
        </p>
      </div>

      {/* Featured Resource */}
      <Card className="mb-12 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="default" className="mb-2">Featured Resource</Badge>
              <CardTitle className="text-2xl">
                Complete Guide to Bursa Malaysia Sustainability Reporting 2024
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Everything you need to know about the latest Bursa Malaysia sustainability 
                reporting requirements, with step-by-step guidance and practical examples.
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">FREE</div>
              <div className="text-sm text-muted-foreground">120 pages</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/resources/bursa-guide-2024">
                <Download className="mr-2 h-4 w-4" />
                Download Guide
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/resources/bursa-guide-2024#preview">
                Preview Contents
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {resourceCategories.map((category) => (
          <Card key={category.href} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      {category.count}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed mb-4">
                {category.description}
              </CardDescription>
              
              <div className="space-y-2 mb-6">
                <div className="text-sm font-medium">Popular Resources:</div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {category.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full" variant="outline" asChild>
                <Link href={category.href}>
                  Browse All
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resource Library</CardTitle>
              <CardDescription>
                Search and filter through our comprehensive collection of ESG resources
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Compliance Guides">Compliance Guides</SelectItem>
                      <SelectItem value="Report Templates">Report Templates</SelectItem>
                      <SelectItem value="Regulatory Updates">Regulatory Updates</SelectItem>
                      <SelectItem value="Case Studies">Case Studies</SelectItem>
                      <SelectItem value="Industry Benchmarks">Industry Benchmarks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry</label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="Financial Services">Financial Services</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Framework</label>
                  <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Frameworks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Frameworks</SelectItem>
                      <SelectItem value="Bursa Malaysia">Bursa Malaysia</SelectItem>
                      <SelectItem value="GHG Protocol">GHG Protocol</SelectItem>
                      <SelectItem value="TCFD">TCFD</SelectItem>
                      <SelectItem value="BNM Guidelines">BNM Guidelines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resource Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            Resources ({filteredResources.length})
          </CardTitle>
          <CardDescription>
            {searchTerm && `Results for "${searchTerm}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium">{resource.title}</h3>
                      <Badge variant="outline">{resource.type}</Badge>
                      {resource.industry !== "All Industries" && (
                        <Badge variant="secondary">{resource.industry}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>📁 {resource.category}</span>
                      <span>⭐ {resource.rating}</span>
                      <span>📥 {resource.downloadCount} downloads</span>
                      <span>📄 {resource.size}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter CTA */}
      <Card className="mt-16 text-center bg-muted/50">
        <CardContent className="py-12">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with ESG Insights</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest regulatory updates, industry insights, and best practices 
            delivered to your inbox every month.
          </p>
          <Button size="lg">
            Subscribe to Newsletter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}