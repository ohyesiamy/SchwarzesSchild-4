import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/ui/logo";
import { useLocation } from "wouter";
import { 
  Shield, 
  Globe, 
  TrendingUp, 
  Lock, 
  Users, 
  Briefcase,
  ChevronRight,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log("Contact form submitted:", contactForm);
    // Reset form
    setContactForm({ name: "", email: "", company: "", message: "" });
  };

  const services = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Private Banking",
      description: "Tailored wealth management strategies for ultra-high-net-worth individuals and multi-generational family offices. Our dedicated relationship managers provide discretionary portfolio management, estate planning, and succession advisory services with minimum account thresholds starting at $50 million."
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Corporate Treasury",
      description: "Comprehensive treasury management solutions for multinational corporations and institutional clients. Services include liquidity management, foreign exchange hedging, cash concentration, and working capital optimization across multiple jurisdictions and currencies."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Digital Asset Custody",
      description: "Institutional-grade custody services for digital assets including cryptocurrencies, tokenized securities, and CBDCs. Our cold storage infrastructure meets bank-level security standards with multi-signature protocols and insurance coverage up to $1 billion per client."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Escrow & Trade Settlement",
      description: "Neutral third-party services for complex cross-border transactions, M&A settlements, and structured trade finance. Our escrow services facilitate secure transaction completion with legal compliance across 150+ jurisdictions worldwide."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Investment Strategy Advisory",
      description: "Sophisticated investment advisory services combining traditional asset allocation with alternative investments. Our team of certified wealth strategists develops customized portfolios targeting risk-adjusted returns across equity, fixed income, commodities, and private markets."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sovereign Digital Currency (USUD)",
      description: "Pioneering stablecoin issuance backed by diversified sovereign reserves including government bonds, precious metals, and blue-chip equities. USUD provides institutional clients with a stable store of value for cross-border transactions and treasury management."
    }
  ];

  const complianceFeatures = [
    "Multi-jurisdictional regulatory compliance across 150+ countries",
    "Advanced AML/KYC procedures with enhanced due diligence protocols",
    "Bank-grade 256-bit AES encryption with quantum-resistant algorithms",
    "Segregated asset protection with full insurance coverage up to $1B",
    "Real-time transaction monitoring with AI-powered fraud detection",
    "Swiss banking privacy standards with attorney-client privilege protection"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-black text-white relative z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Logo size="small" className="mr-3" />
              <span className="text-lg font-bold tracking-tight">SCHWARZES SCHILD</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm font-medium tracking-wide uppercase text-white">About</a>
              <a href="#services" className="text-sm font-medium tracking-wide uppercase text-white">Services</a>
              <a href="#compliance" className="text-sm font-medium tracking-wide uppercase text-white">Security</a>
              <a href="#contact" className="text-sm font-medium tracking-wide uppercase text-white">Contact</a>
              <Button 
                onClick={() => navigate("/auth")}
                className="bg-white text-black font-medium tracking-wide uppercase text-sm px-6"
              >
                Login
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                <a href="#about" className="text-sm font-medium tracking-wide uppercase text-white">About</a>
                <a href="#services" className="text-sm font-medium tracking-wide uppercase text-white">Services</a>
                <a href="#compliance" className="text-sm font-medium tracking-wide uppercase text-white">Security</a>
                <a href="#contact" className="text-sm font-medium tracking-wide uppercase text-white">Contact</a>
                <Button 
                  onClick={() => navigate("/auth")}
                  className="bg-white text-black font-medium tracking-wide uppercase text-sm w-full"
                >
                  Login
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-light tracking-tight mb-6 text-white">
              <span className="block mb-2">Empowering Global Sovereignty</span>
              <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white">Through Private Capital</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 font-light leading-relaxed">
              Swiss-incorporated sovereign wealth management for institutional clients, family offices, and ultra-high-net-worth individuals seeking financial independence across global markets
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-gray-100 font-medium tracking-wide uppercase px-8 h-14"
                onClick={() => navigate("/auth")}
              >
                Access Secure Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-medium tracking-wide uppercase px-8 h-14"
              >
                Schedule Consultation
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-200 font-medium">FINMA Licensed</div>
                <div className="text-xs text-gray-300">Swiss Regulation</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-200 font-medium">$1B Insurance</div>
                <div className="text-xs text-gray-300">Asset Protection</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-200 font-medium">ISO 27001</div>
                <div className="text-xs text-gray-300">Security Certified</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-gray-200 font-medium">157 Countries</div>
                <div className="text-xs text-gray-300">Global Reach</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">About SchwarzesSchild</h2>
              <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-medium mb-6 text-gray-900">Swiss Excellence in Private Banking</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Established in 1998, SchwarzesSchild represents the pinnacle of Swiss banking tradition combined with cutting-edge financial technology. As a fully licensed Swiss private bank, we serve an exclusive clientele of ultra-high-net-worth individuals, sovereign wealth funds, family offices, and multinational corporations across six continents.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our Zurich headquarters operates under the strict oversight of the Swiss Financial Market Supervisory Authority (FINMA), ensuring adherence to the world's most rigorous banking standards. This regulatory framework, combined with Switzerland's centuries-old tradition of banking discretion, provides our clients with unparalleled financial privacy and asset protection.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Unlike traditional banks, SchwarzesSchild operates as a sovereign wealth management institution, meaning we maintain complete independence from government influence while providing clients the tools to preserve and grow wealth across multiple jurisdictions and economic cycles.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 mb-1">26+</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Years Excellence</div>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 mb-1">$52B+</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Assets Under Management</div>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 mb-1">157</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Countries Served</div>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 mb-1">99.99%</div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">Uptime SLA</div>
                  </div>
                </div>
              </div>
              <div className="lg:pl-12">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 border border-gray-200 shadow-lg rounded-lg">
                  <h4 className="text-xl font-semibold mb-6 text-gray-900">Our Unwavering Commitment</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Swiss Banking Confidentiality</span>
                        <p className="text-sm text-gray-600 mt-1">Absolute client privacy protection under Swiss federal law with attorney-client privilege extension</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Institutional Security Standards</span>
                        <p className="text-sm text-gray-600 mt-1">Bank-grade security infrastructure with ISO 27001 certification and quantum-resistant encryption</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Bespoke Wealth Strategies</span>
                        <p className="text-sm text-gray-600 mt-1">Personalized investment solutions tailored to individual risk profiles and legacy objectives</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5 mr-4 flex-shrink-0">
                        <Globe className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Global Market Access</span>
                        <p className="text-sm text-gray-600 mt-1">Direct access to international markets, alternative investments, and exclusive opportunities</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">Our Services</h2>
            <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive financial solutions designed for sophisticated institutional and private clients seeking discretionary wealth management, corporate treasury optimization, and alternative investment strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
                <div className="text-black mb-4 group-hover:text-gray-700 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{service.description}</p>
                <div className="mt-6">
                  <span className="text-sm font-medium text-black group-hover:text-gray-700 uppercase tracking-wide cursor-pointer">
                    Learn More <ChevronRight className="inline h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Security Section */}
      <section id="compliance" className="py-20 lg:py-32 bg-black text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">Global Compliance & Security</h2>
              <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
              <p className="text-xl text-gray-200">
                Bank-grade security infrastructure with multi-jurisdictional regulatory compliance ensuring complete asset protection and privacy preservation across all global markets
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-medium mb-8 text-white">Regulatory Excellence</h3>
                <div className="space-y-4">
                  {complianceFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Shield className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-gray-900 border border-gray-700 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-4">Global Regulatory Compliance</h4>
                  <div className="text-sm text-gray-300 space-y-2">
                    <p>• Licensed in Switzerland under FINMA supervision</p>
                    <p>• Compliant with EU GDPR and MiFID II regulations</p>
                    <p>• Adherent to US BSA and PATRIOT Act requirements</p>
                    <p>• Certified under ISO 27001 and SOC 2 Type II standards</p>
                  </div>
                </div>
              </div>
              <div className="lg:pl-8">
                <h3 className="text-2xl font-medium mb-8 text-white">Security Infrastructure</h3>
                <div className="bg-gray-900 p-8 border border-gray-700 rounded-lg">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2 text-white">256-bit</div>
                      <div className="text-sm text-gray-300 uppercase tracking-wide">AES Encryption</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2 text-white">99.99%</div>
                      <div className="text-sm text-gray-300 uppercase tracking-wide">Uptime SLA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2 text-white">24/7</div>
                      <div className="text-sm text-gray-300 uppercase tracking-wide">Monitoring</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2 text-white">ISO 27001</div>
                      <div className="text-sm text-gray-300 uppercase tracking-wide">Certified</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-6 bg-gray-800 border border-gray-600 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-4">Advanced Security Measures</h4>
                  <div className="text-sm text-gray-200 space-y-2">
                    <p>• Hardware Security Modules (HSM) for key management</p>
                    <p>• Multi-signature transaction authorization protocols</p>
                    <p>• Biometric authentication and behavioral analysis</p>
                    <p>• Cold storage with geographic distribution</p>
                    <p>• Real-time fraud detection and prevention systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6 text-gray-900">Client Excellence</h2>
            <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Trusted by institutional investors, family offices, and sovereign wealth funds across six continents
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 border border-gray-200 shadow-lg rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">European Family Office</h4>
                  <p className="text-sm text-gray-600">Multi-generational wealth preservation</p>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                "SchwarzesSchild's sophisticated approach to wealth preservation has been instrumental in protecting our family's assets across multiple jurisdictions. Their discretion and expertise in navigating complex regulatory environments is unmatched."
              </blockquote>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Managing Director</p>
                <p>€2.8B Assets Under Management</p>
              </div>
            </div>

            <div className="bg-white p-8 border border-gray-200 shadow-lg rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Multinational Corporation</h4>
                  <p className="text-sm text-gray-600">Corporate treasury optimization</p>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                "The treasury management solutions provided by SchwarzesSchild have optimized our global cash flows and hedging strategies. Their 24/7 institutional support and deep understanding of international markets has been invaluable."
              </blockquote>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Chief Financial Officer</p>
                <p>Fortune 500 Technology Company</p>
              </div>
            </div>

            <div className="bg-white p-8 border border-gray-200 shadow-lg rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sovereign Wealth Fund</h4>
                  <p className="text-sm text-gray-600">Digital asset custody & management</p>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                "Their institutional-grade digital asset custody platform provides the security and compliance framework we require for sovereign-level cryptocurrency investments. The insurance coverage and regulatory compliance exceed industry standards."
              </blockquote>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Investment Committee Chair</p>
                <p>Middle Eastern Sovereign Fund</p>
              </div>
            </div>
          </div>

          <div className="bg-black p-12 rounded-lg text-center">
            <h3 className="text-2xl font-medium mb-4 text-white">Join Our Distinguished Clientele</h3>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Experience the same level of excellence that has earned the trust of the world's most sophisticated investors
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-sm text-gray-300">Client Retention Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-sm text-gray-300">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-gray-300">Dedicated Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">AAA</div>
                <div className="text-sm text-gray-300">Credit Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Insights Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6 text-gray-900">Market Intelligence & Insights</h2>
            <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Stay informed with our exclusive market analysis, regulatory updates, and strategic insights from our global research team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Central Bank Digital Currencies: The New Sovereign Money Framework",
                excerpt: "An in-depth analysis of how CBDCs are reshaping monetary policy and creating new opportunities for institutional treasury management. Our research covers implementation strategies across major economies including the Digital Euro, Digital Yuan, and Fed's exploration of a Digital Dollar.",
                date: "January 2025",
                category: "Digital Assets",
                readTime: "8 min read"
              },
              {
                title: "Swiss Banking Evolution: Maintaining Excellence in the Digital Era",
                excerpt: "How Switzerland's financial sector continues to lead global private banking through innovative digital solutions while preserving traditional values of discretion, stability, and client-centric service. Analysis includes regulatory frameworks and competitive positioning.",
                date: "December 2024",
                category: "Market Analysis",
                readTime: "12 min read"
              },
              {
                title: "Geopolitical Risk Management for Ultra-High-Net-Worth Portfolios",
                excerpt: "Strategic asset allocation and jurisdiction diversification strategies for navigating increasing global political uncertainty. Comprehensive guide covering tax optimization, regulatory arbitrage, and sovereign risk assessment methodologies.",
                date: "November 2024",
                category: "Wealth Strategy",
                readTime: "15 min read"
              }
            ].map((article, index) => (
              <article key={index} className="bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1 text-xs font-medium uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-gray-600 uppercase tracking-wide">{article.date}</div>
                    <div className="text-xs text-gray-500">{article.readTime}</div>
                  </div>
                  <h3 className="text-xl font-medium mb-3 leading-tight text-gray-900 group-hover:text-black transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black uppercase tracking-wide cursor-pointer hover:text-gray-700 transition-colors">
                      Read Full Analysis <ChevronRight className="inline h-4 w-4 ml-1" />
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="h-3 w-3 mr-1" />
                      Premium Content
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white">
              Access Research Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Performance Section */}
      <section className="py-20 lg:py-32 bg-black text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6 text-white">Investment Excellence</h2>
              <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Delivering consistent alpha through sophisticated investment strategies and global market access
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-medium mb-8 text-white">Performance Track Record</h3>
                <div className="space-y-6">
                  <div className="bg-gray-900 p-6 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-200">5-Year Annualized Return</span>
                      <span className="text-2xl font-bold text-green-400">+12.4%</span>
                    </div>
                    <div className="text-sm text-gray-300">Outperformed benchmark by 340 basis points</div>
                  </div>
                  
                  <div className="bg-gray-900 p-6 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-200">Maximum Drawdown</span>
                      <span className="text-2xl font-bold text-blue-400">-4.2%</span>
                    </div>
                    <div className="text-sm text-gray-300">Superior risk management during market volatility</div>
                  </div>
                  
                  <div className="bg-gray-900 p-6 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-200">Sharpe Ratio</span>
                      <span className="text-2xl font-bold text-purple-400">2.38</span>
                    </div>
                    <div className="text-sm text-gray-300">Exceptional risk-adjusted returns</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-medium mb-8 text-white">Asset Allocation Strategy</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 border border-gray-600 rounded-lg">
                    <div>
                      <span className="text-white font-medium">Global Equities</span>
                      <p className="text-sm text-gray-300">Developed & emerging markets</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">45%</div>
                      <div className="w-20 h-2 bg-gray-600 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800 border border-gray-600 rounded-lg">
                    <div>
                      <span className="text-white font-medium">Fixed Income</span>
                      <p className="text-sm text-gray-300">Government & corporate bonds</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">25%</div>
                      <div className="w-20 h-2 bg-gray-600 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{width: '25%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800 border border-gray-600 rounded-lg">
                    <div>
                      <span className="text-white font-medium">Alternative Investments</span>
                      <p className="text-sm text-gray-300">Private equity, hedge funds</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">20%</div>
                      <div className="w-20 h-2 bg-gray-600 rounded-full">
                        <div className="h-2 bg-purple-500 rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800 border border-gray-600 rounded-lg">
                    <div>
                      <span className="text-white font-medium">Digital Assets</span>
                      <p className="text-sm text-gray-300">Cryptocurrency, DeFi protocols</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">10%</div>
                      <div className="w-20 h-2 bg-gray-600 rounded-full">
                        <div className="h-2 bg-orange-500 rounded-full" style={{width: '10%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 border border-gray-700 rounded-lg text-center">
              <h4 className="text-xl font-medium mb-4 text-white">Risk Disclosure</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Past performance does not guarantee future results. All investments carry risk of loss. 
                Performance figures are net of fees and calculated in USD. Individual results may vary based on 
                investment objectives, risk tolerance, and market conditions. Please consult with your relationship 
                manager for personalized investment advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Onboarding Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-100 to-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6 text-gray-900">Premium Client Onboarding</h2>
              <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Experience our white-glove onboarding process designed exclusively for sophisticated investors and institutional clients
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-gray-900">Confidential Consultation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Private consultation with our senior relationship managers to understand your unique financial objectives, risk tolerance, and jurisdiction requirements. All discussions protected by Swiss banking confidentiality.
                </p>
                <div className="mt-6 text-sm text-gray-600">
                  <p className="font-medium">Timeline: 2-3 business days</p>
                  <p>Location: Zurich or secure video conference</p>
                </div>
              </div>

              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-gray-900">Enhanced Due Diligence</h3>
                <p className="text-gray-700 leading-relaxed">
                  Comprehensive KYC/AML verification process conducted by our compliance team. Enhanced due diligence protocols ensure full regulatory compliance across all relevant jurisdictions while maintaining client privacy.
                </p>
                <div className="mt-6 text-sm text-gray-600">
                  <p className="font-medium">Timeline: 5-7 business days</p>
                  <p>Secure document portal provided</p>
                </div>
              </div>

              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-gray-900">Account Activation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Upon approval, receive immediate access to our secure client portal with personalized investment strategies, dedicated relationship management, and 24/7 institutional support infrastructure.
                </p>
                <div className="mt-6 text-sm text-gray-600">
                  <p className="font-medium">Timeline: 1-2 business days</p>
                  <p>Immediate trading capabilities</p>
                </div>
              </div>
            </div>

            <div className="bg-black p-12 rounded-lg text-center">
              <h3 className="text-2xl font-medium mb-6 text-white">Ready to Begin?</h3>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Join an exclusive network of institutional investors, family offices, and ultra-high-net-worth individuals who trust SchwarzesSchild with their most valuable assets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-medium px-8">
                  Schedule Private Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-medium px-8">
                  Download Information Package
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-black text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">Contact Us</h2>
              <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
              <p className="text-xl text-gray-300">
                Begin your journey with SchwarzesSchild's exclusive financial services
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-medium mb-8 text-white">Global Contact Network</h3>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Private Banking & Wealth Management</h4>
                    <p className="text-gray-200 text-sm mb-2">For ultra-high-net-worth individuals and family offices</p>
                    <p className="text-gray-300">private@schwarzesschild.com</p>
                    <p className="text-gray-400 text-xs">Minimum assets: $50M USD</p>
                  </div>
                  <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Corporate Treasury Services</h4>
                    <p className="text-gray-200 text-sm mb-2">For multinational corporations and institutions</p>
                    <p className="text-gray-300">corporate@schwarzesschild.com</p>
                    <p className="text-gray-400 text-xs">24/7 institutional support</p>
                  </div>
                  <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Digital Asset Custody</h4>
                    <p className="text-gray-200 text-sm mb-2">Institutional-grade cryptocurrency custody</p>
                    <p className="text-gray-300">custody@schwarzesschild.com</p>
                    <p className="text-gray-400 text-xs">Insurance up to $1B per client</p>
                  </div>
                  <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
                    <h4 className="font-medium mb-2 text-white">Global Headquarters</h4>
                    <p className="text-gray-200 text-sm mb-2">Paradeplatz 8, 8001 Zurich, Switzerland</p>
                    <p className="text-gray-300">+41 44 224 1000</p>
                    <p className="text-gray-400 text-xs">Licensed by FINMA</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium mb-8 text-white">Secure Inquiry Form</h3>
                <div className="bg-gray-900 p-8 border border-gray-700 rounded-lg">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Full Name *</label>
                        <Input
                          placeholder="Enter your full name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Company / Institution</label>
                      <Input
                        placeholder="Your organization name"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Inquiry Details *</label>
                      <Textarea
                        placeholder="Please describe your banking requirements, investment objectives, or specific services you're interested in..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-32 focus:border-white"
                        required
                      />
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Lock className="h-4 w-4 mr-2" />
                      All communications are encrypted and protected by Swiss banking confidentiality
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-white text-black hover:bg-gray-100 font-medium tracking-wide uppercase h-12"
                    >
                      Send Secure Inquiry
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-300 text-sm mb-4">Prefer to speak directly with our team?</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      Schedule Video Call
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      Request Callback
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <Logo size="small" className="mr-3" />
                <div>
                  <span className="text-xl font-bold tracking-tight text-white">SCHWARZES SCHILD</span>
                  <p className="text-xs text-gray-300 uppercase tracking-wide">Swiss Private Banking</p>
                </div>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed mb-4">
                Established 1998. Licensed by FINMA. Swiss sovereign wealth management for institutional and ultra-high-net-worth clients worldwide.
              </p>
              <div className="flex items-center text-xs text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                All systems operational
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wide text-sm">Private Banking Services</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Wealth Management</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Corporate Treasury</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Digital Asset Custody</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Investment Advisory</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Escrow Services</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">USUD Stablecoin</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wide text-sm">Compliance & Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">AML/KYC Compliance</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Regulatory Framework</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">FINMA Disclosures</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Risk Warnings</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wide text-sm">Client Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Secure Portal Login</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Research & Insights</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Market Intelligence</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-200 hover:text-white transition-colors">Media Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <p className="text-sm text-gray-400">
                © 2024 SchwarzesSchild. All rights reserved. Licensed and regulated in Switzerland.
              </p>
              <p className="text-xs text-gray-500 mt-4 md:mt-0">
                Risk Warning: Investments may go down as well as up. Past performance is not indicative of future results.
              </p>
            </div>
            
            {/* Live Status Indicator */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-800">
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>Zurich, Switzerland</span>
                </div>
                <div className="hidden md:flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>99.99% uptime SLA</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-4 md:mt-0">
                <a href="#" className="hover:text-gray-300 mr-4">System Status</a>
                <a href="#" className="hover:text-gray-300 mr-4">Help Center</a>
                <a href="#" className="hover:text-gray-300">API Documentation</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}