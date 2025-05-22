import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
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
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-8">Client Support</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="col-span-1">
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-medium mb-4">Contact Methods</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-black p-2">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dedicated Line</h3>
                    <p className="text-sm text-gray-600 mt-1">+41 44 123 4567</p>
                    <p className="text-xs text-gray-500 mt-1">24/7 for premium clients</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-black p-2">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-gray-600 mt-1">support@schwarzesschild.com</p>
                    <p className="text-xs text-gray-500 mt-1">Response within 1 business day</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-black p-2">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">Secure Messaging</h3>
                    <p className="text-sm text-gray-600 mt-1">Via client portal</p>
                    <p className="text-xs text-gray-500 mt-1">End-to-end encrypted communication</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-black p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">International Offices</h3>
                    <p className="text-sm text-gray-600 mt-1">Zürich, London, New York, Singapore</p>
                    <p className="text-xs text-gray-500 mt-1">In-person appointments available</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6 mt-6">
              <h2 className="text-xl font-medium mb-4">Resources</h2>
              
              <div className="space-y-4">
                <button className="flex items-center w-full text-left py-2 px-3 hover:bg-gray-50">
                  <FileText className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Banking Terms & Conditions</span>
                </button>
                
                <button className="flex items-center w-full text-left py-2 px-3 hover:bg-gray-50">
                  <FileText className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Privacy Policy</span>
                </button>
                
                <button className="flex items-center w-full text-left py-2 px-3 hover:bg-gray-50">
                  <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Frequently Asked Questions</span>
                </button>
                
                <button className="flex items-center w-full text-left py-2 px-3 hover:bg-gray-50">
                  <FileText className="h-4 w-4 mr-3 text-gray-500" />
                  <span>Banking Security Protocol</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Support Request Form */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white border border-gray-200 p-6 h-full">
              <h2 className="text-xl font-medium mb-4">Secure Message</h2>
              <p className="text-sm text-gray-600 mb-6">
                Send a secure message to our support team. All communications are encrypted and will be responded to within one business day.
              </p>
              
              <form onSubmit={handleSubmitMessage}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="w-full p-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full p-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                      placeholder="Please describe your inquiry in detail..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-700">
                        I consent to the processing of my personal data in accordance with the privacy policy.
                      </label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-black text-white w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Secure Message</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium">Bank-level Security</h3>
                </div>
                <p className="text-sm text-gray-600">
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