import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Building, Users, Shield, Globe, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="about" />
      <MobileNavigation active="dashboard" />
      
      <main className="py-8 px-4 container mx-auto flex-grow mb-20 md:mb-0 max-w-[1440px]">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl uppercase tracking-wide font-medium mb-2">About Schwarzes Schild</h1>
          <div className="w-16 h-0.5 bg-black mb-4"></div>
          <p className="text-sm text-gray-600 max-w-3xl">Swiss excellence in private banking, combining traditional banking values with innovative financial technology to serve ultra-high-net-worth individuals and institutions worldwide.</p>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg uppercase tracking-wide font-medium mb-4">Our Heritage</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Established in 1998, Schwarzes Schild represents the pinnacle of Swiss banking tradition. 
                As a fully licensed Swiss private bank under FINMA oversight, we maintain the highest 
                standards of financial privacy and regulatory compliance.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our Zurich headquarters serves as the nerve center for global wealth management operations, 
                providing sophisticated financial solutions across six continents.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm uppercase tracking-wide font-medium mb-3">Core Values</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Absolute client confidentiality under Swiss banking law</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Institutional-grade security and risk management</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Bespoke wealth preservation strategies</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Global market access and diversification</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-6">
            <h3 className="text-sm uppercase tracking-wide font-medium mb-4">Key Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">26+</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">$52B+</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Assets Under Management</div>
              </div>
              <div className="text-center p-4 bg-white border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">157</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Countries Served</div>
              </div>
              <div className="text-center p-4 bg-white border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">99.99%</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-12">
          <h2 className="text-lg uppercase tracking-wide font-medium mb-6">Service Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Users className="h-6 w-6" />}
              title="Private Banking"
              description="Tailored wealth management for ultra-high-net-worth individuals with minimum $50M threshold."
            />
            <ServiceCard
              icon={<Building className="h-6 w-6" />}
              title="Corporate Treasury"
              description="Comprehensive treasury solutions for multinational corporations and institutional clients."
            />
            <ServiceCard
              icon={<Shield className="h-6 w-6" />}
              title="Asset Custody"
              description="Bank-grade custody services with $1B insurance coverage and quantum-resistant security."
            />
            <ServiceCard
              icon={<Globe className="h-6 w-6" />}
              title="Global Markets"
              description="Access to international markets with cross-border transaction facilitation."
            />
            <ServiceCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Investment Advisory"
              description="Sophisticated portfolio strategies combining traditional and alternative investments."
            />
            <ServiceCard
              icon={<Award className="h-6 w-6" />}
              title="Wealth Planning"
              description="Multi-generational wealth preservation and succession planning services."
            />
          </div>
        </div>

        {/* Compliance & Certifications */}
        <div className="bg-black text-white p-8">
          <h2 className="text-lg uppercase tracking-wide font-medium mb-6">Regulatory Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm uppercase tracking-wide font-medium mb-4">Certifications</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Shield className="h-4 w-4 mr-3" />
                  <span className="text-sm">FINMA Licensed Swiss Private Bank</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 mr-3" />
                  <span className="text-sm">ISO 27001 Security Certification</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 mr-3" />
                  <span className="text-sm">Basel III Capital Requirements</span>
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 mr-3" />
                  <span className="text-sm">SWIFT CSP Certification</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wide font-medium mb-4">Compliance Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-sm">Enhanced AML/KYC procedures</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-sm">Real-time transaction monitoring</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-sm">Segregated asset protection</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span className="text-sm">Cross-jurisdictional compliance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function ServiceCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="border border-gray-200 p-4 hover:border-black transition-colors">
      <div className="flex items-center mb-3">
        <div className="p-2 bg-gray-100 mr-3">
          {icon}
        </div>
        <h3 className="text-sm uppercase tracking-wide font-medium">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}