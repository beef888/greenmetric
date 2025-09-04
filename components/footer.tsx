import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">GreenMetric</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Malaysia's premier ESG intelligence platform, simplifying sustainability compliance for businesses across Southeast Asia.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/tools/carbon-calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  Carbon Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/esg-assessment" className="text-muted-foreground hover:text-primary transition-colors">
                  ESG Assessment
                </Link>
              </li>
              <li>
                <Link href="/tools/materiality-matrix" className="text-muted-foreground hover:text-primary transition-colors">
                  Materiality Matrix
                </Link>
              </li>
              <li>
                <Link href="/tools/report-generator" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/resources/guides" className="text-muted-foreground hover:text-primary transition-colors">
                  Compliance Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/templates" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Templates
                </Link>
              </li>
              <li>
                <Link href="/resources/regulations" className="text-muted-foreground hover:text-primary transition-colors">
                  Regulatory Updates
                </Link>
              </li>
              <li>
                <Link href="/resources/case-studies" className="text-muted-foreground hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/insights/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog & Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest ESG insights and regulatory updates delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Contact & Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>support@greenmetric.my</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+60 3-2000 0000</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Kuala Lumpur, Malaysia</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 GreenMetric.my. All rights reserved. | Empowering Malaysian businesses with ESG intelligence.</p>
        </div>
      </div>
    </footer>
  );
}