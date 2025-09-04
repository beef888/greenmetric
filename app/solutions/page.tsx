"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Building,
  Users,
  Headphones,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Shield,
  TrendingUp,
  Globe
} from "lucide-react";

const solutions = [
  {
    id: "enterprise",
    icon: Building,
    title: "Enterprise Solutions",
    subtitle: "For Large Organizations",
    description: "Comprehensive ESG management for multinational corporations and large enterprises with complex sustainability requirements.",
    features: [
      "Multi-entity management across regions",
      "Advanced data analytics and reporting",
      "Custom ESG frameworks and metrics",
      "Dedicated account management",
      "API integrations with existing systems",
      "White-label deployment options",
      "24/7 priority support",
      "Compliance consulting services"
    ],
    benefits: [
      "Streamline ESG reporting across all subsidiaries",
      "Meet global and local regulatory requirements",
      "Benchmark against industry leaders",
      "Reduce compliance costs by up to 60%"
    ],
    pricing: "Custom pricing based on requirements",
    cta: "Schedule Enterprise Demo",
    href: "/contact?solution=enterprise",
    popular: false
  },
  {
    id: "sme",
    icon: Users,
    title: "SME Solutions",
    subtitle: "For Small-Medium Enterprises",
    description: "Affordable, easy-to-use ESG tools designed specifically for Malaysian SMEs to meet Bursa Malaysia requirements.",
    features: [
      "Simplified ESG assessment process",
      "Pre-built Malaysian compliance templates",
      "Step-by-step guidance and tutorials",
      "Industry-specific benchmarking",
      "Automated report generation",
      "Email and chat support",
      "Mobile-friendly interface",
      "Cost-effective pricing plans"
    ],
    benefits: [
      "Get ESG-ready in weeks, not months",
      "Access enterprise-grade tools at SME prices",
      "Improve competitiveness for tenders",
      "Prepare for future listing requirements"
    ],
    pricing: "Starting from RM 299/month",
    cta: "Start Free Trial",
    href: "/auth/signup?solution=sme",
    popular: true
  },
  {
    id: "consultants",
    icon: Headphones,
    title: "Consultant Solutions",
    subtitle: "For ESG Professionals",
    description: "Professional-grade platform for ESG consultants and advisors to serve multiple clients efficiently.",
    features: [
      "Multi-client dashboard management",
      "White-label reporting capabilities",
      "Client collaboration tools",
      "Professional service templates",
      "Bulk assessment processing",
      "Revenue sharing opportunities",
      "Training and certification programs",
      "Partner support network"
    ],
    benefits: [
      "Scale your consulting practice efficiently",
      "Deliver consistent, high-quality reports",
      "Reduce project delivery time by 50%",
      "Access exclusive partner resources"
    ],
    pricing: "Partner pricing available",
    cta: "Join Partner Program",
    href: "/contact?solution=consultants",
    popular: false
  }
];

const industries = [
  {
    name: "Financial Services",
    description: "Banks, insurance, asset management",
    companies: "50+ companies",
    icon: Building
  },
  {
    name: "Manufacturing",
    description: "Industrial, automotive, electronics",
    companies: "120+ companies",
    icon: Target
  },
  {
    name: "Real Estate",
    description: "REITs, property development",
    companies: "80+ companies",
    icon: Shield
  },
  {
    name: "Technology",
    description: "Software, telecommunications, fintech",
    companies: "60+ companies",
    icon: TrendingUp
  },
  {
    name: "Healthcare",
    description: "Hospitals, pharmaceuticals, medical devices",
    companies: "40+ companies",
    icon: Globe
  },
  {
    name: "Energy & Utilities",
    description: "Power generation, oil & gas, renewables",
    companies: "30+ companies",
    icon: Star
  }
];

export default function SolutionsPage() {
  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          ESG Solutions for <span className="text-primary">Every Business</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Whether you're a growing SME, large enterprise, or ESG consultant, we have 
          tailored solutions to meet your specific sustainability needs.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {solutions.map((solution) => {
          const SolutionIcon = solution.icon;
          return (
            <Card 
              key={solution.id} 
              className={`relative ${solution.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {solution.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full ${solution.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                    <SolutionIcon className={`h-8 w-8 ${solution.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                </div>
                <CardTitle className="text-2xl">{solution.title}</CardTitle>
                <CardDescription className="text-base font-medium text-primary">
                  {solution.subtitle}
                </CardDescription>
                <CardDescription className="text-base mt-2">
                  {solution.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    {solution.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {solution.features.length > 4 && (
                      <div className="text-sm text-muted-foreground">
                        +{solution.features.length - 4} more features
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Key Benefits:</h4>
                  <div className="space-y-2">
                    {solution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-center mb-4">
                    <div className="font-semibold text-lg">{solution.pricing}</div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant={solution.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href={solution.href}>
                      {solution.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Industries We Serve */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform is trusted by companies across all major Malaysian industries, 
            with industry-specific templates and benchmarks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const IndustryIcon = industry.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IndustryIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{industry.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{industry.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {industry.companies}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how Malaysian companies are achieving ESG excellence with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary">60%</div>
                <div className="text-sm text-muted-foreground">Reduction in reporting time</div>
              </div>
              <blockquote className="text-sm italic text-center">
                "GreenMetric transformed our ESG reporting process. What used to take months now takes weeks."
              </blockquote>
              <div className="text-center mt-3">
                <div className="font-medium text-sm">- CFO, Manufacturing Company</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Compliance accuracy rate</div>
              </div>
              <blockquote className="text-sm italic text-center">
                "The platform's Malaysian-specific guidance helped us achieve perfect compliance scores."
              </blockquote>
              <div className="text-center mt-3">
                <div className="font-medium text-sm">- Sustainability Manager, Bank</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-primary">40%</div>
                <div className="text-sm text-muted-foreground">Cost savings on consulting</div>
              </div>
              <blockquote className="text-sm italic text-center">
                "We reduced our external consulting costs significantly while improving our ESG performance."
              </blockquote>
              <div className="text-center mt-3">
                <div className="font-medium text-sm">- CEO, Technology Startup</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="py-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your ESG Journey?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join hundreds of Malaysian companies already using our platform to excel 
            in ESG performance and regulatory compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Schedule Demo
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}