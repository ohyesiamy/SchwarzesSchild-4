import { 
  BookOpenIcon,
  FileTextIcon,
  HelpCircleIcon, 
  PhoneIcon,
  MailIcon,
  MessageSquareIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock knowledge center resources
const helpResources = [
  {
    id: 1,
    title: "Account Management Guide",
    type: "guide",
    description: "Learn how to manage your accounts, set up notifications, and customize preferences."
  },
  {
    id: 2,
    title: "Investment Portfolio Documentation",
    type: "document",
    description: "Understand investment strategies, risk assessments, and portfolio diversification."
  },
  {
    id: 3,
    title: "Security Best Practices",
    type: "guide",
    description: "Protect your account with our recommended security practices and tools."
  },
  {
    id: 4,
    title: "Tax Documentation & Reporting",
    type: "document",
    description: "Access tax statements, understand reporting requirements, and prepare for tax season."
  }
];

export function KnowledgeCenter() {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide':
        return <BookOpenIcon className="h-5 w-5 text-blue-600" />;
      case 'document':
        return <FileTextIcon className="h-5 w-5 text-green-600" />;
      default:
        return <HelpCircleIcon className="h-5 w-5 text-blue-600" />;
    }
  };
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium">Banking Help Center</h3>
      </div>
      
      <div className="p-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Frequently Accessed Resources</h4>
        
        <div className="space-y-4 mb-8">
          {helpResources.map((resource) => (
            <div key={resource.id} className="group flex items-start p-3 border border-gray-100 rounded-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:shadow-sm">
              <div className="mr-3 mt-0.5">{getResourceIcon(resource.type)}</div>
              <div>
                <h5 className="font-medium text-sm group-hover:text-black transition-colors">{resource.title}</h5>
                <p className="text-xs text-gray-600 mt-1">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <h4 className="text-sm font-medium text-gray-700 mb-4">Contact & Support</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gray-200 p-4 rounded-sm hover:border-gray-300 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center mb-3">
              <PhoneIcon className="h-4 w-4 mr-2 text-black" />
              <span className="text-sm font-medium">Phone Support</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">24/7 dedicated support line for premium clients</p>
            <div className="text-sm font-semibold">+41 800 555 0000</div>
          </div>
          
          <div className="border border-gray-200 p-4 rounded-sm hover:border-gray-300 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center mb-3">
              <MailIcon className="h-4 w-4 mr-2 text-black" />
              <span className="text-sm font-medium">Email Support</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Response within 1 business day</p>
            <div className="text-sm font-semibold break-all">support@schwarzesschild.com</div>
          </div>
          
          <div className="border border-gray-200 p-4 rounded-sm hover:border-gray-300 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center mb-3">
              <MessageSquareIcon className="h-4 w-4 mr-2 text-black" />
              <span className="text-sm font-medium">Secure Chat</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">Available 8:00 - 20:00 CET</p>
            <Button variant="outline" size="sm" className="text-xs w-full">
              Start Conversation
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500">Resources are regularly updated with the latest information</span>
        <Button variant="link" size="sm" className="text-xs text-black p-0">
          Knowledge Base
        </Button>
      </div>
    </div>
  );
}