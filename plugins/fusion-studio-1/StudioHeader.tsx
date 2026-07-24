import React from "react";
import { Sun, Moon, LogOut, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UsageMeter, DiscountBanner, UpgradeModal } from "@/components/subscription";

interface StudioHeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  tier: string;
  setShowUpgradeModal: (show: boolean) => void;
  onLogout: () => void;
  theme: {
    border: string;
    card: string;
    text: string;
    textMuted: string;
    activeItem: string;
  };
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  currentView,
  setCurrentView,
  isDarkMode,
  setIsDarkMode,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
  tier,
  setShowUpgradeModal,
  onLogout,
  theme,
}) => {
  return (
    <nav className={`h-16 border-b ${theme.border} flex items-center justify-between px-6 sticky top-0 z-40 backdrop-blur-xl bg-black/50`}>
      <div className="flex items-center gap-3">
        <span className="font-bold tracking-tight">Fusion</span>
      </div>
      <div className={`flex bg-white/5 p-1 rounded-full border ${theme.border}`}>
        {["studio", "packs", "vault"].map(view => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
              currentView === view ? theme.activeItem : "text-gray-500 hover:text-white"
            }`}
          >
            {view}
          </button>
        ))}
      </div>
      
      {/* Desktop: Show buttons directly */}
      {!isMobile && (
        <div className="flex items-center gap-3">
          <UsageMeter compact onClick={() => setShowUpgradeModal(true)} />
          <DiscountBanner variant="compact" />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white flex items-center gap-2 text-sm"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}

      {/* Mobile: Show hamburger menu */}
      {isMobile && (
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-white">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className={`${theme.card} border-l ${theme.border} w-[280px]`}>
            <SheetHeader className="mb-6">
              <SheetTitle className={theme.text}>Menu</SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col gap-4">
              <UsageMeter onClick={() => setShowUpgradeModal(true)} />
              <DiscountBanner />
              
              <div className={`p-4 rounded-xl border ${theme.border} ${theme.card}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                    <User size={20} className="text-black" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${theme.text}`}>User</p>
                    <p className={`text-xs ${theme.textMuted}`}>{tier === 'creator' ? 'Creator Plan' : 'Free Plan'}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center justify-between p-4 rounded-xl border ${theme.border} ${theme.card} hover:border-[#CCFF00]/50 transition-all`}
              >
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                  <span className={`text-sm font-medium ${theme.text}`}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>
                <div className={`w-10 h-6 rounded-full ${isDarkMode ? 'bg-[#CCFF00]' : 'bg-gray-600'} relative transition-colors`}>
                  <div className={`absolute top-1 ${isDarkMode ? 'right-1' : 'left-1'} w-4 h-4 rounded-full bg-black transition-all`} />
                </div>
              </button>

              <button
                onClick={onLogout}
                className={`flex items-center gap-3 p-4 rounded-xl border ${theme.border} ${theme.card} hover:border-red-500/50 transition-all text-red-400 hover:text-red-300`}
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </nav>
  );
};
