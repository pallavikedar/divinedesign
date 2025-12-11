



"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Printer, X, ArrowUp, ArrowDown } from "lucide-react"
import type { Order } from "@/lib/types"
import { measurementFields } from "@/lib/measurements"

interface PrintBillProps {
  order: Order
  onClose: () => void
}

const garmentLabels: Record<string, { en: string; hi: string }> = {
  coat: { en: "Coat", hi: "कोट" },
  jodhpuri: { en: "Jodhpuri", hi: "जोधपुरी" },
  pant: { en: "Pant", hi: "पैंट" },
  shirt: { en: "Shirt", hi: "शर्ट" },
  kurta: { en: "Kurta", hi: "कुर्ता" },
  paijama: { en: "Paijama", hi: "पाजामा" },
  waistcoat: { en: "Waistcoat", hi: "वेस्टकोट" },
  modiJacket: { en: "Modi Jacket", hi: "मोदी जैकेट" },
}

const allGarments = [
  "coat",
  "jodhpuri",
  "pant",
  "shirt",
  "kurta",
  "paijama",
  "waistcoat",
  "modiJacket",
]

export function PrintBill({ order, onClose }: PrintBillProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      {/* MAIN WRAPPER */}
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="font-bold text-lg">Print Preview</h2>
          <div className="flex gap-2">
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print Bill
            </Button>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ALL CONTENT */}
        <div id="print-area" ref={printRef} className="p-4">

          <style>
            {`
              * { margin:0; padding:0; box-sizing:border-box; }
              body { font-family: Arial, sans-serif; }
              .print-container { display:flex; width:100%; }

              .measurement-slip {
                width:60%;
                padding:10px;
                border-right:1px dashed #000;
              }

              .billing-slip {
                width:40%;
                padding:10px;
              }

              .header {
                text-align:center;
                margin-bottom:10px;
                border-bottom:2px solid #c41e3a;
                padding-bottom:5px;
              }

              .logo {
                font-size:18px;
                font-weight:bold;
                color:#c41e3a;
              }

              .address {
                font-size:8px;
                color:#666;
              }

              .garment-row {
                display:flex;
                align-items:center;
                margin-bottom:8px;
                border:1px solid #c41e3a;
                padding:4px;
              }

              .garment-name {
                width:60px;
                font-weight:bold;
                font-size:10px;
              }

              .measurement-boxes {
                display:flex;
                flex-wrap:wrap;
                gap:2px;
                flex:1;
              }

              .measurement-box {
                border:1px solid #c41e3a;
                width:40px;
                height:28px;
                text-align:center;
                font-size:8px;
              }

              .measurement-box .label {
                background:#c41e3a;
                color:white;
                font-size:7px;
                padding:1px;
              }

              .measurement-box .value {
                font-size:10px;
                font-weight:bold;
                padding:2px;
              }

              .order-no {
                width:50px;
                font-weight:bold;
                font-size:12px;
                text-align:center;
              }

              .customer-info div {
                font-size:12px;
                padding:4px 0;
                border-bottom:1px solid #ccc;
              }

              .particulars-table {
                width:100%;
                border-collapse:collapse;
                margin-top:10px;
              }

              .particulars-table th, .particulars-table td {
                border:1px solid #c41e3a;
                padding:4px;
                text-align:center;
                font-size:10px;
              }

              .particulars-table th {
                background:#c41e3a;
                color:white;
              }

              .billing-row {
                margin-top:5px;
                font-size:12px;
                text-align:right;
                font-weight:bold;
              }

              .thanks {
                margin-top:10px;
                text-align:center;
                font-style:italic;
              }

              /* PRINT SETTINGS */
              @media print {
                body * {
                  visibility: hidden !important;
                }
                #print-area, #print-area * {
                  visibility: visible !important;
                }
                #print-area {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
                   #print-area, #print-area * {
    -webkit-print-color-adjust: exact !important; /* Chrome, Safari */
    print-color-adjust: exact !important; /* Firefox */
  }
                 
              }
            `}
          </style>

          {/* ===================== */}
          {/* MAIN DESIGN CONTENT */}
          {/* ===================== */}

          <div className="print-container">

            {/* LEFT SIDE – MEASUREMENT SLIP */}
            <div className="measurement-slip">
              <div className="header">
                <div className="logo">D<sub>3</sub> Divine Designer Den</div>
                <div className="address">
                  Plot No. 25, Anmol Nagar, Behind Lifeline Hospital,<br/>
                  Wathoda Ring Road, Nagpur<br/>
                  M.: 93709 97885
                </div>
              </div>

              {/* UP & DOWN */}
              <div className="flex gap-4 mb-4">
                <div className="flex gap-2">
                  {order.up1 && <div><ArrowUp size={24} color="green" /> left</div>}
                  {order.up2 && <div><ArrowUp size={24} color="green" /> left</div>}
                  {order.up3 && <div><ArrowUp size={24} color="green" /> right</div>}
                  {order.up4 && <div><ArrowUp size={24} color="green" /> right</div>}
                </div>
                <div className="flex gap-2">
                  {order.down1 && <div><ArrowDown size={24} color="red" /> left</div>}
                  {order.down2 && <div><ArrowDown size={24} color="red" /> left</div>}
                  {order.down3 && <div><ArrowDown size={24} color="red" /> right</div>}
                  {order.down4 && <div><ArrowDown size={24} color="red" /> right</div>}
                </div>
              </div>

              {/* GARMENT MEASUREMENT BLOCKS */}
              {allGarments.map(garment => {
                const fields = measurementFields[garment] || []
                const isSelected = order.selectedGarments?.includes(garment)
                return (
                  <div key={garment} className="garment-row">
                    <div className="garment-name">{garmentLabels[garment].en}</div>
                    <div className="measurement-boxes">
                      {fields.map(f => (
                        <div key={f.id} className="measurement-box">
                          <div className="label">{f.labelHi}</div>
                          <div className="value">
                            {isSelected ? order.measurements?.[garment]?.[f.id] : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* <div className="order-no">No. {order.orderNo}</div> */}
                  </div>
                )
              })}
            </div>

            {/* RIGHT SIDE – BILLING SLIP */}
            <div className="billing-slip">
              <div className="header">
                <div className="logo">D<sub>3</sub> Divine Designer Den</div>
                <div className="address">
                  Plot No. 25, Anmol Nagar, Behind Lifeline Hospital,<br/>
                  Wathoda Ring Road, Nagpur<br/>
                  M.: 93709 97885
                </div>
              </div>

              <div className="customer-info">
                <div>Name: <strong>{order.customerName}</strong></div>
                <div>Mobile: <strong>{order.mobile}</strong></div>
                <div>Order Date: <strong>{order.orderDate}</strong></div>
                <div>Delivery Date: <strong>{order.deliveryDate}</strong></div>
              </div>

              <table className="particulars-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Particulars</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {allGarments.map((garment, i) => {
                    const isSelected = order.selectedGarments?.includes(garment)
                    return (
                      <tr key={garment}>
                        <td>{i + 1}</td>
                        <td>{garmentLabels[garment].en}</td>
                        <td>{isSelected ? order.quantities?.[garment] : ""}</td>
                        <td>{isSelected ? order.total : ""}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="billing-row">Advance: ₹ {order.advance}</div>
              <div className="billing-row">Balance: ₹ {order.balance}</div>

              <div className="thanks">Thanks!</div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
