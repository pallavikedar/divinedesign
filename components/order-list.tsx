

"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Eye,
  Phone,
  Calendar,
  IndianRupee,
  User
} from "lucide-react";
import { BASE_URL } from "@/app/config";
import { useRouter } from "next/navigation";

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${BASE_URL}/Customer-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) return console.log("API Error");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  if (loading)
    return (
      <p className="text-center py-20 text-lg text-gray-600">
        Loading orders...
      </p>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">
        Customer Orders
      </h1>

      {orders.length === 0 ? (
        <Card className="p-10 text-center border-dashed border-gray-300">
          <p className="text-lg text-gray-600">No orders found.</p>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Order No</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Mobile</th>
                <th className="p-3 border">Delivery Date</th>
                <th className="p-3 border">Garments</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-all border-b"
                >
                  <td className="p-3 border text-center font-semibold">
                    #{order.orderNo}
                  </td>

                  <td className="p-3 border">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {order.customerName}
                    </div>
                  </td>

                  <td className="p-3 border text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Phone className="w-4 h-4" /> {order.mobile}
                    </div>
                  </td>

                  <td className="p-3 border text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Calendar className="w-4 h-4" /> {order.deliveryDate}
                    </div>
                  </td>

                  <td className="p-3 border">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {order.garments?.map((g) => (
                        <Badge
                          key={g.id}
                          variant="secondary"
                          className="capitalize bg-gray-100"
                        >
                          {g.type} × {g.quantity}
                        </Badge>
                      ))}
                    </div>
                  </td>

                  <td className="p-3 border text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="flex items-center gap-1 font-semibold">
                        <IndianRupee className="w-4 h-4 text-gray-500" />
                        {order.total}
                      </span>
                      <span className="text-green-600 text-xs">
                        Advance: ₹{order.advance}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          order.balance > 0
                            ? "text-orange-600"
                            : "text-green-700"
                        }`}
                      >
                        Bal: ₹{order.balance}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => router.push(`/orders/${order.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>

                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
