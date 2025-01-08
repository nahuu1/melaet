import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: "pending" | "processing" | "delivered";
  deliveryOption: "pickup" | "delivery";
}

const Orders = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Traditional Coffee Set",
      price: 1200,
      quantity: 1,
      status: "pending",
      deliveryOption: "delivery"
    }
  ]);

  const translations = {
    english: {
      title: "My Orders",
      noOrders: "No orders yet",
      status: "Status",
      delivery: "Delivery",
      pickup: "Pickup",
      total: "Total",
      pending: "Pending",
      processing: "Processing",
      delivered: "Delivered",
      birr: "Birr",
      back: "Back"
    },
    amharic: {
      title: "ትዕዛዞቼ",
      noOrders: "ምንም ትዕዛዝ የለም",
      status: "ሁኔታ",
      delivery: "ማድረስ",
      pickup: "መውሰጃ",
      total: "ጠቅላላ",
      pending: "በመጠባበቅ ላይ",
      processing: "በሂደት ላይ",
      delivered: "ደርሷል",
      birr: "ብር",
      back: "ተመለስ"
    }
  };

  const [language, setLanguage] = useState<"english" | "amharic">("english");
  const t = translations[language];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/home")}
          className="hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="ml-auto">
          <Button
            onClick={() => setLanguage(prev => prev === "english" ? "amharic" : "english")}
            variant="outline"
          >
            {language === "english" ? "አማርኛ" : "English"}
          </Button>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">{t.noOrders}</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{order.name}</h3>
                  <p className="text-gray-600">
                    {t.status}: {t[order.status]}
                  </p>
                  <p className="text-gray-600">
                    {order.deliveryOption === "delivery" ? t.delivery : t.pickup}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {order.price * order.quantity} {t.birr}
                  </p>
                  <p className="text-sm text-gray-500">x{order.quantity}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;