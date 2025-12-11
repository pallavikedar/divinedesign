


"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MeasurementSection } from "@/components/measurement-section";
import { Save, User, Phone, Calendar, Hash } from "lucide-react";
import { BASE_URL } from "@/app/config";

export function OrderForm({ onSave, editingOrder, nextOrderNo }) {
   const [token, setToken] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);
  const garmentTypes = [
    { id: "coat", label: "Coat", labelHi: "कोट" },
    { id: "jodhpuri", label: "Jodhpuri", labelHi: "जोधपुरी" },
    { id: "pant", label: "Pant", labelHi: "पैंट" },
    { id: "shirt", label: "Shirt", labelHi: "शर्ट" },
    { id: "kurta", label: "Kurta", labelHi: "कुर्ता" },
    { id: "paijama", label: "Paijama", labelHi: "पैजामा" },
    { id: "waistcoat", label: "Waistcoat", labelHi: "वेस्टकोट" },
    { id: "modiJacket", label: "Modi Jacket", labelHi: "मोदी जैकेट" }
  ];

  const [customerName, setCustomerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedGarments, setSelectedGarments] = useState([]);
  const [measurements, setMeasurements] = useState({});
  const [quantities, setQuantities] = useState({});
  const [amounts, setAmounts] = useState({});
  const [total, setTotal] = useState(0);
  const [advance, setAdvance] = useState(0);
const [upDown, setUpDown] = useState({
  up1: false,
  up2: false,
  up3: false,
  up4: false,
  down1: false,
  down2: false,
  down3: false,
  down4: false,
});
  // Load editing order
  useEffect(() => {
    if (editingOrder) {
      setCustomerName(editingOrder.customerName);
      setMobileNo(editingOrder.mobile);
      setOrderDate(editingOrder.orderDate);
      setDeliveryDate(editingOrder.deliveryDate);
      setSelectedGarments(editingOrder.selectedGarments);
      setMeasurements(editingOrder.measurements);
      setQuantities(editingOrder.quantities);
      setAmounts(editingOrder.amounts);
      setTotal(editingOrder.total);
      setAdvance(editingOrder.advance);
    }
  }, [editingOrder]);

  const toggleGarment = (id) => {
    setSelectedGarments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
const toggleUpDown = (key) => {
  setUpDown((prev) => ({ ...prev, [key]: !prev[key] }));
};
  // Build API payload
  const buildApiPayload = () => {
    const garmentsPayload = selectedGarments.map((garmentId) => ({
      id: 0,
      type: garmentId,
      quantity: quantities[garmentId] || 1,
      measurement: {
        id: 0,
        ...(measurements[garmentId] || {})
      }
    }));

    return {
      orderNo: editingOrder?.orderNo || nextOrderNo,
      customerName,
      mobile: mobileNo,
      orderDate,
      deliveryDate,
      total,
      advance,
      balance: total - advance,
       ...upDown,
      garments: garmentsPayload
    };
  };

  // POST Order
  const submitOrder = async () => {
    const payload = buildApiPayload();

    const res = await fetch(`${BASE_URL}/Customer-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    onSave(data);
  };

  return (
    <div className="space-y-6">

      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Customer Details / ग्राहक विवरण
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Order No</Label>
              <Input value={editingOrder?.orderNo || nextOrderNo} disabled />
            </div>

            <div>
              <Label>Name</Label>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>

            <div>
              <Label>Mobile</Label>
              <Input value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
            </div>

            <div>
              <Label>Order Date</Label>
              <Input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
            </div>

            <div>
              <Label>Delivery Date</Label>
              <Input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>

          </div>
        </CardContent>
      </Card>
      <Card>
  <CardHeader>
    <CardTitle>Shoulder Selection (↑ / ↓)</CardTitle>
  </CardHeader>

  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">

    {["up1", "up2", "up3", "up4"].map((item) => (
      <Button
        key={item}
        variant={upDown[item] ? "default" : "outline"}
        className="flex items-center gap-2"
        onClick={() => toggleUpDown(item)}
      >
        ↑ 
      </Button>
    ))}

    {["down1", "down2", "down3", "down4"].map((item) => (
      <Button
        key={item}
        variant={upDown[item] ? "default" : "outline"}
        className="flex items-center gap-2"
        onClick={() => toggleUpDown(item)}
      >
        ↓ 
      </Button>
    ))}

  </CardContent>
</Card>


      {/* Garment Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Garments / कपड़े चुनें</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {garmentTypes.map((g) => (
            <div
              key={g.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                selectedGarments.includes(g.id)
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:bg-muted"
              }`}
              onClick={() => toggleGarment(g.id)}
            >
              <Checkbox checked={selectedGarments.includes(g.id)} />
              <div>
                <div>{g.label}</div>
                <div className="text-sm text-muted-foreground">{g.labelHi}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Measurement Sections */}
      {selectedGarments.map((id) => {
        const garment = garmentTypes.find((g) => g.id === id);
        return (
          <MeasurementSection
            key={id}
            garmentId={id}
            garmentLabel={garment.label}
            garmentLabelHi={garment.labelHi}
            measurements={measurements[id] || {}}
            onMeasurementChange={(field, value) =>
              setMeasurements((prev) => ({
                ...prev,
                [id]: { ...prev[id], [field]: value }
              }))
            }
            quantity={quantities[id] || 1}
            onQuantityChange={(value) =>
              setQuantities((prev) => ({ ...prev, [id]: value }))
            }
            amount={amounts[id] || 0}
            onAmountChange={(value) =>
              setAmounts((prev) => ({ ...prev, [id]: value }))
            }
          />
        );
      })}

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Billing / बिलिंग</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Total</Label>
              <Input
                type="number"
                value={total}
                onChange={(e) => setTotal(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Advance</Label>
              <Input
                type="number"
                value={advance}
                onChange={(e) => setAdvance(Number(e.target.value))}
              />
            </div>

            <div>
              <Label>Balance</Label>
              <Input disabled value={total - advance} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button size="lg" onClick={submitOrder}>
          <Save className="h-5 w-5 mr-2" />
          Save Order
        </Button>
      </div>
    </div>
  );
}
