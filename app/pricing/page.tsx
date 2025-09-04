"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Check,
  Star,
  Users,
  Building,
  Crown,
  ArrowRight,
  Calculator,
  ClipboardCheck,
  FileText,
  BarChart3,
  Headphones,
  Shield
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started with ESG",
    price: "RM 299",
    period: "/month",
    popular: false,
    icon: Users,
    features: [
      "ESG Assessment Tool",
      "Carbon Calculator (Basic)",
      "5 Report Templates",
      "Email Support",
      "Basic Analytics",
      "Up to 3 Users"
    ],
    limitations: [
      "Limited to 10 assessments/month",
      "Basic carbon scopes only",
      "Standard report templates"
    ],
    cta: "Start Free Trial",
    href: "/auth/signup?plan=starter"
  },
  {
    name: "Professional",
    description: "Comprehensive ESG management for growing companies",
    price: "RM 899",
    period: "/month",
    popular: true,
    icon: Building,
    features: [
      "Everything in Starter",
      "Advanced Carbon Calculator",
      "Materiality Matrix Tool",
      "15 Premium Templates",
      "Industry Benchmarking",
      "Priority Support",
      "Advanced Analytics",
      "Up to 10 Users",
      "Custom Branding",
      "API Access"
    ],
    limitations: [
      "Up to 50 assessments/month"
    ],
    cta: "Start Free Trial",
    href: "/auth/signup?plan=professional"
  },
  {
    name: "Enterprise",
    description: "Full-scale ESG solution for large organizations",
    price: "Custom",
    period: "pricing",
    popular: false,
    icon: Crown,
    features: [
      "Everything in Professional",
      "Unlimited Assessments",
      "Custom Tool Development",
      "Dedicated Account Manager",
      "24/7 Phone Support",
      "Custom Integrations",
      "Advanced Security",
      "Unlimited Users",
      "White-label Options",
      "Compliance Consulting"
    ],
    limitations: [],
    cta: "Contact Sales",
    href: "/contact?plan=enterprise"
  }
];

const features = [
  {
    icon: ClipboardCheck,
    title: "ESG Assessment",
    description: "Comprehensive evaluation aligned with Bursa Malaysia requirements"
  },
  {
    icon: Calculator,
    title: "Carbon Calculator",
    description: "Calculate Scope 1, 2, 3 emissions with Malaysian factors"
  },
  {
    icon: FileText,
    title: "Report Generator",
    description: "Professional sustainability reports with custom branding"
  },
  {
    icon: BarChart3,
    title: "Benchmarking",
    description: "Compare performance against Malaysian industry standards"
  },
  {
    icon: Shield,
    title: "Compliance Tracking",
    description: "Stay updated with latest regulatory requirements"
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Access to certified ESG professionals and consultants"
  }
];

const faqs = [
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all plans. No credit card required to start."
  },
  {
    question: "Can I change plans anytime?",
    answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use enterprise-grade security with SOC 2 compliance and data encryption at rest and in transit."
  },
  {
    question: "Do you offer training?",
    answer: "Yes, we provide comprehensive onboarding and training sessions for all Professional and Enterprise customers."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and can arrange invoicing for Enterprise customers."
  }
];

export default function PricingPage() {
  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Simple, <span className="text-primary">Transparent Pricing</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the perfect plan for your ESG journey. All plans include core features 
          with no hidden fees. Start with a 14-day free trial.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => {
          const PlanIcon = plan.icon;
          return (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${plan.popular ? 'bg-primary/10' : 'bg-muted'}`}>
                    <PlanIcon className={`h-8 w-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {plan.limitations.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Limitations:</div>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {limitation}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Overview */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need for ESG Success</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform includes all the tools and resources Malaysian 
            businesses need to excel in ESG performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Have questions? We have answers.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="py-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your ESG Journey?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join hundreds of Malaysian companies already using GreenMetric to manage 
            their ESG performance and compliance requirements.
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
                Contact Sales
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}