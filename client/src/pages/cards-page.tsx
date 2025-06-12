import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { VirtualCard } from "@/components/account/virtual-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, /* Settings, */ AlertCircle, Shield, Activity, CreditCard } from "lucide-react";
import { /* formatCurrency, */ formatDate } from "@/lib/utils";
import { CardManagementModal } from "@/components/modals/card-management-modal";
import { useToast } from "@/hooks/use-toast";
import { useCards, useFreezeCard } from "@/lib/api-hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardsPage() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const { toast } = useToast();
  
  const { data: cards = [], isLoading, refetch } = useCards();
  const freezeCardMutation = useFreezeCard();

  const handleCardClick = (card: any) => {
    setSelectedCard(card);
    setIsCardModalOpen(true);
  };

  const handleToggleFreeze = async (e: React.MouseEvent, cardId: number, currentStatus: boolean) => {
    e.stopPropagation();
    
    try {
      await freezeCardMutation.mutateAsync({
        id: cardId,
        isFrozen: !currentStatus
      });
      
      toast({
        title: !currentStatus ? "Card frozen" : "Card unfrozen",
        description: !currentStatus 
          ? "Your card has been temporarily frozen. You can unfreeze it anytime."
          : "Your card is now active and ready to use.",
      });
    } catch (error) {
      toast({
        title: "Action failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="cards" />
      <MobileNavigation active="cards" />
      
      <main className="py-8 px-4 container mx-auto flex-grow mb-20 md:mb-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-playfair">Your Cards</h1>
          <Button size="sm" onClick={() => {
            setSelectedCard(null);
            setIsCardModalOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            <>
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
            </>
          ) : cards.length > 0 ? (
            cards.map((card) => (
              <div key={card.id} className="cursor-pointer" onClick={() => handleCardClick(card)}>
                <VirtualCard
                  cardNumber={card.cardNumber}
                  cardholderName={card.name || undefined}
                  expiryDate={card.expiryDate}
                  balance={card.spendingLimit || 0}
                  currency="EUR"
                  isFrozen={card.isFrozen ?? false}
                />
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {card.isFrozen ? 'Frozen' : 'Active'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleToggleFreeze(e, card.id, card.isFrozen ?? false)}
                    disabled={freezeCardMutation.isPending}
                  >
                    {card.isFrozen ? 'Unfreeze' : 'Freeze'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No cards yet. Add your first card to get started.</p>
            </div>
          )}
        </div>

        {/* Card Security Section */}
        <Card className="p-6 mb-8">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Card Security</h3>
              <p className="text-gray-600 mb-4">
                Your cards are protected with advanced security features including real-time fraud monitoring,
                instant freeze/unfreeze capabilities, and transaction notifications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">3D Secure</div>
                  <div className="text-sm text-gray-600">Enabled for all online transactions</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Transaction Alerts</div>
                  <div className="text-sm text-gray-600">Real-time notifications</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Spending Controls</div>
                  <div className="text-sm text-gray-600">Set custom limits</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Security Activity
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">Card successfully verified</div>
                  <div className="text-sm text-gray-600">{formatDate(new Date())}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Security settings updated</div>
                  <div className="text-sm text-gray-600">{formatDate(new Date(Date.now() - 86400000))}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <Footer className="hidden md:block" />
      
      <CardManagementModal
        open={isCardModalOpen}
        onOpenChange={setIsCardModalOpen}
        card={selectedCard}
        onSuccess={() => refetch()}
      />
    </div>
  );
}