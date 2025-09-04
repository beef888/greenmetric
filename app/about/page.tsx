"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Target,
  Users,
  Award,
  Globe,
  Leaf,
  Building,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb
} from "lucide-react";

const stats = [
  { label: "Malaysian Companies Served", value: "500+", icon: Building },
  { label: "ESG Assessments Completed", value: "2,000+", icon: Target },
  { label: "Carbon Calculations", value: "1,500+", icon: Leaf },
  { label: "Compliance Rate", value: "98%", icon: Award }
];

const values = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description: "We believe every Malaysian business can contribute to a sustainable future while achieving commercial success."
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We maintain the highest standards of data security and provide transparent, actionable insights."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously innovate to make ESG compliance simpler and more accessible for all businesses."
  },
  {
    icon: Heart,
    title: "Local Impact",
    description: "We're committed to supporting Malaysia's transition to a sustainable, low-carbon economy."
  }
];

const team = [
  {
    name: "Dr. Sarah Lim",
    role: "CEO & Co-Founder",
    bio: "Former sustainability director at Bursa Malaysia with 15+ years in ESG consulting.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Ahmad Rahman",
    role: "CTO & Co-Founder", 
    bio: "Tech entrepreneur with expertise in fintech and regulatory compliance platforms.",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "Lisa Wong",
    role: "Head of ESG Advisory",
    bio: "Certified ESG analyst with deep knowledge of Malaysian regulatory landscape.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    name: "David Tan",
    role: "Head of Product",
    bio: "Product strategist focused on creating intuitive ESG management solutions.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

const milestones = [
  {
    year: "2022",
    title: "Company Founded",
    description: "GreenMetric.my was established to address the growing need for ESG compliance in Malaysia."
  },
  {
    year: "2023",
    title: "Platform Launch",
    description: "Launched our comprehensive ESG assessment and carbon calculation platform."
  },
  {
    year: "2023",
    title: "100+ Customers",
    description: "Reached our first 100 Malaysian companies using our platform."
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Recognized as Malaysia's leading ESG technology platform by industry experts."
  }
];

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          About <span className="text-primary">GreenMetric</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to make ESG compliance simple, accessible, and impactful 
          for every Malaysian business, regardless of size or industry.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="py-12 text-center">
          <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To empower Malaysian businesses with the tools, insights, and expertise they need 
            to excel in ESG performance, meet regulatory requirements, and contribute to a 
            sustainable future for Malaysia and beyond.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <StatIcon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              GreenMetric.my was born from a simple observation: Malaysian businesses wanted 
              to embrace sustainability and meet ESG requirements, but found the process 
              complex, time-consuming, and expensive.
            </p>
            <p>
              Our founders, with decades of combined experience in sustainability consulting 
              and technology, recognized the need for a platform that could democratize 
              access to ESG expertise and make compliance achievable for businesses of all sizes.
            </p>
            <p>
              Today, we're proud to serve hundreds of Malaysian companies, from SMEs to 
              multinational corporations, helping them navigate the evolving ESG landscape 
              with confidence and clarity.
            </p>
          </div>
        </div>
        <div>
          <img 
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Our team working together"
            className="rounded-lg shadow-lg w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do and every decision we make.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate experts dedicated to making ESG accessible for every Malaysian business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <Badge variant="outline" className="mb-3">{member.role}</Badge>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key milestones in our mission to transform ESG in Malaysia.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-4 mb-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {milestone.year.slice(-2)}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{milestone.title}</h3>
                <div className="text-sm text-muted-foreground mb-2">{milestone.year}</div>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="py-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Mission?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're looking to start your ESG journey or enhance your current 
            sustainability efforts, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Get Started Today
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Talk to Our Team
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}