import { useState } from "react";
import { 
  UserIcon, 
  BadgeIcon, 
  CreditCardIcon, 
  MonitorIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample member tiers
const MEMBER_TIERS = ["SILVER", "GOLD", "PLATINUM", "BLACK"];

interface UserProfileCardProps {
  user?: {
    fullname: string;
    email: string;
    phone: string;
    address: string;
    memberSince: Date;
    tier?: string;
    avatar?: string;
  };
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  // Default/mock user if none provided
  const defaultUser = {
    fullname: "Jonathan Schmidt",
    email: "j.schmidt@example.com",
    phone: "+41 78 123 4567",
    address: "Bahnhofstrasse 21, 8001 Zürich, Switzerland",
    memberSince: new Date(2023, 5, 15),
    tier: "PLATINUM",
    avatar: undefined
  };

  const profileUser = user || defaultUser;
  const [isEditing, setIsEditing] = useState(false);
  
  // Calculate membership duration
  const getMembershipDuration = () => {
    const now = new Date();
    const memberSince = profileUser.memberSince;
    const diffTime = Math.abs(now.getTime() - memberSince.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years, ${Math.floor((diffDays % 365) / 30)} months`;
  };

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-8 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {profileUser.avatar ? (
              <img 
                src={profileUser.avatar} 
                alt={profileUser.fullname} 
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mr-4">
                <UserIcon className="h-8 w-8" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{profileUser.fullname}</h2>
              <div className="text-sm text-gray-600">Client since {profileUser.memberSince.toLocaleDateString()}</div>
            </div>
          </div>
          
          <div>
            {profileUser.tier && (
              <div className="bg-black text-white py-1 px-3 text-xs font-semibold tracking-wider">
                {profileUser.tier} MEMBER
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isEditing ? (
            <>
              <div className="flex items-start">
                <MailIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email Address</div>
                  <div>{profileUser.email}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <PhoneIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                  <div>{profileUser.phone}</div>
                </div>
              </div>
              
              <div className="flex items-start col-span-1 md:col-span-2">
                <MapPinIcon className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Address</div>
                  <div>{profileUser.address}</div>
                </div>
              </div>
            </>
          ) : (
            <form className="col-span-1 md:col-span-2 space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={profileUser.email}
                  className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
                <input 
                  type="tel" 
                  defaultValue={profileUser.phone}
                  className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Address</label>
                <input 
                  type="text" 
                  defaultValue={profileUser.address}
                  className="w-full border-b border-gray-300 py-2 focus:border-black focus:outline-none"
                />
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
          <div className="flex items-center">
            <BadgeIcon className="h-5 w-5 mr-2 text-black" />
            <span className="text-sm">Member for {getMembershipDuration()}</span>
          </div>
          
          <Button 
            variant="outline"
            className="text-xs"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "SAVE CHANGES" : "EDIT PROFILE"}
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
            <CreditCardIcon className="h-4 w-4" />
          </div>
          <div className="text-sm">3 Linked Accounts</div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
            <MonitorIcon className="h-4 w-4" />
          </div>
          <div className="text-sm">2 Linked Devices</div>
        </div>
      </div>
    </div>
  );
}