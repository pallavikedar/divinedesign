export interface GarmentMeasurements {
  [key: string]: string
}

export interface Order {
  orderNo: number
  customerName: string
  mobileNo: string
  orderDate: string
  deliveryDate: string
  selectedGarments: string[]
  measurements: Record<string, GarmentMeasurements>
  quantities: Record<string, number>
  amounts: Record<string, number>
  advance: number
  total: number
  balance: number
}

export interface StockEntry {
  id: number
  type: "in" | "out"
  quantity: number
  date: string
  note: string
}

export interface Kapda {
  id: number
  barcode: string
  name: string
  type: string
  color: string
  quantity: number
  unit: "meter" | "yard"
  pricePerUnit: number
  supplier: string
  dateAdded: string
  stockHistory: StockEntry[]
}
