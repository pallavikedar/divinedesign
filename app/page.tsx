


"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { OrderForm } from "@/components/order-form"
import { OrderList } from "@/components/order-list"
import { Header } from "@/components/header"
// import OrderDetailsPage from "@/components/customer-details"
import { KapdaInventory } from "@/components/kapda-inventory"
import type { Order, Kapda } from "@/lib/types"

export default function TailorManagement() {
  const router = useRouter()

  // 🔐 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
    }
  }, [])

  const [orders, setOrders] = useState<Order[]>([])
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [view, setView] = useState<"form" | "list" | "details" | "inventory">("form")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [kapdaInventory, setKapdaInventory] = useState<Kapda[]>([])

  const handleSaveOrder = (order: Order) => {
    if (editingOrder) {
      setOrders(orders.map((o) => (o.orderNo === order.orderNo ? order : o)))
      setEditingOrder(null)
    } else {
      setOrders([...orders, order])
    }
    setView("list")
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order)
    setView("form")
  }

  const handleDeleteOrder = (orderNo: number) => {
    setOrders(orders.filter((o) => o.orderNo !== orderNo))
  }

  const handleNewOrder = () => {
    setEditingOrder(null)
    setView("form")
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setView("details")
  }

  const handleBackToList = () => {
    setSelectedOrder(null)
    setView("list")
  }

  const handleSaveKapda = (item: Kapda) => {
    const existingIndex = kapdaInventory.findIndex((k) => k.id === item.id)
    if (existingIndex >= 0) {
      setKapdaInventory(kapdaInventory.map((k) => (k.id === item.id ? item : k)))
    } else {
      setKapdaInventory([...kapdaInventory, item])
    }
  }

  const handleDeleteKapda = (id: number) => {
    setKapdaInventory(kapdaInventory.filter((k) => k.id !== id))
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.mobileNo.includes(searchQuery) ||
      order.orderNo.toString().includes(searchQuery),
  )

  return (
    <div className="min-h-screen bg-background">
      <Header
        view={view}
        onViewChange={setView}
        onNewOrder={handleNewOrder}
        orderCount={orders.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        inventoryCount={kapdaInventory.length}
      />

      <main className="container mx-auto px-4 py-6">
        {view === "form" ? (
          <OrderForm
            onSave={handleSaveOrder}
            editingOrder={editingOrder}
            nextOrderNo={orders.length > 0 ? Math.max(...orders.map((o) => o.orderNo)) + 1 : 1}
          />
        ) : view === "details" && selectedOrder ? (
          <OrderDetailsPage order={selectedOrder} onBack={handleBackToList} onEdit={handleEditOrder} />
        ) : view === "inventory" ? (
          <KapdaInventory inventory={kapdaInventory} onSave={handleSaveKapda} onDelete={handleDeleteKapda} />
        ) : (
          <OrderList
            orders={filteredOrders}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            onViewDetails={handleViewDetails}
          />
        )}
      </main>
    </div>
  )
}
