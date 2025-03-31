
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, ChevronDown, User, LogOut, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-primary text-2xl font-bold">My Doctor</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/blog" className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Blog
              </Link>
              <Link to="/resources" className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Resources
              </Link>
              {currentUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-transparent text-gray-500 hover:border-primary hover:text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Services <ChevronDown size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/doctor-consultation" className="w-full">Doctor Consultation</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/blood-seeking" className="w-full">Emergency Blood</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/lab-centers" className="w-full">Lab Centers</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary">
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-5 w-5 text-gray-500 hover:text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="p-2 text-sm text-gray-500">No new notifications</div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5 text-gray-500 hover:text-primary" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
              Home
            </Link>
            <Link to="/blog" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
              Blog
            </Link>
            <Link to="/resources" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
              Resources
            </Link>
            {currentUser && (
              <>
                <Link to="/doctor-consultation" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
                  Doctor Consultation
                </Link>
                <Link to="/blood-seeking" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
                  Emergency Blood
                </Link>
                <Link to="/lab-centers" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
                  Lab Centers
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
                  Profile
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium w-full text-left">
                  Log out
                </button>
              </>
            )}
            {!currentUser && (
              <Link to="/login" className="text-gray-600 hover:bg-gray-50 hover:text-primary block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
