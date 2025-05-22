import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserCog, 
  ShieldAlert, 
  Activity, 
  BarChart3, 
  Settings, 
  LogOut,
  Search,
  Filter,
  Plus
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";

// User types to display in the admin panel
type UserRole = "admin" | "client" | "support";
type UserStatus = "active" | "inactive" | "suspended" | "pending";

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: Date;
  createdAt: Date;
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedNav, setSelectedNav] = useState<string>("users");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock users for demonstration
  const users: User[] = [
    {
      id: 1,
      username: "admin1",
      email: "admin@schwarzesschild.com",
      fullName: "Admin User",
      role: "admin",
      status: "active",
      lastLogin: new Date(),
      createdAt: new Date(2023, 0, 15)
    },
    {
      id: 2,
      username: "client1",
      email: "client1@example.com",
      fullName: "Client One",
      role: "client",
      status: "active",
      lastLogin: new Date(2025, 4, 15),
      createdAt: new Date(2024, 2, 10)
    },
    {
      id: 3,
      username: "client2",
      email: "client2@example.com",
      fullName: "Client Two",
      role: "client",
      status: "inactive",
      lastLogin: new Date(2025, 3, 20),
      createdAt: new Date(2024, 1, 5)
    },
    {
      id: 4,
      username: "support1",
      email: "support1@schwarzesschild.com",
      fullName: "Support Agent",
      role: "support",
      status: "active",
      lastLogin: new Date(2025, 4, 21),
      createdAt: new Date(2023, 11, 1)
    },
    {
      id: 5,
      username: "client3",
      email: "client3@example.com",
      fullName: "Client Three",
      role: "client",
      status: "suspended",
      lastLogin: new Date(2025, 2, 10),
      createdAt: new Date(2023, 9, 18)
    },
    {
      id: 6,
      username: "client4",
      email: "client4@example.com",
      fullName: "Client Four",
      role: "client",
      status: "pending",
      lastLogin: new Date(2025, 4, 1),
      createdAt: new Date(2025, 3, 30)
    }
  ];

  // Filter users based on search query and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      searchQuery === "" || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "all" || 
      user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).format(date);
  };

  const handleUserAction = (action: string, userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    let title = "";
    let description = "";

    switch (action) {
      case "edit":
        title = "Edit user";
        description = `Opening edit form for ${user.username}`;
        break;
      case "suspend":
        title = "User suspended";
        description = `${user.username} has been suspended. All access has been revoked.`;
        break;
      case "activate":
        title = "User activated";
        description = `${user.username} has been activated and can now access the platform.`;
        break;
      case "delete":
        title = "User deleted";
        description = `${user.username} has been permanently deleted from the system.`;
        break;
      case "password":
        title = "Password reset";
        description = `Password reset link has been sent to ${user.email}.`;
        break;
    }

    toast({
      title,
      description,
    });
  };

  const getUserStatusBadge = (status: UserStatus) => {
    const baseClasses = "inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium";
    
    switch (status) {
      case "active":
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Active</span>;
      case "inactive":
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Inactive</span>;
      case "suspended":
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Suspended</span>;
      case "pending":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Administrator Panel</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-sm"
          >
            Return to Main Dashboard
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Admin Navigation Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold">Administration</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`flex items-center w-full px-3 py-2 text-sm ${
                        selectedNav === "users" 
                          ? "bg-black text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedNav("users")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      User Management
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full px-3 py-2 text-sm ${
                        selectedNav === "roles" 
                          ? "bg-black text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedNav("roles")}
                    >
                      <UserCog className="mr-2 h-4 w-4" />
                      Roles & Permissions
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full px-3 py-2 text-sm ${
                        selectedNav === "security" 
                          ? "bg-black text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedNav("security")}
                    >
                      <ShieldAlert className="mr-2 h-4 w-4" />
                      Security Logs
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full px-3 py-2 text-sm ${
                        selectedNav === "activity" 
                          ? "bg-black text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedNav("activity")}
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      Activity Monitor
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full px-3 py-2 text-sm ${
                        selectedNav === "reports" 
                          ? "bg-black text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedNav("reports")}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Reports
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full px-3 py-2 text-sm ${
                        selectedNav === "settings" 
                          ? "bg-black text-white" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedNav("settings")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      System Settings
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="p-4 border-t border-gray-200">
                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => navigate("/auth")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout Admin
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            {selectedNav === "users" && (
              <div className="bg-white border border-gray-200">
                <div className="border-b border-gray-200 p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-lg font-semibold">User Management</h2>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          className="pl-9 pr-4 py-2 border border-gray-300 rounded-none w-full md:w-64"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <select
                          className="pl-9 pr-4 py-2 border border-gray-300 rounded-none appearance-none w-full md:w-36"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                      <Button 
                        className="bg-black text-white rounded-none flex items-center"
                        onClick={() => {
                          toast({
                            title: "Create new user",
                            description: "Opening new user form",
                          });
                        }}
                      >
                        <Plus className="mr-1 h-4 w-4" /> Add User
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div>
                                <div className="font-medium text-gray-900">{user.fullName}</div>
                                <div className="text-gray-500 text-xs">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="capitalize">{user.role}</span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {getUserStatusBadge(user.status)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                              {formatDate(user.lastLogin)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                              {formatDate(user.createdAt)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                              <button 
                                className="text-gray-600 hover:text-gray-900"
                                onClick={() => handleUserAction("edit", user.id)}
                              >
                                Edit
                              </button>
                              {user.status === "active" ? (
                                <button 
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleUserAction("suspend", user.id)}
                                >
                                  Suspend
                                </button>
                              ) : user.status === "suspended" || user.status === "inactive" ? (
                                <button 
                                  className="text-green-600 hover:text-green-900"
                                  onClick={() => handleUserAction("activate", user.id)}
                                >
                                  Activate
                                </button>
                              ) : null}
                              <button 
                                className="text-gray-600 hover:text-gray-900"
                                onClick={() => handleUserAction("password", user.id)}
                              >
                                Reset PWD
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                            No users found matching your search criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
              </div>
            )}
            
            {selectedNav === "roles" && (
              <div className="bg-white border border-gray-200 p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <UserCog className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Roles & Permissions</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    This section allows you to define roles and set granular permissions for different user types.
                  </p>
                  <Button
                    className="mt-4 bg-black text-white"
                    onClick={() => {
                      toast({
                        title: "Feature in development",
                        description: "The roles and permissions manager will be available in the next update."
                      });
                    }}
                  >
                    Configure Roles
                  </Button>
                </div>
              </div>
            )}
            
            {selectedNav === "security" && (
              <div className="bg-white border border-gray-200 p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <ShieldAlert className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Security Logs</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Monitor security events, login attempts, and potential threats to the system.
                  </p>
                  <Button
                    className="mt-4 bg-black text-white"
                    onClick={() => {
                      toast({
                        title: "Feature in development",
                        description: "The security logs module will be available in the next update."
                      });
                    }}
                  >
                    View Logs
                  </Button>
                </div>
              </div>
            )}

            {selectedNav === "activity" && (
              <div className="bg-white border border-gray-200 p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Activity Monitor</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Real-time monitoring of user sessions, transactions, and system activities.
                  </p>
                  <Button
                    className="mt-4 bg-black text-white"
                    onClick={() => {
                      toast({
                        title: "Feature in development",
                        description: "The activity monitoring dashboard will be available in the next update."
                      });
                    }}
                  >
                    View Activities
                  </Button>
                </div>
              </div>
            )}

            {selectedNav === "reports" && (
              <div className="bg-white border border-gray-200 p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Reports</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Generate customized reports on system usage, user statistics, and financial activities.
                  </p>
                  <Button
                    className="mt-4 bg-black text-white"
                    onClick={() => {
                      toast({
                        title: "Feature in development",
                        description: "The reporting module will be available in the next update."
                      });
                    }}
                  >
                    Generate Reports
                  </Button>
                </div>
              </div>
            )}

            {selectedNav === "settings" && (
              <div className="bg-white border border-gray-200 p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">System Settings</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Configure global system settings, preferences, and integration options.
                  </p>
                  <Button
                    className="mt-4 bg-black text-white"
                    onClick={() => {
                      toast({
                        title: "Feature in development",
                        description: "The system settings configuration will be available in the next update."
                      });
                    }}
                  >
                    Configure Settings
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}