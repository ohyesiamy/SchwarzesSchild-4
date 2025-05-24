import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Globe, 
  FileText, 
  HelpCircle,
  CheckCircle
} from "lucide-react";

export default function SupportPage() {
  const { toast } = useToast();
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageSubject || !messageContent) {
      toast({
        title: "Incomplete form",
        description: "Please complete all fields before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setMessageSubject("");
      setMessageContent("");
      
      toast({
        title: "Message sent",
        description: "Your support request has been submitted. A representative will contact you shortly.",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation active="support" />
      <MobileNavigation active="settings" /> {/* Using "settings" because Support is in More section */}
      
      <main className="flex-1 container mx-auto px-4 py-5 mb-20 md:mb-0 max-w-[1440px]">
        {/* Mobile optimized header - visible on mobile only */}
        <div className="flex flex-col mb-4 md:hidden">
          <h1 className="text-sm uppercase tracking-wide font-medium mb-1">Support</h1>
          <div className="w-6 h-0.5 bg-black"></div>
          <p className="text-[10px] uppercase tracking-wide text-gray-600 mt-2">Private client services</p>
        </div>

        {/* Desktop header - hidden on mobile */}
        <div className="hidden md:block mb-6">
          <h1 className="text-base uppercase tracking-wide font-medium mb-1">Support</h1>
          <div className="w-8 h-0.5 bg-black mb-2"></div>
          <p className="text-xs text-gray-600">Personal assistance for all financial services</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Contact Methods and Resources */}
          <div className="lg:col-span-4">
            {/* Contact Methods Card */}
            <div className="border border-gray-200 p-4 mb-5">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Contact Options</h3>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="mr-3 bg-black p-1.5">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide font-medium">Dedicated Line</div>
                    <p className="text-[11px] text-gray-600 mt-0.5">+41 44 123 4567</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">24/7 for premium clients</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 bg-black p-1.5">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide font-medium">Email Support</div>
                    <p className="text-[11px] text-gray-600 mt-0.5">support@schwarzesschild.com</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Response within 1 business day</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 bg-black p-1.5">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide font-medium">Secure Messaging</div>
                    <p className="text-[11px] text-gray-600 mt-0.5">Via client portal</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">End-to-end encrypted communication</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 bg-black p-1.5">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wide font-medium">International Offices</div>
                    <p className="text-[11px] text-gray-600 mt-0.5">Zürich, London, New York, Singapore</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">In-person appointments available</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resources Card */}
            <div className="border border-gray-200 p-4 mb-5">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Resources</h3>
              
              <div className="space-y-2">
                <button className="flex items-center w-full text-left py-1.5 px-2 hover:bg-gray-50 group">
                  <FileText className="h-3.5 w-3.5 mr-2 text-gray-400 group-hover:text-black" />
                  <span className="text-[11px]">Banking Terms & Conditions</span>
                </button>
                
                <button className="flex items-center w-full text-left py-1.5 px-2 hover:bg-gray-50 group">
                  <FileText className="h-3.5 w-3.5 mr-2 text-gray-400 group-hover:text-black" />
                  <span className="text-[11px]">Privacy Policy</span>
                </button>
                
                <button className="flex items-center w-full text-left py-1.5 px-2 hover:bg-gray-50 group">
                  <HelpCircle className="h-3.5 w-3.5 mr-2 text-gray-400 group-hover:text-black" />
                  <span className="text-[11px]">Frequently Asked Questions</span>
                </button>
                
                <button className="flex items-center w-full text-left py-1.5 px-2 hover:bg-gray-50 group">
                  <FileText className="h-3.5 w-3.5 mr-2 text-gray-400 group-hover:text-black" />
                  <span className="text-[11px]">Banking Security Protocol</span>
                </button>
              </div>
            </div>
            
            {/* Security Notice Card - Mobile Only */}
            <div className="border border-gray-200 p-4 mb-5 lg:hidden">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-4 w-4 text-black mr-2" />
                <h3 className="text-[10px] uppercase tracking-wide font-medium">Bank-level Security</h3>
              </div>
              <p className="text-[10px] text-gray-600">
                All communications are protected with institutional-grade encryption, maintaining the discrete and confidential nature expected of Schwarzes Schild Bank.
              </p>
            </div>
          </div>
          
          {/* Support Request Form */}
          <div className="lg:col-span-8">
            <div className="border border-gray-200 p-4">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Secure Message</h3>
              <p className="text-[10px] text-gray-600 mb-5">
                Send a secure message to our private client support team. All communications are encrypted and will receive priority response.
              </p>
              
              <form onSubmit={handleSubmitMessage} className="mb-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-[10px] uppercase tracking-wide font-medium mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="w-full p-2 h-8 text-[11px] border border-black rounded-none focus:outline-none focus:ring-0"
                      value={messageSubject}
                      onChange={(e) => setMessageSubject(e.target.value)}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="account">Account Inquiry</option>
                      <option value="transaction">Transaction Issue</option>
                      <option value="card">Card Services</option>
                      <option value="security">Security Concern</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-[10px] uppercase tracking-wide font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full p-2 text-[11px] border border-black rounded-none focus:outline-none focus:ring-0"
                      placeholder="Please describe your inquiry in detail..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-4 mt-0.5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-3 w-3 border-gray-300"
                        required
                      />
                    </div>
                    <div className="ml-2">
                      <label htmlFor="terms" className="text-[10px] text-gray-600">
                        I consent to the processing of my personal data in accordance with the privacy policy.
                      </label>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Button 
                      type="submit"
                      className="rounded-none bg-black text-white hover:bg-gray-800 text-[10px] uppercase tracking-wide font-medium h-8 px-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
              
              {/* Response Time Expectations */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-[10px] uppercase tracking-wide font-medium mb-2">Response Time</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="border border-gray-100 bg-gray-50 p-2">
                    <div className="text-[10px] uppercase tracking-wide font-medium">Standard</div>
                    <p className="text-[10px] text-gray-600">24 hours</p>
                  </div>
                  <div className="border border-gray-100 bg-gray-50 p-2">
                    <div className="text-[10px] uppercase tracking-wide font-medium">Gold</div>
                    <p className="text-[10px] text-gray-600">12 hours</p>
                  </div>
                  <div className="border border-black bg-black text-white p-2">
                    <div className="text-[10px] uppercase tracking-wide font-medium">Private</div>
                    <p className="text-[10px] text-gray-300">4 hours</p>
                  </div>
                </div>
              </div>
              
              {/* Security Notice - Desktop Only */}
              <div className="hidden lg:block border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-4 w-4 text-black mr-2" />
                  <h3 className="text-[10px] uppercase tracking-wide font-medium">Bank-level Security</h3>
                </div>
                <p className="text-[10px] text-gray-600">
                  All communications through this form are protected with institutional-grade encryption. Your sensitive information is secure with us, maintaining the discrete and confidential nature expected of Schwarzes Schild Bank.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}