import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface CheckoutDialogProps {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
  };
}

export const CheckoutDialog = ({ open, onClose, product }: CheckoutDialogProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"english" | "amharic">("english");

  const translations = {
    english: {
      title: "Checkout",
      selectPayment: "Select Payment Method",
      delivery: "Delivery Options",
      pickup: "Pickup",
      homeDelivery: "Home Delivery",
      total: "Total",
      birr: "Birr",
      completeOrder: "Complete Order"
    },
    amharic: {
      title: "ክፍያ",
      selectPayment: "የክፍያ ዘዴን ይምረጡ",
      delivery: "የማድረስ አማራጮች",
      pickup: "መውሰጃ",
      homeDelivery: "የቤት እስከ ቤት",
      total: "ጠቅላላ",
      birr: "ብር",
      completeOrder: "ትዕዛዙን ያጠናቅቁ"
    }
  };

  const t = translations[language];

  const handlePayment = (method: string) => {
    toast({
      title: "Order Placed",
      description: `Payment initiated with ${method}. You will be redirected to complete the payment.`,
    });
    onClose();
    navigate("/orders");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{t.title}</DialogTitle>
            <Button
              onClick={() => setLanguage(prev => prev === "english" ? "amharic" : "english")}
              variant="outline"
              size="sm"
            >
              {language === "english" ? "አማርኛ" : "English"}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-semibold mb-4">{t.selectPayment}</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => handlePayment("telebirr")} variant="outline">
                TeleBirr
              </Button>
              <Button onClick={() => handlePayment("cbebirr")} variant="outline">
                CBE Birr
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t.delivery}</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">{t.pickup}</Button>
              <Button variant="outline">{t.homeDelivery}</Button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-semibold">{t.total}:</span>
            <span className="font-bold">{product.price} {t.birr}</span>
          </div>

          <Button className="w-full" onClick={() => handlePayment("telebirr")}>
            {t.completeOrder}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};