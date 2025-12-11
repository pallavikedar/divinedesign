
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Package, Search, BarChart3, Printer } from "lucide-react"
import type { Kapda } from "@/lib/types"
import { BarcodeDisplay, generateBarcode } from "./barcode-display"
import { StockModal } from "./stock-modal"
import { BASE_URL } from "@/app/config"

interface KapdaInventoryProps {
  inventory: Kapda[]
  onSave: (item: Kapda) => void
  onDelete: (id: number) => void
}

const clothTypes = [
  "Cotton (सूती)",
  "Silk (रेशम)",
  "Linen (लिनन)",
  "Wool (ऊन)",
  "Polyester (पॉलिएस्टर)",
  "Velvet (मखमल)",
  "Satin (साटन)",
  "Denim (डेनिम)",
  "Terry Wool (टेरी वूल)",
  "Raymond",
  "Other (अन्य)",
]

export function KapdaInventory({ inventory, onSave, onDelete }: KapdaInventoryProps) {
  const token = localStorage.getItem("token")
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Kapda | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [stockModalItem, setStockModalItem] = useState<Kapda | null>(null)
  const [inventoryState, setInventoryState] = useState<Kapda[]>(inventory)

  const [formData, setFormData] = useState<Omit<Kapda, "id">>({
    barcode: generateBarcode(),
    name: "",
    type: "",
    color: "",
    quantity: 0,
    unit: "meter",
    pricePerUnit: 0,
    supplier: "",
    dateAdded: "",
    stockHistory: [],
  })

  const resetForm = () => {
    setFormData({
      barcode: generateBarcode(),
      name: "",
      type: "",
      color: "",
      quantity: 0,
      unit: "meter",
      pricePerUnit: 0,
      supplier: "",
      dateAdded: "",
      stockHistory: [],
    })
    setEditingItem(null)
    setShowForm(false)
  }

  const handleSubmit = async () => {
  // Manual validation
  if (
    !formData.barcode.trim() ||
    !formData.name.trim() ||
    !formData.type.trim() ||
    !formData.color.trim() ||
    formData.quantity <= 0 ||
    formData.pricePerUnit <= 0 ||
    !formData.supplier.trim() ||
    !formData.dateAdded.trim()
  ) {
    alert("Please fill all required fields correctly.")
    return
  }

  if (!token) {
    alert("No authentication token found")
    return
  }

  const payload = {
    barcode: formData.barcode,
    name: formData.name,
    type: formData.type,
    color: formData.color,
    quantity: Number(formData.quantity),
    unit: formData.unit,
    pricePerUnit: Number(formData.pricePerUnit),
    supplier: formData.supplier,
    dateAdded: formData.dateAdded,
    stockHistory: formData.stockHistory || [],
  }

  let url = `${BASE_URL}/kapda`
  let method = "POST"

  if (editingItem?.id) {
    url = `${BASE_URL}/kapda/${editingItem.id}`
    method = "PUT"
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const msg = await response.text()
    console.error("SAVE ERROR:", msg)
    alert("Failed: " + msg)
    return
  }

  const saved = await response.json()
  onSave(saved)
  resetForm()
  setShowForm(false)
}


  const handleEdit = (item: Kapda) => {
    setFormData({
      barcode: item.barcode,
      name: item.name,
      type: item.type,
      color: item.color,
      quantity: item.quantity,
      unit: item.unit,
      pricePerUnit: item.pricePerUnit,
      supplier: item.supplier,
      dateAdded: item.dateAdded,
      stockHistory: item.stockHistory || [],
    })
    setEditingItem(item)
    setShowForm(true)
  }

  const handleStockUpdate = (updatedKapda: Kapda) => {
    onSave(updatedKapda)
    setStockModalItem(updatedKapda)
  }

  const handlePrintBarcode = (item: Kapda) => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Barcode - ${item.name}</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              .barcode-container { display: inline-block; border: 1px solid #ccc; padding: 10px; margin: 10px; }
              .item-name { font-weight: bold; margin-bottom: 5px; }
              .item-details { font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="barcode-container">
              <div class="item-name">${item.name}</div>
              <div class="item-details">${item.type} | ${item.color}</div>
              <canvas id="barcode" width="200" height="80"></canvas>
              <div style="font-family: monospace; font-size: 14px;">${item.barcode}</div>
              <div class="item-details">₹${item.pricePerUnit}/${item.unit}</div>
            </div>
            <script>
              const canvas = document.getElementById('barcode');
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, 200, 80);
              ctx.fillStyle = '#000000';
              const pattern = '${generateBarcodePattern(item.barcode)}';
              let x = 10;
              for (let i = 0; i < pattern.length; i++) {
                if (pattern[i] === '1') {
                  ctx.fillRect(x, 5, 2, 55);
                }
                x += 2;
              }
              window.print();
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  // 🔹 API loader
  const loadInventory = async () => {
    if (!token) return
    const res = await fetch(`${BASE_URL}/kapda`, {
      headers: { authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      console.error("Failed to load data")
      return
    }
    const data = await res.json()
    setInventoryState(data)
  }

  useEffect(() => {
    loadInventory()
  }, [])

  const filteredInventory = inventoryState.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.barcode.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalValue = inventoryState.reduce((sum, item) => sum + item.quantity * item.pricePerUnit, 0)
  const lowStockItems = inventoryState.filter((item) => item.quantity < 10)
 const handleDelete = async (id: number) => {
    if (!token) return
    if (!confirm("Are you sure you want to delete this item?")) return

    const res = await fetch(`${BASE_URL}/kapda/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
      const msg = await res.text()
      alert("Failed to delete: " + msg)
      return
    }

    // Remove deleted item from local state
    setInventoryState((prev) => prev.filter((item) => item.id !== id))
    onDelete(id)
  }
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{inventoryState.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stock</p>
                <p className="text-2xl font-bold">
                  {inventoryState.reduce((sum, item) => sum + item.quantity, 0)} mtr
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/10 p-3 rounded-lg">
                <span className="text-amber-600 text-xl font-bold">₹</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={lowStockItems.length > 0 ? "border-red-500" : ""}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${lowStockItems.length > 0 ? "bg-red-500/10" : "bg-muted"}`}>
                <BarChart3
                  className={`h-6 w-6 ${lowStockItems.length > 0 ? "text-red-600" : "text-muted-foreground"}`}
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Alert</p>
                <p className={`text-2xl font-bold ${lowStockItems.length > 0 ? "text-red-600" : ""}`}>
                  {lowStockItems.length} items
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Add */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, type, color, barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Kapda
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? "Edit Kapda" : "Add New Kapda"}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Form content (unchanged) */}
             <div className="flex justify-center mb-6">
               <div className="text-center">
                 <BarcodeDisplay value={formData.barcode} width={220} height={70} />
                 <p className="text-xs text-muted-foreground mt-1">Auto-generated Barcode</p>
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="space-y-2">
                 <Label>Barcode (बारकोड)</Label>
                 <Input
                  value={formData.barcode}
                  onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  placeholder="Auto-generated"
                   required
                />
              </div>
              <div className="space-y-2">
                <Label>Kapda Name (कपड़े का नाम)</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter cloth name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Type (प्रकार)</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {clothTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Color (रंग)</Label>
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Enter color"
                   required
                />
              </div>
              <div className="space-y-2">
                <Label>Quantity (मात्रा)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    placeholder="0"
                     required
                  />
                  <Select
                    value={formData.unit}
                    onValueChange={(value: "meter" | "yard") => setFormData({ ...formData, unit: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meter">Meter</SelectItem>
                      <SelectItem value="yard">Yard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Price Per Unit (दर)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    type="number"
                    value={formData.pricePerUnit}
                    onChange={(e) => setFormData({ ...formData, pricePerUnit: Number(e.target.value) })}
                    className="pl-8"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Supplier (सप्लायर)</Label>
                <Input
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  placeholder="Enter supplier name"
                   required
                />
              </div>
              <div className="space-y-2">
                <Label>Date Added (तारीख)</Label>
                <Input
                  type="date"
                  value={formData.dateAdded}
                  onChange={(e) => setFormData({ ...formData, dateAdded: e.target.value })}
                   required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSubmit}>{editingItem ? "Update" : "Add"} Kapda</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kapda Inventory (कपड़ा स्टॉक)</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInventory.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No kapda in inventory</p>
              <p className="text-sm">Click "Add Kapda" to add your first item</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Barcode</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price/Unit</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id} className={item.quantity < 10 ? "bg-red-50" : ""}>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">{item.barcode}</code>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.color}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${item.quantity < 10 ? "text-red-600" : ""}`}>
                          {item.currentStock} {item.unit}
                        </span>
                        {item.quantity < 10 && (
                          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Low</span>
                        )}
                      </TableCell>
                      <TableCell>₹{item.pricePerUnit}</TableCell>
                      <TableCell className="font-medium">₹{(item.quantity * item.pricePerUnit).toLocaleString()}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setStockModalItem(item)} title="Manage Stock">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handlePrintBarcode(item)} title="Print Barcode">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} title="Delete">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Modal */}
      {stockModalItem && (
        <StockModal kapda={stockModalItem} onClose={() => setStockModalItem(null)} onStockUpdate={handleStockUpdate} />
      )}
    </div>
  )
}

// Helper for barcode printing
function generateBarcodePattern(value: string): string {
  const patterns: Record<string, string> = {
    "0": "11011001100",
    "1": "11001101100",
    "2": "11001100110",
    "3": "10010011000",
    "4": "10010001100",
    "5": "10001001100",
    "6": "10011001000",
    "7": "10011000100",
    "8": "10001100100",
    "9": "11001001000",
    A: "11010010000",
    B: "11000100100",
    C: "10110011100",
    D: "10011011100",
    E: "10011001110",
    F: "10111001100",
    G: "10011101100",
    H: "10011100110",
    I: "11001110010",
    J: "11001011100",
    K: "11001001110",
    L: "11011100100",
    M: "11001110100",
    N: "11101101110",
    O: "11101001100",
    P: "11100101100",
    Q: "11100100110",
    R: "11101100100",
    S: "11100110100",
    T: "11100110010",
    U: "11011011000",
    V: "11011000110",
    W: "11000110110",
    X: "10100011000",
    Y: "10001011000",
    Z: "10001000110",
    "-": "10010110000",
  }
  let result = "11010000100"
  for (const char of value.toUpperCase()) {
    result += patterns[char] || "10101010101"
  }
  result += "1100011101011"
  return result
}
