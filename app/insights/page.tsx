"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  TrendingUp,
  Leaf,
  Building,
  Users
} from "lucide-react";

const featuredPost = {
  id: 1,
  title: "Bursa Malaysia's New Sustainability Reporting Requirements: What Malaysian Companies Need to Know",
  excerpt: "A comprehensive guide to the latest changes in Bursa Malaysia's sustainability reporting framework and how your organization can ensure compliance.",
  author: "Dr. Sarah Lim",
  authorRole: "ESG Compliance Expert",
  publishedAt: "2024-01-15",
  readTime: "8 min read",
  category: "Regulatory Updates",
  image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  featured: true
};

const blogPosts = [
  {
    id: 2,
    title: "5 Steps to Calculate Your Company's Carbon Footprint in Malaysia",
    excerpt: "Learn how to measure your organization's carbon emissions using Malaysian-specific emission factors and industry benchmarks.",
    author: "Ahmad Rahman",
    authorRole: "Carbon Accounting Specialist",
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Carbon Management",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "ESG Benchmarking: How Malaysian SMEs Compare to Industry Leaders",
    excerpt: "Analysis of ESG performance across Malaysian industries and practical tips for small-medium enterprises to improve their scores.",
    author: "Lisa Wong",
    authorRole: "ESG Analyst",
    publishedAt: "2024-01-10",
    readTime: "7 min read",
    category: "Industry Analysis",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    title: "The Business Case for ESG: ROI of Sustainability Investments",
    excerpt: "Data-driven insights on how ESG initiatives drive financial performance and competitive advantage for Malaysian businesses.",
    author: "David Tan",
    authorRole: "Sustainability Consultant",
    publishedAt: "2024-01-08",
    readTime: "9 min read",
    category: "Business Strategy",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 5,
    title: "Materiality Assessment: Identifying Your Most Important ESG Issues",
    excerpt: "Step-by-step guide to conducting a materiality assessment and prioritizing ESG topics that matter most to your stakeholders.",
    author: "Dr. Priya Sharma",
    authorRole: "ESG Strategy Advisor",
    publishedAt: "2024-01-05",
    readTime: "5 min read",
    category: "ESG Strategy",
    image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 6,
    title: "Green Finance in Malaysia: Funding Your Sustainability Journey",
    excerpt: "Overview of green financing options available to Malaysian companies, including green bonds, loans, and government incentives.",
    author: "Raj Kumar",
    authorRole: "Green Finance Expert",
    publishedAt: "2024-01-03",
    readTime: "6 min read",
    category: "Green Finance",
    image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

const categories = [
  "All Categories",
  "Regulatory Updates",
  "Carbon Management", 
  "Industry Analysis",
  "Business Strategy",
  "ESG Strategy",
  "Green Finance"
];

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Regulatory Updates": return Building;
      case "Carbon Management": return Leaf;
      case "Industry Analysis": return TrendingUp;
      case "Business Strategy": return Users;
      default: return BookOpen;
    }
  };

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          ESG <span className="text-primary">Insights</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Stay informed with the latest ESG trends, regulatory updates, and best practices 
          for Malaysian businesses navigating the sustainability landscape.
        </p>
      </div>

      {/* Featured Post */}
      <Card className="mb-12 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <Badge variant="default" className="mb-4">Featured Article</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{featuredPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href={`/insights/${featuredPost.id}`}>
                Read Full Article
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredPosts.map((post) => {
          const CategoryIcon = getCategoryIcon(post.category);
          return (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <CategoryIcon className="h-3 w-3" />
                    <span>{post.category}</span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <div className="font-medium">{post.author}</div>
                    <div>{new Date(post.publishedAt).toLocaleDateString()}</div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/insights/${post.id}`}>
                      Read More
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Newsletter CTA */}
      <Card className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="py-12">
          <h3 className="text-2xl font-bold mb-4">Stay Ahead of ESG Trends</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get weekly insights, regulatory updates, and practical ESG tips delivered 
            directly to your inbox. Join 2,000+ Malaysian business leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}