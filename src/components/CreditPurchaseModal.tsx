import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Sparkles, Check } from "lucide-react";

const packages = [
  { id: "starter", credits: 2, price: "€4.99", pricePerCredit: "€2.50" },
  { id: "bundle", credits: 10, price: "€14.99", pricePerCredit: "€1.50", popular: true },
  { id: "collection", credits: 20, price: "€24.99", pricePerCredit: "€1.25" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreditPurchaseModal = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setLoading(packageId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { package_id: packageId },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to start checkout");
      setLoading(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{t("dashboard.buyCredits")}</DialogTitle>
          <DialogDescription>{t("pricing.subtitle")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-luxury ${
                pkg.popular ? "border-primary" : "border-border"
              }`}
              onClick={() => !loading && handlePurchase(pkg.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{pkg.credits} {t("pricing.credits")}</span>
                      {pkg.popular && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">
                          {t("pricing.popular")}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{pkg.pricePerCredit} per credit</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-serif text-xl font-bold">{pkg.price}</span>
                  <Button
                    size="sm"
                    variant={pkg.popular ? "default" : "outline"}
                    className="rounded-full"
                    disabled={!!loading}
                  >
                    {loading === pkg.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
