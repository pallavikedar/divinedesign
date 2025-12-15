


// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { MeasurementSection } from "@/components/measurement-section";
// import { Save, User, Phone, Calendar, Hash } from "lucide-react";
// import { BASE_URL } from "@/app/config";

// export function OrderForm({ onSave, editingOrder }) {
//    const [token, setToken] = useState("");

//   useEffect(() => {
//     const t = localStorage.getItem("token");
//     setToken(t);
//   }, []);
//   const garmentTypes = [
//     { id: "coat", label: "Coat", labelHi: "कोट" },
//     { id: "jodhpuri", label: "Jodhpuri", labelHi: "जोधपुरी" },
//     { id: "pant", label: "Pant", labelHi: "पैंट" },
//     { id: "shirt", label: "Shirt", labelHi: "शर्ट" },
//     { id: "kurta", label: "Kurta", labelHi: "कुर्ता" },
//     { id: "paijama", label: "Paijama", labelHi: "पैजामा" },
//     { id: "waistcoat", label: "Waistcoat", labelHi: "वेस्टकोट" },
//     { id: "modiJacket", label: "Modi Jacket", labelHi: "मोदी जैकेट" }
//   ];

//   const [customerName, setCustomerName] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [selectedGarments, setSelectedGarments] = useState([]);
//   const [measurements, setMeasurements] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const [amounts, setAmounts] = useState({});
//   const [total, setTotal] = useState(0);
//   const [advance, setAdvance] = useState(0);
//   const [orderNo, setOrderNo] = useState("");
//  useEffect(() => {
//   if (editingOrder) {
//     setOrderNo(editingOrder.orderNo);
//   } else {
//     const lastOrderId = Number(localStorage.getItem("lastOrderId") || 0);
//     setOrderNo(lastOrderId + 1);
//   }
// }, [editingOrder]); 
// // useEffect(() => {
// //   if (editingOrder) {
// //     setOrderNo(editingOrder.orderNo);
// //   }
// // }, [editingOrder]);
// const [upDown, setUpDown] = useState({
//   up1: false,
//   up2: false,
//   up3: false,
//   up4: false,
//   down1: false,
//   down2: false,
//   down3: false,
//   down4: false,
// });
//   // Load editing order
//   useEffect(() => {
//     if (editingOrder) {
//       setOrderNo(editingOrder.orderNo);
//       setCustomerName(editingOrder.customerName);
//       setMobileNo(editingOrder.mobile);
//       setOrderDate(editingOrder.orderDate);
//       setDeliveryDate(editingOrder.deliveryDate);
//       setSelectedGarments(editingOrder.selectedGarments);
//       setMeasurements(editingOrder.measurements);
//       setQuantities(editingOrder.quantities);
//       setAmounts(editingOrder.amounts);
//       setTotal(editingOrder.total);
//       setAdvance(editingOrder.advance);
//     }
//   }, [editingOrder]);

//   const toggleGarment = (id) => {
//     setSelectedGarments((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) :  [...prev, id]
//     );
//   };
// const toggleUpDown = (key) => {
//   setUpDown((prev) => ({ ...prev, [key]: !prev[key] }));
// };
//   // Build API payload
//   const buildApiPayload = () => {
//     const garmentsPayload = selectedGarments.map((garmentId) => ({
//       id: 0,
//       type: garmentId,
//       quantity: quantities[garmentId] || 1,
//       measurement: {
//         id: 0,
//         ...(measurements[garmentId] || {})
//       }
//     }));

//     return {
//       orderNo ,
//       customerName,
//       mobile: mobileNo,
//       orderDate,
//       deliveryDate,
//       total,
//       advance,
//       balance: total - advance,
//        ...upDown,
//       garments: garmentsPayload
//     };
//   };

//   // POST Order
//   const submitOrder = async () => {
//     // const payload = buildApiPayload();
//  const url = editingOrder
//       ? `${BASE_URL}/Customer-orders/update/${editingOrder.id}`
//       : `${BASE_URL}/Customer-orders`;
//    const method = editingOrder ? "PUT" : "POST";
//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify(payload)
//     });

//     const data = await res.json();

//     localStorage.setItem("lastOrderId", orderNo);
  
//     onSave(data);
//   };

//   return (
//     <div className="space-y-6">

//       {/* Customer Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <User className="h-5 w-5" /> Customer Details / ग्राहक विवरण
//           </CardTitle>
//         </CardHeader>
//         <CardContent>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <Label>Order No</Label>
//              <Input
//   value={orderNo}
//  onChange={(e) => {
//   const value = Number(e.target.value);
//   if (value >= Number(localStorage.getItem("lastOrderId") || 0)) {
//     setOrderNo(value);
//   }
// }}
// />
//             </div>

//             <div>
//               <Label>Name</Label>
//               <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//             </div>

//             <div>
//               <Label>Mobile</Label>
//               <Input value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
//             </div>

//             <div>
//               <Label>Order Date</Label>
//               <Input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
//             </div>

//             <div>
//               <Label>Delivery Date</Label>
//               <Input
//                 type="date"
//                 value={deliveryDate}
//                 onChange={(e) => setDeliveryDate(e.target.value)}
//               />
//             </div>

//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//   <CardHeader>
//     <CardTitle>Shoulder Selection (↑ / ↓)</CardTitle>
//   </CardHeader>

//   <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">

//     {["up1", "up2", "up3", "up4"].map((item) => (
//       <Button
//         key={item}
//         variant={upDown[item] ? "default" : "outline"}
//         className="flex items-center gap-2"
//         onClick={() => toggleUpDown(item)}
//       >
//         ↑ 
//       </Button>
//     ))}

//     {["down1", "down2", "down3", "down4"].map((item) => (
//       <Button
//         key={item}
//         variant={upDown[item] ? "default" : "outline"}
//         className="flex items-center gap-2"
//         onClick={() => toggleUpDown(item)}
//       >
//         ↓ 
//       </Button>
//     ))}

//   </CardContent>
// </Card>


//       {/* Garment Selection */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Select Garments / कपड़े चुनें</CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {garmentTypes.map((g) => (
//             <div
//               key={g.id}
//               className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
//                 selectedGarments.includes(g.id)
//                   ? "border-primary bg-primary/10"
//                   : "border-muted hover:bg-muted"
//               }`}
//               onClick={() => toggleGarment(g.id)}
//             >
//               <Checkbox checked={selectedGarments.includes(g.id)} />
//               <div>
//                 <div>{g.label}</div>
//                 <div className="text-sm text-muted-foreground">{g.labelHi}</div>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Measurement Sections */}
//       {selectedGarments.map((id) => {
//         const garment = garmentTypes.find((g) => g.id === id);
//         return (
//           <MeasurementSection
//             key={id}
//             garmentId={id}
//             garmentLabel={garment.label}
//             garmentLabelHi={garment.labelHi}
//             measurements={measurements[id] || {}}
//             onMeasurementChange={(field, value) =>
//               setMeasurements((prev) => ({
//                 ...prev,
//                 [id]: { ...prev[id], [field]: value }
//               }))
//             }
//             quantity={quantities[id] || 1}
//             onQuantityChange={(value) =>
//               setQuantities((prev) => ({ ...prev, [id]: value }))
//             }
//             amount={amounts[id] || 0}
//             onAmountChange={(value) =>
//               setAmounts((prev) => ({ ...prev, [id]: value }))
//             }
//           />
//         );
//       })}

//       {/* Billing */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Billing / बिलिंग</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <Label>Total</Label>
//               <Input
//                 type="number"
//                 value={total}
//                 onChange={(e) => setTotal(Number(e.target.value))}
//               />
//             </div>

//             <div>
//               <Label>Advance</Label>
//               <Input
//                 type="number"
//                 value={advance}
//                 onChange={(e) => setAdvance(Number(e.target.value))}
//               />
//             </div>

//             <div>
//               <Label>Balance</Label>
//               <Input disabled value={total - advance} />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Submit */}
//       <div className="flex justify-end">
//         <Button size="lg" onClick={submitOrder}>
//           <Save className="h-5 w-5 mr-2" />
//            {editingOrder ? "Update Order" : "Save Order"}
//         </Button>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { MeasurementSection } from "@/components/measurement-section";
// import { Save, User } from "lucide-react";
// import { BASE_URL } from "@/app/config";
// import { Checkbox } from "@/components/ui/checkbox";

// export function OrderForm({ orderId, onSave }) {
//   const [token, setToken] = useState("");

//   const garmentTypes = [
//     { id: "coat", label: "Coat", labelHi: "कोट" },
//     { id: "jodhpuri", label: "Jodhpuri", labelHi: "जोधपुरी" },
//     { id: "pant", label: "Pant", labelHi: "पैंट" },
//     { id: "shirt", label: "Shirt", labelHi: "शर्ट" },
//     { id: "kurta", label: "Kurta", labelHi: "कुर्ता" },
//     { id: "paijama", label: "Paijama", labelHi: "पैजामा" },
//     { id: "waistcoat", label: "Waistcoat", labelHi: "वेस्टकोट" },
//     { id: "modiJacket", label: "Modi Jacket", labelHi: "मोदी जैकेट" },
//   ];

//   const [customerName, setCustomerName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [orderNo, setOrderNo] = useState("");
//   const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [selectedGarments, setSelectedGarments] = useState([]);
//   const [measurements, setMeasurements] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const [total, setTotal] = useState(0);
//   const [advance, setAdvance] = useState(0);
//   const [amounts, setAmounts] = useState({});
//   const [upDown, setUpDown] = useState({
//   up1: false,
//   up2: false,
//   up3: false,
//   up4: false,
//   down1: false,
//   down2: false,
//   down3: false,
//   down4: false,
// });

//   /* ================= TOKEN ================= */
//   useEffect(() => {
//     setToken(localStorage.getItem("token") || "");
//   }, []);
//  useEffect(() => {
//      const lastOrderId = Number(localStorage.getItem("lastOrderId") || 0);
//     setOrderNo(lastOrderId + 1);
//   }, []);
//   /* ================= LOAD ORDER FOR EDIT ================= */
//   useEffect(() => {
//     if (!orderId || !token) return;

//     const loadOrder = async () => {
//       const res = await fetch(`${BASE_URL}/Customer-orders/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       setOrderNo(data.orderNo);
//       setCustomerName(data.customerName);
//       setMobile(data.mobile);
//       setOrderDate(data.orderDate);
//       setDeliveryDate(data.deliveryDate);
//       setTotal(data.total);
//       setAdvance(data.advance);

//       setSelectedGarments(data.garments.map((g) => g.type));
//       setQuantities(
//         Object.fromEntries(data.garments.map((g) => [g.type, g.quantity]))
//       );
//       setMeasurements(
//         Object.fromEntries(
//           data.garments.map((g) => [g.type, g.measurement])
//         )
//       );
//     };

//     loadOrder();
//   }, [orderId, token]);
//   const toggleGarment = (id) => {
//     setSelectedGarments((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) :  [...prev, id]
//     );
//   };
//   const toggleUpDown = (key) => {
//   setUpDown((prev) => ({ ...prev, [key]: !prev[key] }));
// };
//   /* ================= PAYLOAD ================= */
//   const buildPayload = () => ({
//     orderNo,
//     customerName,
//     mobile,
//     orderDate,
//     deliveryDate,
//     total,
//     advance,
//     balance: total - advance,
//      ...upDown,
//     garments: selectedGarments.map((id) => ({
//       id: 0,
//       type: id,
//       quantity: quantities[id] || 1,
//       measurement: measurements[id] || {},
//     })),
//   });

//   /* ================= SUBMIT ================= */
//   const submitOrder = async () => {
//    const isEdit = Boolean(orderId);

//     const url = isEdit
//       ? `${BASE_URL}/Customer-orders/update/${orderId}`
//       : `${BASE_URL}/Customer-orders`;

//     const method = isEdit ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(buildPayload()),
//     });

//    localStorage.setItem("lastOrderId", orderNo);
//     onSave?.();
//   };

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex gap-2">
//             <User className="h-5 w-5" />
//             {orderId ? "Edit Order" : "Create Order"}
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="grid md:grid-cols-4 gap-4">
//           <div>
//             <Label>Order No</Label>
//            <Input
//   value={orderNo}
//  onChange={(e) => {
//   const value = Number(e.target.value);
//   if (value >= Number(localStorage.getItem("lastOrderId") || 0)) {
//     setOrderNo(value);
//   }
// }}
// />
//           </div>
//           <div>
//             <Label>Name</Label>
//             <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//           </div>
//           <div>
//             <Label>Mobile</Label>
//             <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
//           </div>
//           <div>
//             <Label>Order Date</Label>
//             <Input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
//           </div>
//           <div>
//             <Label>Delivery Date</Label>
//             <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
//           </div>
//         </CardContent>
//       </Card>
//  <Card>
//    <CardHeader>
//      <CardTitle>Shoulder Selection (↑ / ↓)</CardTitle>
//    </CardHeader>

//    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">

//      {["up1", "up2", "up3", "up4"].map((item) => (
//       <Button
//         key={item}
//         variant={upDown[item] ? "default" : "outline"}
//         className="flex items-center gap-2"
//         onClick={() => toggleUpDown(item)}
//       >
//         ↑ 
//       </Button>
//     ))}

//     {["down1", "down2", "down3", "down4"].map((item) => (
//       <Button
//         key={item}
//         variant={upDown[item] ? "default" : "outline"}
//         className="flex items-center gap-2"
//         onClick={() => toggleUpDown(item)}
//       >
//         ↓ 
//       </Button>
//     ))}

//   </CardContent>
// </Card>

//       {/* Garment Selection */}
//        <Card>
//          <CardHeader>
//            <CardTitle>Select Garments / कपड़े चुनें</CardTitle>
//          </CardHeader>
//          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
//            {garmentTypes.map((g) => (
//             <div
//               key={g.id}
//               className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
//                 selectedGarments.includes(g.id)
//                   ? "border-primary bg-primary/10"
//                   : "border-muted hover:bg-muted"
//               }`}
//               onClick={() => toggleGarment(g.id)}
//             >
//               <Checkbox checked={selectedGarments.includes(g.id)} />
//               <div>
//                 <div>{g.label}</div>
//                 <div className="text-sm text-muted-foreground">{g.labelHi}</div>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Measurement Sections */}
//       {selectedGarments.map((id) => {
//         const garment = garmentTypes.find((g) => g.id === id);
//         return (
//           <MeasurementSection
//             key={id}
//             garmentId={id}
//             garmentLabel={garment.label}
//             garmentLabelHi={garment.labelHi}
//             measurements={measurements[id] || {}}
//             onMeasurementChange={(field, value) =>
//               setMeasurements((prev) => ({
//                 ...prev,
//                 [id]: { ...prev[id], [field]: value }
//               }))
//             }
//             quantity={quantities[id] || 1}
//             onQuantityChange={(value) =>
//               setQuantities((prev) => ({ ...prev, [id]: value }))
//             }
//             amount={amounts[id] || 0}
//             onAmountChange={(value) =>
//               setAmounts((prev) => ({ ...prev, [id]: value }))
//             }
//           />
//         );
//       })}
//       <Card>
//         <CardContent className="grid md:grid-cols-3 gap-4">
//           <div>
//             <Label>Total</Label>
//             <Input type="number" value={total} onChange={(e) => setTotal(+e.target.value)} />
//           </div>
//           <div>
//             <Label>Advance</Label>
//             <Input type="number" value={advance} onChange={(e) => setAdvance(+e.target.value)} />
//           </div>
//           <div>
//             <Label>Balance</Label>
//             <Input disabled value={total - advance} />
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-end">
//         <Button size="lg" onClick={submitOrder}>
//           <Save className="h-5 w-5 mr-2" />
//           {orderId ? "Update Order" : "Save Order"}
//         </Button>
//       </div>
//     </div>
//   );
// }





















"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MeasurementSection } from "@/components/measurement-section";
import { Save, User } from "lucide-react";
import { BASE_URL } from "@/app/config";
import { Checkbox } from "@/components/ui/checkbox";

export function OrderForm({ orderId, onSave }) {
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
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedGarments, setSelectedGarments] = useState([]);
  const [measurements, setMeasurements] = useState({});
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [amounts, setAmounts] = useState({});
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

  /* ================= TOKEN ================= */
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, []);
 useEffect(() => {
     const lastOrderId = Number(localStorage.getItem("lastOrderId") || 0);
    setOrderNo(lastOrderId + 1);
  }, []);
  /* ================= LOAD ORDER FOR EDIT ================= */
  useEffect(() => {
    if (!orderId || !token) return;

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

      // Load upDown fields
      setUpDown({
        up1: data.up1 || false,
        up2: data.up2 || false,
        up3: data.up3 || false,
        up4: data.up4 || false,
        down1: data.down1 || false,
        down2: data.down2 || false,
        down3: data.down3 || false,
        down4: data.down4 || false,
      });

      // Handle garments: merge multiples of same type (sum quantities, take first measurement assuming they are identical)
      const typeToQty = {};
      const typeToMeas = {};
      data.garments.forEach((g) => {
        typeToQty[g.type] = (typeToQty[g.type] || 0) + g.quantity;
        if (!typeToMeas[g.type]) {
          typeToMeas[g.type] = g.measurement;
        }
      });

      setSelectedGarments(Object.keys(typeToQty));
      setQuantities(typeToQty);
      setMeasurements(typeToMeas);
    };

    loadOrder();
  }, [orderId, token]);
  const toggleGarment = (id) => {
    setSelectedGarments((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) :  [...prev, id]
    );
  };
  const toggleUpDown = (key) => {
  setUpDown((prev) => ({ ...prev, [key]: !prev[key] }));
};
  /* ================= PAYLOAD ================= */
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

  /* ================= SUBMIT ================= */
  const submitOrder = async () => {
   const isEdit = Boolean(orderId);

    const url = isEdit
      ? `${BASE_URL}/Customer-orders/update/${orderId}`
      : `${BASE_URL}/Customer-orders`;

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(buildPayload()),
    });

    if (!isEdit) {
      localStorage.setItem("lastOrderId", orderNo);
    }
    onSave?.();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">
            <User className="h-5 w-5" />
            {orderId ? "Edit Order" : "Create Order"}
          </CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-4 gap-4">
          <div>
            <Label>Order No</Label>
           <Input
  value={orderNo}
 onChange={(e) => {
  const value = Number(e.target.value);
  if (value >= Number(localStorage.getItem("lastOrderId") || 0)) {
    setOrderNo(value);
  }
}}
/>
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
        <Button size="lg" onClick={submitOrder}>
          <Save className="h-5 w-5 mr-2" />
          {orderId ? "Update Order" : "Save Order"}
        </Button>
      </div>
    </div>
  );
}