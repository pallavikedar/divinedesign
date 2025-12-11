// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { X, Plus, Minus, Package } from "lucide-react"
// import type { Kapda, StockEntry } from "@/lib/types"
// import { BarcodeDisplay } from "./barcode-display"

// interface StockModalProps {
//   kapda: Kapda
//   onClose: () => void
//   onStockUpdate: (kapda: Kapda) => void
// }

// export function StockModal({ kapda, onClose, onStockUpdate }: StockModalProps) {
//   const [stockType, setStockType] = useState<"in" | "out">("in")
//   const [quantity, setQuantity] = useState<number>(0)
//   const [note, setNote] = useState("")

//   const handleStockUpdate = () => {
//     if (quantity <= 0) return

//     if (stockType === "out" && quantity > kapda.quantity) {
//       alert("Cannot remove more than available stock!")
//       return
//     }

//     const newEntry: StockEntry = {
//       id: Date.now(),
//       type: stockType,
//       quantity,
//       date: new Date().toISOString(),
//       note,
//     }

//     const updatedKapda: Kapda = {
//       ...kapda,
//       quantity: stockType === "in" ? kapda.quantity + quantity : kapda.quantity - quantity,
//       stockHistory: [...(kapda.stockHistory || []), newEntry],
//     }

//     onStockUpdate(updatedKapda)
//     setQuantity(0)
//     setNote("")
//   }

//   const stockHistory = kapda.stockHistory || []

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle>Stock Management - {kapda.name}</CardTitle>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-5 w-5" />
//           </Button>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Barcode Display */}
//           <div className="flex flex-col items-center gap-2 p-4 bg-muted/50 rounded-lg">
//             <BarcodeDisplay value={kapda.barcode} width={250} height={80} />
//             <p className="text-sm text-muted-foreground">Scan or enter barcode to find this item</p>
//           </div>

//           {/* Current Stock Info */}
//           <div className="grid grid-cols-3 gap-4">
//             <div className="text-center p-4 bg-primary/10 rounded-lg">
//               <p className="text-sm text-muted-foreground">Current Stock</p>
//               <p className="text-2xl font-bold text-primary">
//                 {kapda.quantity} {kapda.unit}
//               </p>
//             </div>
//             <div className="text-center p-4 bg-green-500/10 rounded-lg">
//               <p className="text-sm text-muted-foreground">Total In</p>
//               <p className="text-2xl font-bold text-green-600">
//                 {stockHistory.filter((s) => s.type === "in").reduce((sum, s) => sum + s.quantity, 0)} {kapda.unit}
//               </p>
//             </div>
//             <div className="text-center p-4 bg-red-500/10 rounded-lg">
//               <p className="text-sm text-muted-foreground">Total Out</p>
//               <p className="text-2xl font-bold text-red-600">
//                 {stockHistory.filter((s) => s.type === "out").reduce((sum, s) => sum + s.quantity, 0)} {kapda.unit}
//               </p>
//             </div>
//           </div>

//           {/* Add Stock Form */}
//           <div className="space-y-4 p-4 border rounded-lg">
//             <h4 className="font-semibold">Add Stock Entry</h4>
//             <div className="flex gap-2">
//               <Button
//                 variant={stockType === "in" ? "default" : "outline"}
//                 onClick={() => setStockType("in")}
//                 className="flex-1"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Stock In (आवक)
//               </Button>
//               <Button
//                 variant={stockType === "out" ? "destructive" : "outline"}
//                 onClick={() => setStockType("out")}
//                 className="flex-1"
//               >
//                 <Minus className="h-4 w-4 mr-2" />
//                 Stock Out (जावक)
//               </Button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Quantity (मात्रा)</Label>
//                 <Input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                   placeholder="Enter quantity"
//                   min={0}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Note (नोट)</Label>
//                 <Input
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                   placeholder="e.g., Customer order, Purchase"
//                 />
//               </div>
//             </div>
//             <Button onClick={handleStockUpdate} className="w-full">
//               {stockType === "in" ? "Add Stock" : "Remove Stock"}
//             </Button>
//           </div>

//           {/* Stock History */}
//           <div className="space-y-2">
//             <h4 className="font-semibold">Stock History (स्टॉक इतिहास)</h4>
//             {stockHistory.length === 0 ? (
//               <div className="text-center py-8 text-muted-foreground">
//                 <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                 <p>No stock history yet</p>
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Type</TableHead>
//                     <TableHead>Quantity</TableHead>
//                     <TableHead>Note</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {[...stockHistory].reverse().map((entry) => (
//                     <TableRow key={entry.id}>
//                       <TableCell>{new Date(entry.date).toLocaleDateString("en-IN")}</TableCell>
//                       <TableCell>
//                         <span
//                           className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
//                             entry.type === "in" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {entry.type === "in" ? "IN (आवक)" : "OUT (जावक)"}
//                         </span>
//                       </TableCell>
//                       <TableCell>
//                         {entry.quantity} {kapda.unit}
//                       </TableCell>
//                       <TableCell>{entry.note || "-"}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }










"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X, Plus, Minus, Package } from "lucide-react"
import type { Kapda, StockEntry } from "@/lib/types"
import { BarcodeDisplay } from "./barcode-display"
import { BASE_URL } from "@/app/config"

interface StockModalProps {
  kapda: Kapda
  onClose: () => void
  onStockUpdate: (kapda: Kapda) => void
}

export function StockModal({ kapda, onClose, onStockUpdate }: StockModalProps) {
  const token = localStorage.getItem("token")
  const [stockType, setStockType] = useState<"IN" | "OUT">("IN")
  const [quantity, setQuantity] = useState<number>(0)
  const [note, setNote] = useState("")
  const [stockHistory, setStockHistory] = useState<StockEntry[]>([])

  // Fetch stock history on mount
  const fetchStockHistory = async () => {
    if (!token) return
    try {
      const res = await fetch(`${BASE_URL}/kapda/${kapda.id}/stock-history`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error("Failed to fetch stock history")
      const data = await res.json()
      setStockHistory(data)
      console.log("Fetched stock history:",data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchStockHistory()
  }, [])

  const handleStockUpdate = async () => {
    if (quantity <= 0) {
      alert("Quantity must be greater than 0")
      return
    }

    if (stockType === "OUT" && quantity > kapda.quantity) {
      alert("Cannot remove more than available stock!")
      return
    }

    if (!token) {
      alert("No authentication token found")
      return
    }

    try {
      const payload = {
        quantity,
        note,
        type: stockType,
      }

      const res = await fetch(`${BASE_URL}/kapda/${kapda.id}/stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg)
      }

      const updatedKapda: Kapda = await res.json()
      onStockUpdate(updatedKapda)
      setQuantity(0)
      setNote("")

      // Refresh stock history
      fetchStockHistory()
    } catch (error: any) {
      console.error(error)
      alert("Failed to update stock: " + error.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stock Management - {kapda.name}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Barcode Display */}
          <div className="flex flex-col items-center gap-2 p-4 bg-muted/50 rounded-lg">
            <BarcodeDisplay value={kapda.barcode} width={250} height={80} />
            <p className="text-sm text-muted-foreground">Scan or enter barcode to find this item</p>
          </div>

          {/* Current Stock Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Current Stock</p>
              <p className="text-2xl font-bold text-primary">
                {kapda.currentStock} {kapda.unit}
              </p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Total In</p>
              <p className="text-2xl font-bold text-green-600">
                {kapda.totalIn}
              </p>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Out</p>
              <p className="text-2xl font-bold text-red-600">
                {kapda.totalOut}
              </p>
            </div>
          </div>

          {/* Add Stock Form */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-semibold">Add Stock Entry</h4>
            <div className="flex gap-2">
              <Button
                variant={stockType === "IN" ? "default" : "outline"}
                onClick={() => setStockType("IN")}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Stock In (आवक)
              </Button>
              <Button
                variant={stockType === "OUT" ? "destructive" : "outline"}
                onClick={() => setStockType("OUT")}
                className="flex-1"
              >
                <Minus className="h-4 w-4 mr-2" />
                Stock Out (जावक)
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity (मात्रा)</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Enter quantity"
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label>Note (नोट)</Label>
                <Input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g., Customer order, Purchase"
                />
              </div>
            </div>
            <Button onClick={handleStockUpdate} className="w-full">
              {stockType === "IN" ? "Add Stock" : "Remove Stock"}
            </Button>
          </div>

          {/* Stock History */}
          <div className="space-y-2">
            <h4 className="font-semibold">Stock History (स्टॉक इतिहास)</h4>
            {stockHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No stock history yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...stockHistory].reverse().map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{new Date(entry.date).toLocaleDateString("en-IN")}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            entry.type === "IN" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {entry.type === "IN" ? "IN (आवक)" : "OUT (जावक)"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {entry.quantity} {kapda.unit}
                      </TableCell>
                      <TableCell>{entry.note || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
