import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calculator,
  ClipboardCheck,
  BookOpen,
  FileText,
  BarChart3,
  Headphones,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Carbon Calculator",
    description: "Calculate Scope 1, 2, 3 emissions with Malaysian grid factors and industry benchmarks",
    href: "/tools/carbon-calculator",
    badge: "Popular"
  },
  {
    icon: ClipboardCheck,
    title: "ESG Assessment", 
    description: "Comprehensive ESG readiness evaluation aligned with Bursa Malaysia requirements",
    href: "/tools/esg-assessment",
    badge: "New"
  },
  {
    icon: BookOpen,
    title: "Regulatory Library",
    description: "Stay updated with latest ESG regulations from Bursa Malaysia, BNM, and MITI",
    href: "/resources/regulations",
    badge: null
  },
  {
    icon: FileText,
    title: "Report Templates",
    description: "Professional, compliance-ready sustainability report templates for all industries",
    href: "/resources/templates",
    badge: null
  },
  {
    icon: BarChart3,
    title: "Benchmarking",
    description: "Compare your ESG performance against industry peers and best practices",
    href: "/tools/benchmarking",
    badge: "Beta"
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Get guidance from certified sustainability professionals and ESG consultants",
    href: "/contact",
    badge: null
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything you need for{" "}
            <span className="text-primary">ESG Excellence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From carbon calculations to compliance reporting, our comprehensive platform 
            covers every aspect of your sustainability journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.href} 
              className="relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  {feature.badge && (
                    <Badge 
                      variant={feature.badge === "Popular" ? "default" : feature.badge === "New" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  {feature.description}
                </CardDescription>
                <Button variant="ghost" className="p-0 h-auto group/btn" asChild>
                  <Link href={feature.href}>
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link href="/tools">
              Explore All Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}