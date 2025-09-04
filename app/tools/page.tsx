import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calculator,
  ClipboardCheck,
  FileText,
  BarChart3,
  Target,
  Users
} from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Carbon Calculator",
    description: "Calculate your organization's carbon footprint using Malaysian emission factors",
    href: "/tools/carbon-calculator",
    badge: "Popular",
    features: ["Scope 1, 2, 3 emissions", "Malaysian grid factors", "Industry benchmarks"]
  },
  {
    icon: ClipboardCheck,
    title: "ESG Assessment",
    description: "Comprehensive ESG readiness evaluation aligned with regulatory requirements",
    href: "/tools/esg-assessment", 
    badge: "New",
    features: ["50+ ESG criteria", "Regulatory compliance", "Scoring & recommendations"]
  },
  {
    icon: Target,
    title: "Materiality Matrix",
    description: "Identify and prioritize your most material ESG topics",
    href: "/tools/materiality-matrix",
    badge: null,
    features: ["Stakeholder mapping", "Impact assessment", "Visual matrix"]
  },
  {
    icon: FileText,
    title: "Report Generator",
    description: "Generate professional sustainability reports automatically",
    href: "/tools/report-generator",
    badge: "Beta",
    features: ["Automated reports", "Custom templates", "Export formats"]
  },
  {
    icon: BarChart3,
    title: "Benchmarking",
    description: "Compare your ESG performance against industry peers",
    href: "/tools/benchmarking",
    badge: "Coming Soon",
    features: ["Industry comparisons", "Peer analysis", "Performance trends"]
  },
  {
    icon: Users,
    title: "Stakeholder Survey",
    description: "Collect stakeholder feedback on ESG priorities and performance",
    href: "/tools/stakeholder-survey",
    badge: "Coming Soon",
    features: ["Survey builder", "Response analytics", "Stakeholder mapping"]
  }
];

export default function ToolsPage() {
  return (
    <div className="container-custom py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          ESG <span className="text-primary">Assessment Tools</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Professional-grade tools designed specifically for Malaysian businesses to navigate 
          ESG compliance and sustainability reporting requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <Card key={tool.href} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                {tool.badge && (
                  <Badge 
                    variant={
                      tool.badge === "Popular" ? "default" : 
                      tool.badge === "New" ? "secondary" : 
                      tool.badge === "Beta" ? "outline" : "outline"
                    }
                    className="text-xs"
                  >
                    {tool.badge}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {tool.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed mb-4">
                {tool.description}
              </CardDescription>
              
              <ul className="space-y-1 mb-6 text-sm text-muted-foreground">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={tool.badge === "Coming Soon" ? "outline" : "default"}
                disabled={tool.badge === "Coming Soon"}
                asChild={tool.badge !== "Coming Soon"}
              >
                {tool.badge === "Coming Soon" ? (
                  "Coming Soon"
                ) : (
                  <Link href={tool.href}>
                    Try Now
                  </Link>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}