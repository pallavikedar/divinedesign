"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee, ArrowUp, ArrowDown, X, Printer, ArrowLeft } from "lucide-react";
import { BASE_URL } from "@/app/config";
import { measurementFields } from "@/lib/measurements";
export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
//   const [showPrint, setShowPrint] = useState(false)

  const fetchOrder = async () => {
    try {
      const res = await fetch(`${BASE_URL}/Customer-orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrder(data);
      if (data.paymentHistory) setPaymentHistory(data.paymentHistory);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchOrder();
  }, [token]);

  const handleAddPayment = async () => {
    if (!paymentAmount || !paymentMethod) return alert("Enter amount and method");
    try {
      const res = await fetch(`${BASE_URL}/Payment/orders/${orderId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(paymentAmount), method: paymentMethod }),
      });
      await res.json();
      alert("Payment added successfully!");
      setShowPaymentPopup(false);
      setPaymentAmount("");
      setPaymentMethod("");
      fetchOrder();
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
    }
  };

  const openPaymentHistory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/Payment/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPaymentHistory(data.paymentHistory || []);
      setShowHistoryPopup(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="p-8 space-y-6">
      {/* Header with Back and Payment Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back to Orders
        </Button>

        <div className="flex gap-2">
          <Button onClick={() => setShowPaymentPopup(true)}>Add Payment</Button>
          <Button onClick={openPaymentHistory}>View Payments</Button>
          <Button onClick={() => router.push(`/printbill/${order.id}`)}>
            <Printer size={18} /> Print Bill
          </Button>
        </div>
      </div>

      <h1 className="text-3xl font-bold">Order #{order.orderNo}</h1>

      {/* Customer & Billing Info */}
      <Card>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Mobile:</strong> {order.mobile}</p>
          <h1><strong>Total:</strong> ₹{order.total}</h1>
          <h1><strong>Advance:</strong> ₹{order.advance}</h1>
          <h1><strong>Balance:</strong> ₹{order.balance}</h1>
          <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
        </CardContent>
      </Card>

      {/* Measurements Arrows */}
      <Card>
        <CardHeader>
          <CardTitle>Shoulder  Direction</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-12">
          <div className="flex gap-2">
           {order.up1 && <div><ArrowUp size={24} color="green" />left</div>}
            {order.up2 &&<div> <ArrowUp size={24} color="green" />left</div>}
           {order.up3 && <div><ArrowUp size={24} color="green" />right</div>}
          {order.up4 && <div><ArrowUp size={24} color="green" />right</div>}
          </div>
          <div className="flex gap-2">
            {order.down1 && <div><ArrowDown size={24} color="red" />left</div>}
            {order.down2 && <div><ArrowDown size={24} color="red" />left</div>}
            {order.down3 && <div><ArrowDown size={24} color="red" />right</div>}
            {order.down4 && <div><ArrowDown size={24} color="red" />right</div>}
          </div>
        </CardContent>
      </Card>

      {/* Garments Table with professional design */}
    <Card className="bg-white shadow-sm rounded-xl border border-gray-200">
  <CardHeader className="bg-gray-100 rounded-t-xl">
    <CardTitle className="text-gray-800 font-semibold">Garments & Measurements</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {order.garments.map((g) => (
      <div
        key={g.id}
        className="border-l-4 border-gray-300 bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col gap-3 hover:shadow-md transition"
      >
        {/* Garment Header */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{g.type}</h3>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
            Qty: {g.quantity}
          </span>
        </div>

        {/* Measurements */}
        {/* {g.measurement && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
            {Object.entries(g.measurement)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white p-2 rounded-md shadow-sm flex justify-between items-center hover:bg-gray-100 transition"
                >
                  <span className="font-medium capitalize">{key}</span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
          </div>
        )} */}



        {/* Measurements */}
{g.measurement && measurementFields[g.type] && (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
    {measurementFields[g.type].map((field) => {
      const value = g.measurement[field.id]

      if (!value) return null

      // Special handling for note
      if (field.id === "note") {
        return (
          <div
            key={field.id}
            className="col-span-full bg-yellow-50 p-3 rounded-md text-gray-800"
          >
            <span className="font-semibold">{field.labelHi}:</span>{" "}
            {value}
          </div>
        )
      }

      return (
        <div
          key={field.id}
          className="bg-white p-2 rounded-md shadow-sm flex justify-between items-center hover:bg-gray-100 transition"
        >
          <span className="font-medium">{field.labelHi}</span>
          <span className="text-gray-800">{value}</span>
        </div>
      )
    })}
  </div>
)}

        
      </div>
    ))}


    
  </CardContent>
</Card>



      {/* Add Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setShowPaymentPopup(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Payment</h2>
            <div className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Payment Method (Cash/Card/UPI)"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border p-2 rounded"
              />
              <Button onClick={handleAddPayment}>Submit</Button>
            </div>
          </div>
        </div>
      )}

      {/* Payment History Popup */}
      {showHistoryPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 relative max-h-[70vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3"
              onClick={() => setShowHistoryPopup(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Payment History</h2>
            {paymentHistory.length === 0 ? (
              <p>No payments made yet.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Amount</th>
                    <th className="border p-2">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((p) => (
                    <tr key={p.id}>
                      <td className="border p-2">{p.paymentDate}</td>
                      <td className="border p-2">₹{p.amount}</td>
                      <td className="border p-2">{p.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
