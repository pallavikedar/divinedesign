"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { PrintBill } from "@/components/print-bill"
import type { Order } from "@/lib/types"
import { BASE_URL } from "@/app/config"

export default function Page() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch(`${BASE_URL}/Customer-orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then((data: any) => {
        // -------------- FIX: TRANSFORM GARMENTS --------------
        const selectedGarments = data.garments?.map((g: any) => g.type) ?? []

        const quantities: Record<string, number> = {}
        const amounts: Record<string, number> = {}
        const measurements: Record<string, any> = {}

        data.garments?.forEach((g: any) => {
          quantities[g.type] = g.quantity
          amounts[g.type] = g.amount ?? 0

          // 🔥 FIX: API uses "measurement" not "measurements"
          measurements[g.type] = g.measurement ?? {}
        })

        // FINAL structured order
        setOrder({
          ...data,
          selectedGarments,
          quantities,
          amounts,
          measurements,
        })
      })
      .catch(err => console.error("Order fetch error:", err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!order) return <p>Order not found</p>

  return <PrintBill order={order} onClose={() => router.back()} />
}
