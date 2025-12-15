"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/app/config";
import { User, Phone, Calendar, IndianRupee } from "lucide-react";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchOrderDetails();
  }, [token]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`${BASE_URL}/Customer-orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/Payment/orders/${order.id}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: order.balance,
            method: "Cash",
          }),
        }
      );

      if (!res.ok) return alert("Payment failed");

      alert("Payment successful!");
      fetchOrderDetails();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  if (!order)
    return (
      <p className="text-center py-20 text-gray-600 text-lg">
        Loading order details...
      </p>
    );

  return (
    <div className="p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Order #{order.orderNo}
        </h1>

        <div className="flex gap-3">
          {/* Print */}
          <Button variant="outline" onClick={() => window.print()}>
            🖨 Print
          </Button>

          {/* Payment */}
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handlePayment}
          >
            💰 Add Payment
          </Button>
        </div>
      </div>

      {/* Customer Info */}
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" /> 
              <strong>Name:</strong> {order.customerName}
            </p>

            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" /> 
              <strong>Mobile:</strong> {order.mobile}
            </p>

            <p className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <strong>Delivery:</strong> {order.deliveryDate}
            </p>
          </div>

          {/* Price Summary */}
          <div className="grid grid-cols-3 gap-6 pt-5 border-t">
            <div className="text-lg">
              <strong>Total:</strong> ₹{order.total}
            </div>
            <div className="text-lg">
              <strong>Advance:</strong> ₹{order.advance}
            </div>
            <div
              className={`text-lg font-semibold ${
                order.balance > 0 ? "text-orange-600" : "text-green-700"
              }`}
            >
              Balance: ₹{order.balance}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Garments */}
      <h2 className="text-xl font-semibold mt-10 mb-4">
        Garments & Measurements
      </h2>

      <div className="space-y-4">
        {order.garments?.map((g) => (
          <Card key={g.id} className="shadow-sm border border-gray-200">
            <CardContent className="p-5">
              <p className="text-lg font-medium">
                {g.type} — Qty: {g.quantity}
              </p>

              {g.measurement && (
                <div className="grid grid-cols-3 gap-3 mt-3 text-sm text-gray-700">
                  {Object.entries(g.measurement).map(([key, val]) =>
                    val ? (
                      <p key={key}>
                        <strong>{key}:</strong> {val}
                      </p>
                    ) : null
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Back Button */}
      <div className="mt-10">
        <Button variant="outline" onClick={() => history.back()}>
          ← Back
        </Button>
      </div>
    </div>
  );
}
