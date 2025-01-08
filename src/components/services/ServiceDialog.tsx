import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckoutDialog } from "@/components/checkout/CheckoutDialog";

interface ServiceDialogProps {
  service: {
    name: string;
    provider: string;
    description: string;
    price: number;
    distance: number;
    rating: number;
    image: string;
    location: string;
  } | null;
  onClose: () => void;
}

export const ServiceDialog = ({ service, onClose }: ServiceDialogProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [language, setLanguage] = useState<"english" | "amharic">("english");

  const translations = {
    english: {
      provider: "Provider",
      distance: "Distance",
      rating: "Rating",
      location: "Location",
      description: "Description",
      price: "Price",
      birr: "Birr",
      buyNow: "Buy Now"
    },
    amharic: {
      provider: "አቅራቢ",
      distance: "ርቀት",
      rating: "ደረጃ",
      location: "አድራሻ",
      description: "መግለጫ",
      price: "ዋጋ",
      birr: "ብር",
      buyNow: "አሁን ይግዙ"
    }
  };

  const t = translations[language];

  if (!service) return null;

  return (
    <>
      <Dialog open={Boolean(service)} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{service.name}</h2>
              <p className="text-gray-600">{service.provider}</p>
            </div>
            <Button
              onClick={() => setLanguage(prev => prev === "english" ? "amharic" : "english")}
              variant="outline"
              size="sm"
            >
              {language === "english" ? "አማርኛ" : "English"}
            </Button>
          </div>

          <div className="space-y-4">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">{t.distance}</p>
                <p className="font-semibold">{service.distance} km</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.rating}</p>
                <p className="font-semibold">⭐ {service.rating}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.location}</p>
                <p className="font-semibold">{service.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.price}</p>
                <p className="font-semibold">{service.price} {t.birr}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">{t.description}</p>
              <p>{service.description}</p>
            </div>

            <Button className="w-full" onClick={() => setShowCheckout(true)}>
              {t.buyNow}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CheckoutDialog
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        product={service}
      />
    </>
  );
};