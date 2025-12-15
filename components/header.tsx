"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Scissors, ListOrdered, PlusCircle, Search, Package } from "lucide-react"

interface HeaderProps {
  view: "form" | "list" | "details" | "inventory"
  onViewChange: (view: "form" | "list" | "details" | "inventory") => void
  onNewOrder: () => void
  orderCount: number
  searchQuery: string
  onSearchChange: (query: string) => void
  inventoryCount: number
}
const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }


export function Header({
  view,
  onViewChange,
  onNewOrder,
  orderCount,
  searchQuery,
  onSearchChange,
  inventoryCount,
  
}: HeaderProps)

 {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Scissors className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Divine Designer Den</h1>
              <p className="text-sm text-muted-foreground">Tailor Management System</p>
            </div>
          </div>

          {view !== "inventory" && (
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search customer name, mobile, order no..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant={view === "form" ? "default" : "outline"}
              size="sm"
              onClick={() => view !== "form" && onNewOrder()}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Order
            </Button>
            <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => onViewChange("list")}>
              <ListOrdered className="h-4 w-4 mr-2" />
              Orders
            </Button>
            <Button
              variant={view === "inventory" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("inventory")}
            >
              <Package className="h-4 w-4 mr-2" />
              Kapda
            </Button>
             <Button
             
              size="sm"
             onClick={handleLogout}
            >
              
              logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
