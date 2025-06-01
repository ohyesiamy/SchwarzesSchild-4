import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Search, 
  Filter, 
  MoreHorizontal,
  Lock,
  Unlock,
  UserX,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AdminUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  accountNumber: string;
  totalBalance: number;
  currency: string;
  status: "active" | "suspended" | "frozen";
  lastLogin: Date;
  joinDate: Date;
  riskLevel: "low" | "medium" | "high";
  accountType: "standard" | "premium";
}

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  totalBalance: number;
  monthlyTransactions: number;
  flaggedAccounts: number;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferReason, setTransferReason] = useState("");

  // Fetch admin statistics
  const { data: adminStats } = useQuery<AdminStats>({
    queryKey: ['/api/admin/stats'],
    staleTime: 30000, // 30 seconds
  });

  // Fetch users list
  const { data: users = [], isLoading } = useQuery<AdminUser[]>({
    queryKey: ['/api/admin/users', searchTerm, statusFilter, riskFilter],
    staleTime: 10000, // 10 seconds
  });

  // User action mutations
  const userActionMutation = useMutation({
    mutationFn: async ({ userId, action }: { userId: number; action: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}/status`, { action });
      return await res.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      
      const actionMap: Record<string, string> = {
        suspend: "suspended",
        activate: "activated", 
        freeze: "frozen"
      };
      
      toast({
        title: "Action Completed",
        description: `User account has been ${actionMap[variables.action]}.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Action Failed",
        description: error.message || "Failed to perform user action.",
        variant: "destructive"
      });
    }
  });

  // Transfer mutation
  const transferMutation = useMutation({
    mutationFn: async ({ userId, amount, reason }: { userId: number; amount: number; reason: string }) => {
      const res = await apiRequest("POST", `/api/admin/transfer`, { 
        userId, 
        amount, 
        reason 
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      
      toast({
        title: "Transfer Processed",
        description: `${formatCurrency(parseFloat(transferAmount), selectedUser?.currency || "EUR")} has been transferred successfully.`,
      });
      
      setShowTransferModal(false);
      setTransferAmount("");
      setTransferReason("");
      setSelectedUser(null);
    },
    onError: (error: any) => {
      toast({
        title: "Transfer Failed",
        description: error.message || "Failed to process transfer.",
        variant: "destructive"
      });
    }
  });

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRisk = riskFilter === "all" || user.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleUserAction = (action: string, userId: number) => {
    userActionMutation.mutate({ userId, action });
  };

  const handleTransfer = () => {
    if (!selectedUser || !transferAmount) return;
    
    transferMutation.mutate({
      userId: selectedUser.id,
      amount: parseFloat(transferAmount),
      reason: transferReason
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Suspended</Badge>;
      case "frozen":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Frozen</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Low Risk</Badge>;
      case "medium":
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium Risk</Badge>;
      case "high":
        return <Badge className="bg-red-50 text-red-700 border-red-200">High Risk</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navigation active="admin" />
      <MobileNavigation active="admin" />
      
      <main className="py-5 px-4 container mx-auto flex-grow mb-20 md:mb-0 max-w-[1440px]">
        {/* Admin Header */}
        <div className="flex flex-col mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl uppercase tracking-wide font-medium mb-1">Administration Panel</h1>
              <div className="w-8 h-0.5 bg-black mb-2"></div>
              <p className="text-sm text-gray-600">User Management & System Control</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-100 text-red-800 border-red-200">Admin Access</Badge>
              <Shield className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Admin Statistics */}
        {adminStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(adminStats.totalBalance, "EUR")}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.monthlyTransactions.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Flagged Accounts</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.flaggedAccounts}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Section */}
        <div className="bg-white border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium mb-4">User Management</h2>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name, username, or account number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="frozen">Frozen</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No users found matching the criteria.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.fullname}</div>
                          <div className="text-sm text-gray-500">{user.username}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-mono text-sm">{user.accountNumber}</div>
                        <div className="text-xs text-gray-500 capitalize">{user.accountType}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium">{formatCurrency(user.totalBalance, user.currency)}</div>
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-4 py-4">
                        {getRiskBadge(user.riskLevel)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">{formatDate(new Date(user.lastLogin))}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {user.status === "active" ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction("suspend", user.id)}
                              className="text-red-600 hover:text-red-800"
                              disabled={userActionMutation.isPending}
                            >
                              <Lock className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUserAction("activate", user.id)}
                              className="text-green-600 hover:text-green-800"
                              disabled={userActionMutation.isPending}
                            >
                              <Unlock className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowTransferModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* User Details Modal */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedUser?.fullname}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-sm text-gray-900">{selectedUser.fullname}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Username</label>
                <p className="text-sm text-gray-900">{selectedUser.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-sm text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Account Number</label>
                <p className="text-sm font-mono text-gray-900">{selectedUser.accountNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Total Balance</label>
                <p className="text-sm text-gray-900">{formatCurrency(selectedUser.totalBalance, selectedUser.currency)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Account Type</label>
                <p className="text-sm text-gray-900 capitalize">{selectedUser.accountType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Risk Level</label>
                <div className="mt-1">{getRiskBadge(selectedUser.riskLevel)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Join Date</label>
                <p className="text-sm text-gray-900">{formatDate(new Date(selectedUser.joinDate))}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Login</label>
                <p className="text-sm text-gray-900">{formatDate(new Date(selectedUser.lastLogin))}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Modal */}
      <Dialog open={showTransferModal} onOpenChange={setShowTransferModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Administrative Transfer</DialogTitle>
            <DialogDescription>
              Transfer funds to {selectedUser?.fullname}'s account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Amount ({selectedUser?.currency})</label>
              <Input
                type="number"
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Reason</label>
              <Input
                placeholder="Administrative adjustment..."
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTransferModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleTransfer} 
              disabled={!transferAmount || transferMutation.isPending}
            >
              {transferMutation.isPending ? "Processing..." : "Process Transfer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}