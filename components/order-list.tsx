

// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Phone,
//   Calendar,
//   IndianRupee,
//   User
// } from "lucide-react";
// import { BASE_URL } from "@/app/config";
// import { useRouter } from "next/navigation";

// export function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     setToken(localStorage.getItem("token") || "");
//   }, []);

//   const fetchOrders = async () => {
//     if (!token) return;
//     try {
//       const response = await fetch(`${BASE_URL}/Customer-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) return console.log("API Error");
//       const data = await response.json();
//       setOrders(data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (token) fetchOrders();
//   }, [token]);

//   if (loading)
//     return (
//       <p className="text-center py-20 text-lg text-gray-600">
//         Loading orders...
//       </p>
//     );

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold tracking-tight mb-6">
//         Customer Orders
//       </h1>

//       {orders.length === 0 ? (
//         <Card className="p-10 text-center border-dashed border-gray-300">
//           <p className="text-lg text-gray-600">No orders found.</p>
//         </Card>
//       ) : (
//         <div className="overflow-x-auto rounded-lg border shadow-sm">
//           <table className="w-full text-sm border-collapse">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="p-3 border">Order No</th>
//                 <th className="p-3 border">Customer</th>
//                 <th className="p-3 border">Mobile</th>
//                 <th className="p-3 border">Delivery Date</th>
//                 <th className="p-3 border">Garments</th>
//                 <th className="p-3 border">Amount</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="hover:bg-gray-50 transition-all border-b"
//                 >
//                   <td className="p-3 border text-center font-semibold">
//                     #{order.orderNo}
//                   </td>

//                   <td className="p-3 border">
//                     <div className="flex items-center gap-2">
//                       <User className="w-4 h-4 text-gray-500" />
//                       {order.customerName}
//                     </div>
//                   </td>

//                   <td className="p-3 border text-center">
//                     <div className="flex items-center gap-1 justify-center">
//                       <Phone className="w-4 h-4" /> {order.mobile}
//                     </div>
//                   </td>

//                   <td className="p-3 border text-center">
//                     <div className="flex items-center gap-1 justify-center">
//                       <Calendar className="w-4 h-4" /> {order.deliveryDate}
//                     </div>
//                   </td>

//                   <td className="p-3 border">
//                     <div className="flex flex-wrap gap-2 justify-center">
//                       {order.garments?.map((g) => (
//                         <Badge
//                           key={g.id}
//                           variant="secondary"
//                           className="capitalize bg-gray-100"
//                         >
//                           {g.type} × {g.quantity}
//                         </Badge>
//                       ))}
//                     </div>
//                   </td>

//                   <td className="p-3 border text-center">
//                     <div className="flex flex-col items-center gap-1">
//                       <span className="flex items-center gap-1 font-semibold">
//                         <IndianRupee className="w-4 h-4 text-gray-500" />
//                         {order.total}
//                       </span>
//                       <span className="text-green-600 text-xs">
//                         Advance: ₹{order.advance}
//                       </span>
//                       <span
//                         className={`text-xs font-semibold ${
//                           order.balance > 0
//                             ? "text-orange-600"
//                             : "text-green-700"
//                         }`}
//                       >
//                         Bal: ₹{order.balance}
//                       </span>
//                     </div>
//                   </td>

//                   <td className="p-3 border text-center">
//                     <div className="flex justify-center gap-2">
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         onClick={() => router.push(`/orders/${order.id}`)}
//                       >
//                         <Eye className="h-4 w-4 mr-1" /> View
//                       </Button>

//                       <Button size="sm" variant="outline">
//                         <Edit className="h-4 w-4" />
//                       </Button>

//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="text-red-600 hover:bg-red-600 hover:text-white"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


















// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Phone,
//   Calendar,
//   IndianRupee,
//   User,
// } from "lucide-react";
// import { BASE_URL } from "@/app/config";
// import { useRouter } from "next/navigation";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {EditOrderForm} from "./edit-order"
// import { OrderForm } from "./order-form";

// export function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState("");

//   const [search, setSearch] = useState("");
//   const [openEdit, setOpenEdit] = useState(false);
//   const [editOrderId, setEditOrderId] = useState(null);

//   const router = useRouter();

//   /* ================= TOKEN ================= */
//   useEffect(() => {
//     const t = localStorage.getItem("token");
//     if (t) setToken(t);
//   }, []);

//   /* ================= FETCH ORDERS ================= */
//   const fetchOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${BASE_URL}/Customer-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (e) {
//       console.error("Fetch orders error", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchOrders();
//   }, [token]);

//   /* ================= SEARCH ================= */
//   const filteredOrders = orders.filter((o) =>
//     `${o.orderNo} ${o.customerName} ${o.mobile}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this order?")) return;

//     try {
//       await fetch(`${BASE_URL}/Customer-orders/delete/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setOrders((prev) => prev.filter((o) => o.id !== id));
//     } catch (e) {
//       console.error("Delete error", e);
//     }
//   };

//   if (loading) {
//     return (
//       <p className="text-center py-20 text-lg text-gray-600">
//         Loading orders...
//       </p>
//     );
//   }

//   return (
//     <div className="p-8">
//       {/* ================= HEADER ================= */}
//       <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
//         <h1 className="text-2xl font-semibold">Customer Orders</h1>

//         <Input
//           className="max-w-sm"
//           placeholder="Search Order No / Name / Mobile"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* ================= TABLE ================= */}
//       {filteredOrders.length === 0 ? (
//         <Card className="p-10 text-center border-dashed">
//           No orders found
//         </Card>
//       ) : (
//         <div className="overflow-x-auto border rounded-lg shadow-sm">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="p-3 border">Order No</th>
//                 <th className="p-3 border">Customer</th>
//                 <th className="p-3 border">Mobile</th>
//                 <th className="p-3 border">Delivery Date</th>
//                 <th className="p-3 border">Garments</th>
//                 <th className="p-3 border">Amount</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="hover:bg-gray-50 transition"
//                 >
//                   <td className="p-3 border text-center font-semibold">
//                     #{order.orderNo}
//                   </td>

//                   <td className="p-3 border">
//                     <div className="flex items-center gap-2">
//                       <User className="w-4 h-4 text-gray-500" />
//                       {order.customerName}
//                     </div>
//                   </td>

//                   <td className="p-3 border text-center">
//                     <Phone className="inline w-4 h-4 mr-1" />
//                     {order.mobile}
//                   </td>

//                   <td className="p-3 border text-center">
//                     <Calendar className="inline w-4 h-4 mr-1" />
//                     {order.deliveryDate}
//                   </td>

//                   <td className="p-3 border">
//                     <div className="flex flex-wrap gap-1 justify-center">
//                       {order.garments?.map((g) => (
//                         <Badge key={g.id} variant="secondary">
//                           {g.type} × {g.quantity}
//                         </Badge>
//                       ))}
//                     </div>
//                   </td>

//                   <td className="p-3 border text-center">
//                     <div className="font-semibold flex items-center justify-center gap-1">
//                       <IndianRupee className="w-4 h-4" />
//                       {order.total}
//                     </div>
//                     <div className="text-xs text-green-600">
//                       Advance ₹{order.advance}
//                     </div>
//                     <div className="text-xs text-orange-600">
//                       Balance ₹{order.balance}
//                     </div>
//                   </td>

//                   <td className="p-3 border text-center">
//                     <div className="flex justify-center gap-2">
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         onClick={() =>
//                           router.push(`/orders/${order.id}`)
//                         }
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>

//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => {
//                           setEditOrderId(order.id);
//                           setOpenEdit(true);
//                         }}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>

//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="text-red-600 hover:bg-red-600 hover:text-white"
//                         onClick={() => handleDelete(order.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ================= EDIT POPUP ================= */}
//       <Dialog open={openEdit} onOpenChange={setOpenEdit}>
//         <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Edit Order</DialogTitle>
//           </DialogHeader>

//          <OrderForm
//             orderId={editOrderId}
//             onSave={() => {
//               setOpenEdit(false);
//               setEditOrderId(null);
//               fetchOrders();
//             }}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

































































"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Trash2,
  Eye,
  Phone,
  Calendar,
  IndianRupee,
  User,
} from "lucide-react";
import { BASE_URL } from "@/app/config";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderForm } from "./order-form";

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);

  const router = useRouter();

  /* ================= TOKEN ================= */
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
  }, []);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/Customer-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Fetch orders error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  /* ================= SEARCH ================= */
  const filteredOrders = orders.filter((o) =>
    `${o.orderNo} ${o.customerName} ${o.mobile} ${o.orderDate}` 
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      await fetch(`${BASE_URL}/Customer-orders/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (e) {
      console.error("Delete error", e);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-20 text-lg text-gray-600">
        Loading orders...
      </p>
    );
  }

  return (
    <div className="p-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Customer Orders</h1>

        <Input
          className="max-w-sm"
          placeholder="Search Order No / Name / Mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= TABLE ================= */}
      {filteredOrders.length === 0 ? (
        <Card className="p-10 text-center border-dashed">
          No orders found
        </Card>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Order No</th>
                <th className="p-3 border">Order Date</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Mobile</th>
                <th className="p-3 border">Delivery Date</th>
                <th className="p-3 border">Garments</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 border text-center font-semibold">
                    #{order.orderNo}
                  </td>
                   <td className="p-3 border text-center">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    {order.orderDate}
                  </td>

                  <td className="p-3 border">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {order.customerName}
                    </div>
                  </td>

                  <td className="p-3 border text-center">
                    <Phone className="inline w-4 h-4 mr-1" />
                    {order.mobile}
                  </td>

                  <td className="p-3 border text-center">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    {order.deliveryDate}
                  </td>

                  <td className="p-3 border">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {order.garments?.map((g) => (
                        <Badge key={g.id} variant="secondary">
                          {g.type} × {g.quantity}
                        </Badge>
                      ))}
                    </div>
                  </td>

                  <td className="p-3 border text-center">
                    <div className="font-semibold flex items-center justify-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {order.total}
                    </div>
                    <div className="text-xs text-green-600">
                      Advance ₹{order.advance}
                    </div>
                    <div className="text-xs text-orange-600">
                      Balance ₹{order.balance}
                    </div>
                  </td>

                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          router.push(`/orders/${order.id}`)
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditOrderId(order.id);
                          setOpenEdit(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-600 hover:text-white"
                        onClick={() => handleDelete(order.id)}
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

      {/* ================= EDIT POPUP ================= */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
          </DialogHeader>

         <OrderForm
            orderId={editOrderId}
            onSave={() => {
              setOpenEdit(false);
              setEditOrderId(null);
              fetchOrders();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}









































// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Phone,
//   Calendar,
//   IndianRupee,
//   User,
// } from "lucide-react";
// import { BASE_URL } from "@/app/config";
// import { useRouter } from "next/navigation";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { OrderForm } from "./order-form";

// export function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState("");

//   const [search, setSearch] = useState("");
//   const [openEdit, setOpenEdit] = useState(false);
//   const [editOrderId, setEditOrderId] = useState(null);

//   const router = useRouter();

//   /* ================= TOKEN ================= */
//   useEffect(() => {
//     setToken(localStorage.getItem("token") || "");
//   }, []);

//   /* ================= FETCH ORDERS ================= */
//   const fetchOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${BASE_URL}/Customer-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchOrders();
//   }, [token]);

//   /* ================= SEARCH ================= */
//   const filteredOrders = orders.filter((o) =>
//     `${o.orderNo} ${o.customerName} ${o.mobile}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this order?")) return;

//     await fetch(`${BASE_URL}/Customer-orders/delete/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setOrders((prev) => prev.filter((o) => o.id !== id));
//   };

//   if (loading) {
//     return <p className="text-center py-20">Loading orders...</p>;
//   }

//   return (
//     <div className="p-8">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Customer Orders</h1>
//         <Input
//           className="max-w-sm"
//           placeholder="Search Order / Name / Mobile"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {filteredOrders.length === 0 ? (
//         <Card className="p-10 text-center">No orders found</Card>
//       ) : (
//         <div className="border rounded-lg overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 border">Order</th>
//                 <th className="p-3 border">Customer</th>
//                 <th className="p-3 border">Mobile</th>
//                 <th className="p-3 border">Delivery</th>
//                 <th className="p-3 border">Garments</th>
//                 <th className="p-3 border">Amount</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50">
//                   <td className="p-3 border text-center">
//                     #{order.orderNo}
//                   </td>

//                   <td className="p-3 border">
//                     <User className="inline w-4 h-4 mr-1" />
//                     {order.customerName}
//                   </td>

//                   <td className="p-3 border text-center">
//                     <Phone className="inline w-4 h-4 mr-1" />
//                     {order.mobile}
//                   </td>

//                   <td className="p-3 border text-center">
//                     <Calendar className="inline w-4 h-4 mr-1" />
//                     {order.deliveryDate}
//                   </td>

//                   <td className="p-3 border">
//                     <div className="flex flex-wrap gap-1 justify-center">
//                       {order.garments?.map((g) => (
//                         <Badge key={g.id}>{g.type} × {g.quantity}</Badge>
//                       ))}
//                     </div>
//                   </td>

//                   <td className="p-3 border text-center">
//                     <IndianRupee className="inline w-4 h-4" />
//                     {order.total}
//                   </td>

//                   <td className="p-3 border text-center">
//                     <div className="flex justify-center gap-2">
//                       <Button
//                         size="sm"
//                         onClick={() => router.push(`/orders/${order.id}`)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>

//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => {
//                           setEditOrderId(order.id);
//                           setOpenEdit(true);
//                         }}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>

//                       <Button
//                         size="sm"
//                         variant="outline"
//                         className="text-red-600"
//                         onClick={() => handleDelete(order.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ===== EDIT POPUP ===== */}
//       <Dialog open={openEdit} onOpenChange={setOpenEdit}>
//         <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Edit Order</DialogTitle>
//           </DialogHeader>

//           {editOrderId && (
//             <OrderForm
//               key={editOrderId}   // 🔥 IMPORTANT
//               orderId={editOrderId}
//               onSave={() => {
//                 setOpenEdit(false);
//                 setEditOrderId(null);
//                 fetchOrders();
//               }}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
