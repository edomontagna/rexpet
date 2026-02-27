import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Upload, History, Settings, Crown, Sparkles, Download, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useCreditBalance } from "@/hooks/useCredits";
import { useGenerations } from "@/hooks/useGenerations";
import { CreditPurchaseModal } from "@/components/CreditPurchaseModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "history" | "settings">("dashboard");
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: creditBalance, isLoading: creditsLoading } = useCreditBalance();
  const { data: generations, isLoading: generationsLoading } = useGenerations();
  const updateProfile = useUpdateProfile();

  const [editName, setEditName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleSaveName = async () => {
    if (!editName.trim()) return;
    const result = await updateProfile.mutateAsync({ display_name: editName.trim() });
    if (result.error) {
      toast.error("Failed to update name");
    } else {
      toast.success("Name updated");
      setEditingName(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted.")) return;
    // Mark account for deletion via audit log - actual deletion handled by backend
    await supabase.from("audit_log").insert({
      user_id: user?.id,
      event_type: "account_deleted" as const,
      metadata: { requested_at: new Date().toISOString() },
    });
    await signOut();
    toast.success("Account deletion requested. Your data will be removed shortly.");
    navigate("/");
  };

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "User";

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: Upload },
    { id: "history" as const, label: "History", icon: History },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left sidebar */}
      <aside className="hidden lg:flex w-56 border-r border-border flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="font-serif text-xl font-bold text-gradient-gold">RexPet</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
              {displayName[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile shows logo, desktop shows actions) */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8">
          <h1 className="font-serif text-xl font-bold text-gradient-gold lg:hidden">RexPet</h1>
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">
                {creditsLoading ? <Skeleton className="h-4 w-8 inline-block" /> : creditBalance ?? 0} credits
              </span>
            </div>
            <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary/30 text-primary hover:bg-primary/5" asChild>
              <Link to="/generate">
                <Crown className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Create Portrait</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Sign out" className="lg:hidden">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 p-6 lg:p-10 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="max-w-4xl">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                Welcome, {displayName}
              </h2>
              <p className="text-muted-foreground mb-8">Create your next pet masterpiece</p>

              {/* Credits card */}
              <div className="p-6 rounded-xl bg-card border border-border shadow-luxury mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Balance</p>
                    <p className="font-serif text-4xl font-bold text-foreground">
                      {creditsLoading ? <Skeleton className="h-10 w-16" /> : creditBalance ?? 0}
                    </p>
                  </div>
                  <Button className="rounded-full" onClick={() => setCreditModalOpen(true)}>Buy Credits</Button>
                </div>
              </div>

              {/* Recent generations or empty state */}
              {generationsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}
                </div>
              ) : generations && generations.length > 0 ? (
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Recent Portraits</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {generations.slice(0, 6).map((gen) => (
                      <div key={gen.id} className="aspect-square rounded-xl bg-card border border-border overflow-hidden relative group">
                        {gen.storage_path ? (
                          <img
                            src={gen.storage_path}
                            alt="Generated portrait"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {gen.status === "failed" ? (
                              <AlertCircle className="h-8 w-8 text-destructive" />
                            ) : (
                              <Skeleton className="w-full h-full" />
                            )}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" variant="secondary" className="rounded-full gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card/50">
                  <Upload className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No portraits yet</h3>
                  <p className="text-muted-foreground mb-6">Upload a photo of your pet to get started</p>
                  <Button className="rounded-full" asChild>
                    <Link to="/generate">Upload Photo</Link>
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="max-w-4xl">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">History</h2>
              <p className="text-muted-foreground mb-8">All your generated portraits</p>
              {generationsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}
                </div>
              ) : generations && generations.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {generations.map((gen) => (
                    <div key={gen.id} className="rounded-xl bg-card border border-border overflow-hidden">
                      <div className="aspect-square relative group">
                        {gen.storage_path ? (
                          <img src={gen.storage_path} alt="Portrait" className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted/50">
                            {gen.status === "failed" ? (
                              <AlertCircle className="h-6 w-6 text-destructive" />
                            ) : (
                              <Skeleton className="w-full h-full" />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium truncate">{(gen as Record<string, { name?: string }>).styles?.name || "Portrait"}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            gen.status === "completed" ? "bg-green-100 text-green-700" :
                            gen.status === "failed" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {gen.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(gen.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card/50">
                  <History className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No history yet</h3>
                  <p className="text-muted-foreground">Your generated portraits will appear here</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Settings</h2>
              <p className="text-muted-foreground mb-8">Manage your account</p>
              <div className="space-y-6">
                {/* Profile */}
                <div className="p-6 rounded-xl bg-card border border-border space-y-4">
                  <h3 className="font-serif text-lg font-semibold">Profile</h3>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    {editingName ? (
                      <div className="flex gap-2">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Your name"
                        />
                        <Button size="sm" onClick={handleSaveName} disabled={updateProfile.isPending}>
                          Save
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingName(false)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-sm">{profileLoading ? <Skeleton className="h-4 w-24" /> : displayName}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditName(profile?.display_name || "");
                            setEditingName(true);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Danger zone */}
                <div className="p-6 rounded-xl border border-destructive/30 space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden border-t border-border flex" aria-label="Dashboard navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <CreditPurchaseModal open={creditModalOpen} onOpenChange={setCreditModalOpen} />
    </div>
  );
};

export default Dashboard;
