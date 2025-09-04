"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Leaf, 
  Menu,
  Calculator,
  ClipboardCheck,
  BookOpen,
  FileText,
  BarChart3,
  Headphones,
  Users,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "Carbon Calculator",
    href: "/tools/carbon-calculator",
    description: "Calculate Scope 1, 2, 3 emissions with Malaysian factors",
    icon: Calculator,
  },
  {
    title: "ESG Assessment",
    href: "/tools/esg-assessment", 
    description: "Comprehensive ESG readiness evaluation",
    icon: ClipboardCheck,
  },
  {
    title: "Report Generator",
    href: "/tools/report-generator",
    description: "Generate compliance-ready sustainability reports",
    icon: FileText,
  },
];

const resources = [
  {
    title: "Regulation Guides",
    href: "/resources/guides",
    description: "Bursa Malaysia & BNM compliance guides",
    icon: BookOpen,
  },
  {
    title: "Templates",
    href: "/resources/templates", 
    description: "Ready-to-use ESG report templates",
    icon: FileText,
  },
  {
    title: "Industry Benchmarks",
    href: "/resources/benchmarks",
    description: "Compare with industry standards",
    icon: BarChart3,
  },
];

const solutions = [
  {
    title: "For Enterprises",
    href: "/solutions#enterprise",
    description: "Comprehensive ESG solutions for large organizations",
    icon: Building,
  },
  {
    title: "For SMEs", 
    href: "/solutions#sme",
    description: "Affordable ESG tools for small-medium businesses",
    icon: Users,
  },
  {
    title: "For Consultants",
    href: "/solutions#consultants",
    description: "Professional tools for ESG consultants",
    icon: Headphones,
  },
];

export function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-custom flex h-16 items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GreenMetric
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {tools.map((tool) => (
                    <ListItem
                      key={tool.href}
                      title={tool.title}
                      href={tool.href}
                      icon={tool.icon}
                    >
                      {tool.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {resources.map((resource) => (
                    <ListItem
                      key={resource.href}
                      title={resource.title}
                      href={resource.href}
                      icon={resource.icon}
                    >
                      {resource.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                  {solutions.map((solution) => (
                    <ListItem
                      key={solution.href}
                      title={solution.title}
                      href={solution.href}
                      icon={solution.icon}
                    >
                      {solution.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/insights" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Insights
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 py-4">
                <div className="flex items-center space-x-2 px-4">
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="font-bold">GreenMetric</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium px-4">Tools</h4>
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <tool.icon className="h-4 w-4" />
                      <span>{tool.title}</span>
                    </Link>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium px-4">Resources</h4>
                  {resources.map((resource) => (
                    <Link
                      key={resource.href}
                      href={resource.href}
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <resource.icon className="h-4 w-4" />
                      <span>{resource.title}</span>
                    </Link>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium px-4">Company</h4>
                  <Link
                    href="/about"
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Building className="h-4 w-4" />
                    <span>About Us</span>
                  </Link>
                  <Link
                    href="/solutions"
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="h-4 w-4" />
                    <span>Solutions</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Headphones className="h-4 w-4" />
                    <span>Contact</span>
                  </Link>
                </div>

                <div className="border-t pt-4 space-y-2 px-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

const ListItem = ({ className, title, children, href, icon: Icon, ...props }: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
  icon: any;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};