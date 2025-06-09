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
      description: "Exclusive wealth management for high-net-worth individuals and families"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Corporate Treasury",
      description: "Strategic financial solutions for corporate entities and institutions"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Digital Asset Custody",
      description: "Secure storage and management of digital assets with institutional-grade security"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Escrow & Trade Settlement",
      description: "Trusted third-party services for complex financial transactions"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Investment Strategy Advisory",
      description: "Professional guidance for portfolio optimization and risk management"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Stablecoin Issuance (USUD)",
      description: "Digital currency solutions backed by sovereign reserves"
    }
  ];

  const complianceFeatures = [
    "Multi-jurisdictional regulatory compliance",
    "Advanced AML/KYC procedures",
    "Bank-grade encryption protocols",
    "Segregated asset protection",
    "Real-time transaction monitoring",
    "Swiss banking standards"
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
              <a href="#about" className="text-sm font-medium tracking-wide uppercase hover:text-gray-300 transition-colors">About</a>
              <a href="#services" className="text-sm font-medium tracking-wide uppercase hover:text-gray-300 transition-colors">Services</a>
              <a href="#compliance" className="text-sm font-medium tracking-wide uppercase hover:text-gray-300 transition-colors">Security</a>
              <a href="#contact" className="text-sm font-medium tracking-wide uppercase hover:text-gray-300 transition-colors">Contact</a>
              <Button 
                onClick={() => navigate("/auth")}
                className="bg-white text-black hover:bg-gray-100 font-medium tracking-wide uppercase text-sm px-6"
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
                <a href="#about" className="text-sm font-medium tracking-wide uppercase hover:text-gray-300 transition-colors">About</a>
                <a href="#services" className="text-sm font-medium tracking-wide uppercase hover:text-gray-300 transition-colors">Services</a>
                <a href="#compliance" className="text-sm font-medium tracking-wide uppercase hover:text-gray-300 transition-colors">Security</a>
                <a href="#contact" className="text-sm font-medium tracking-wide uppercase hover:text-gray-300 transition-colors">Contact</a>
                <Button 
                  onClick={() => navigate("/auth")}
                  className="bg-white text-black hover:bg-gray-100 font-medium tracking-wide uppercase text-sm w-full"
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
            <h1 className="text-4xl lg:text-6xl font-light tracking-tight mb-6">
              Empowering Global Sovereignty
              <span className="block font-bold">Through Private Capital</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 font-light">
              Swiss-incorporated sovereign wealth management for institutional and high-net-worth clients worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-gray-100 font-medium tracking-wide uppercase px-8"
              >
                Open Corporate Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-medium tracking-wide uppercase px-8"
              >
                Discover Our Solutions
              </Button>
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
                <h3 className="text-2xl font-medium mb-6">Swiss Excellence in Private Banking</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded on the principles of Swiss banking tradition, SchwarzesSchild operates as a sovereign wealth management institution, providing exclusive financial services to ultra-high-net-worth individuals, family offices, and institutional clients globally.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our Swiss incorporation ensures the highest standards of privacy, security, and regulatory compliance, while our sovereign approach to wealth management empowers clients to maintain financial independence across jurisdictions.
                </p>
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">25+</div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">Years Excellence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">$50B+</div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">Assets Under Management</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">150+</div>
                    <div className="text-sm text-gray-600 uppercase tracking-wide">Countries Served</div>
                  </div>
                </div>
              </div>
              <div className="lg:pl-12">
                <div className="bg-white p-8 border border-gray-200 shadow-sm">
                  <h4 className="text-xl font-medium mb-4">Our Commitment</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Absolute client confidentiality and privacy protection</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Institutional-grade security and risk management</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Personalized wealth preservation strategies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">Global market access and expertise</span>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions designed for sophisticated institutional and private clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
                <div className="text-black mb-4 group-hover:text-gray-700 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
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
              <p className="text-xl text-gray-300">
                Bank-grade security infrastructure with multi-jurisdictional regulatory compliance
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-medium mb-8">Regulatory Excellence</h3>
                <div className="space-y-4">
                  {complianceFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Shield className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:pl-8">
                <h3 className="text-2xl font-medium mb-8">Security Infrastructure</h3>
                <div className="bg-gray-900 p-8 border border-gray-800">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">256-bit</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">AES Encryption</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">99.99%</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">Uptime SLA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">24/7</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">Monitoring</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">ISO 27001</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wide">Certified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Network Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">Trusted Network</h2>
            <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic partnerships with leading financial institutions worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 h-20 flex items-center justify-center">
                <div className="text-gray-400 font-medium">PARTNER {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Insights Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-6">News & Insights</h2>
            <div className="w-16 h-0.5 bg-black mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Asset Custody: The Future of Institutional Investment",
                excerpt: "Exploring the growing demand for institutional-grade digital asset custody solutions and regulatory developments.",
                date: "December 2024"
              },
              {
                title: "Swiss Banking Excellence in the Digital Age",
                excerpt: "How traditional Swiss banking principles adapt to modern financial technology and global compliance requirements.",
                date: "November 2024"
              },
              {
                title: "Sovereign Wealth Management: Strategies for Economic Uncertainty",
                excerpt: "Investment approaches for high-net-worth individuals navigating volatile global markets and regulatory changes.",
                date: "October 2024"
              }
            ].map((article, index) => (
              <article key={index} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gray-100"></div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-3 uppercase tracking-wide">{article.date}</div>
                  <h3 className="text-xl font-medium mb-3 leading-tight">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <span className="text-sm font-medium text-black uppercase tracking-wide cursor-pointer hover:text-gray-700">
                    Read More <ChevronRight className="inline h-4 w-4 ml-1" />
                  </span>
                </div>
              </article>
            ))}
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
                <h3 className="text-2xl font-medium mb-8">Get In Touch</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Private Banking Inquiries</h4>
                    <p className="text-gray-300">private@schwarzesschild.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Corporate Services</h4>
                    <p className="text-gray-300">corporate@schwarzesschild.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Compliance & Legal</h4>
                    <p className="text-gray-300">compliance@schwarzesschild.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Headquarters</h4>
                    <p className="text-gray-300">Zurich, Switzerland</p>
                  </div>
                </div>
              </div>
              
              <div>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Full Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Company / Institution"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 min-h-32"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100 font-medium tracking-wide uppercase"
                  >
                    Send Secure Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Logo size="small" className="mr-3" />
                <span className="text-lg font-bold tracking-tight text-white">SCHWARZES SCHILD</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Swiss sovereign wealth management for institutional and private clients worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4 uppercase tracking-wide">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Private Banking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Treasury</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Asset Custody</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investment Advisory</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4 uppercase tracking-wide">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Regulatory Disclosures</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4 uppercase tracking-wide">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Media Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © 2024 SchwarzesSchild. All rights reserved. Licensed and regulated in Switzerland.
              </p>
              <p className="text-xs text-gray-500 mt-4 md:mt-0">
                Risk Warning: Investments may go down as well as up. Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}