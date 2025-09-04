"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  ArrowRight, 
  Play,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      
      <div className="container-custom relative">
        <div className="text-center space-y-8">
          {/* Badge */}
          <Badge variant="outline" className="mx-auto">
            🇲🇾 Built for Malaysian Businesses
          </Badge>

          {/* Headlines */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
              Malaysia's{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                ESG Compliance
              </span>
              <br />
              Made Simple
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Navigate Bursa Malaysia sustainability requirements with confidence. 
              Complete ESG assessments, calculate carbon footprints, and generate 
              compliance-ready reports in minutes.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <Link href="/tools/esg-assessment">
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              View Demo
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Malaysian Companies</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <TrendingUp className="h-8 w-8 text-secondary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-secondary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Compliance Rate</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Clock className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-accent mb-1">45min</div>
                <div className="text-sm text-muted-foreground">Average Setup Time</div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">Trusted by leading Malaysian organizations</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-lg font-semibold">Bursa Malaysia</div>
              <div className="w-px h-6 bg-border"></div>
              <div className="text-lg font-semibold">Bank Negara</div>
              <div className="w-px h-6 bg-border"></div>
              <div className="text-lg font-semibold">MITI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}