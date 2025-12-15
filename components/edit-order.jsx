"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MeasurementSection } from "@/components/measurement-section";
import { Save, User } from "lucide-react";
import { BASE_URL } from "@/app/config";

export function EditOrderForm({ orderId, onSave }) {
  const [token, setToken] = useState("");

  const garmentTypes = [
    { id: "coat", label: "Coat", labelHi: "कोट" },
    { id: "jodhpuri", label: "Jodhpuri", labelHi: "जोधपुरी" },
    { id: "pant", label: "Pant", labelHi: "पैंट" },
    { id: "shirt", label: "Shirt", labelHi: "शर्ट" },
    { id: "kurta", label: "Kurta", labelHi: "कुर्ता" },
    { id: "paijama", label: "Paijama", labelHi: "पैजामा" },
    { id: "waistcoat", label: "Waistcoat", labelHi: "वेस्टकोट" },
    { id: "modiJacket", label: "Modi Jacket", labelHi: "मोदी जैकेट" },
  ];

  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedGarments, setSelectedGarments] = useState([]);
  const [measurements, setMeasurements] = useState({});
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [upDown, setUpDown] = useState({});

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);

  /** FETCH ORDER BY ID */
  useEffect(() => {
    if (!token || !orderId) return;

    const loadOrder = async () => {
      const res = await fetch(`${BASE_URL}/Customer-orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setOrderNo(data.orderNo);
      setCustomerName(data.customerName);
      setMobile(data.mobile);
      setOrderDate(data.orderDate);
      setDeliveryDate(data.deliveryDate);
      setTotal(data.total);
      setAdvance(data.advance);

      setUpDown({
        up1: data.up1,
        up2: data.up2,
        up3: data.up3,
        up4: data.up4,
        down1: data.down1,
        down2: data.down2,
        down3: data.down3,
        down4: data.down4,
      });

      setSelectedGarments(data.garments.map((g) => g.type));
      setQuantities(
        Object.fromEntries(data.garments.map((g) => [g.type, g.quantity]))
      );
      setMeasurements(
        Object.fromEntries(
          data.garments.map((g) => [g.type, g.measurement])
        )
      );
    };

    loadOrder();
  }, [token, orderId]);

  const toggleGarment = (id) => {
    setSelectedGarments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const buildPayload = () => ({
    orderNo,
    customerName,
    mobile,
    orderDate,
    deliveryDate,
    total,
    advance,
    balance: total - advance,
    ...upDown,
    garments: selectedGarments.map((id) => ({
      id: 0,
      type: id,
      quantity: quantities[id] || 1,
      measurement: measurements[id] || {},
    })),
  });

  /** UPDATE API */
  const updateOrder = async () => {
    await fetch(`${BASE_URL}/Customer-orders/update/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(buildPayload()),
    });

    onSave?.();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">
            <User className="h-5 w-5" /> Edit Order
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Order No</Label>
            <Input value={orderNo} disabled />
          </div>
          <div>
            <Label>Name</Label>
            <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>
          <div>
            <Label>Mobile</Label>
            <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>
          <div>
            <Label>Order Date</Label>
            <Input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
          </div>
          <div>
            <Label>Delivery Date</Label>
            <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {selectedGarments.map((id) => {
        const g = garmentTypes.find((x) => x.id === id);
        return (
          <MeasurementSection
            key={id}
            garmentId={id}
            garmentLabel={g.label}
            garmentLabelHi={g.labelHi}
            measurements={measurements[id] || {}}
            onMeasurementChange={(f, v) =>
              setMeasurements((p) => ({
                ...p,
                [id]: { ...p[id], [f]: v },
              }))
            }
            quantity={quantities[id] || 1}
            onQuantityChange={(v) =>
              setQuantities((p) => ({ ...p, [id]: v }))
            }
          />
        );
      })}

      <Card>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Total</Label>
            <Input type="number" value={total} onChange={(e) => setTotal(+e.target.value)} />
          </div>
          <div>
            <Label>Advance</Label>
            <Input type="number" value={advance} onChange={(e) => setAdvance(+e.target.value)} />
          </div>
          <div>
            <Label>Balance</Label>
            <Input disabled value={total - advance} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={updateOrder}>
          <Save className="h-5 w-5 mr-2" />
          Update Order
        </Button>
      </div>
    </div>
  );
}
