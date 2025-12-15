// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface Props {
//   garmentId: string;
//   garmentLabel: string;
//   garmentLabelHi: string;
//   measurements: any;
//   onMeasurementChange: (field: string, value: string) => void;
//   quantity: number;
//   onQuantityChange: (value: number) => void;
//   amount: number;
//   onAmountChange: (value: number) => void;
// }

// export function MeasurementSection({
//   garmentId,
//   garmentLabel,
//   garmentLabelHi,
//   measurements,
//   onMeasurementChange,
//   quantity,
//   onQuantityChange,
//   amount,
//   onAmountChange
// }: Props) {
//   const measurementFields: Record<string, string[]> = {
//     coat: ["lengthSize", "chestSize", "waistSize", "seatSize", "shoulderSize", "sleeveSize", "neckSize"],
//     jodhpuri: ["lengthSize", "chestSize", "waistSize", "seatSize", "shoulderSize", "sleeveSize"],
//     pant: ["lengthSize", "waistSize", "seatSize", "thighSize", "bottomSize"],
//     shirt: ["lengthSize", "chestSize", "shoulderSize", "sleeveSize", "collarSize"],
//     kurta: ["lengthSize", "chestSize", "waistSize", "shoulderSize", "sleeveSize"],
//     paijama: ["lengthSize", "waistSize", "seatSize", "bottomSize"],
//     waistcoat: ["lengthSize", "chestSize", "waistSize", "shoulderSize"],
//     modiJacket: ["lengthSize", "chestSize", "waistSize", "shoulderSize"]
//   };

//   const fields = measurementFields[garmentId] || [];

//   return (
//     <Card className="border-primary/50">
//       <CardHeader>
//         <CardTitle className="text-lg">
//           {garmentLabel} / {garmentLabelHi}
//         </CardTitle>
//       </CardHeader>

//       <CardContent>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//           {fields.map((field) => (
//             <div key={field}>
//               <Label className="capitalize">{field.replace("Size", "")}</Label>
//               <Input
//                 value={measurements[field] || ""}
//                 onChange={(e) => onMeasurementChange(field, e.target.value)}
//               />
//             </div>
//           ))}

//           {/* Quantity */}
//           <div>
//             <Label>Quantity</Label>
//             <Input
//               type="number"
//               value={quantity}
//               onChange={(e) => onQuantityChange(Number(e.target.value))}
//             />
//           </div>

//           {/* Amount */}
//           <div>
//             <Label>Amount</Label>
//             <Input
//               type="number"
//               value={amount}
//               onChange={(e) => onAmountChange(Number(e.target.value))}
//             />
//           </div>

//         </div>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { measurementFields } from "@/lib/measurements";// <-- update path
import type { GarmentMeasurements } from "./types";

interface Props {
  garmentId: string;
  garmentLabel: string;
  garmentLabelHi: string;
  measurements: GarmentMeasurements;
  onMeasurementChange: (field: string, value: string) => void;

  quantity: number;
  onQuantityChange: (value: number) => void;

  amount: number;
  onAmountChange: (value: number) => void;
}

export function MeasurementSection({
  garmentId,
  garmentLabel,
  garmentLabelHi,
  measurements,
  onMeasurementChange,
  quantity,
  onQuantityChange,
  amount,
  onAmountChange,
}: Props) {
  const fields = measurementFields[garmentId] || [];

  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle className="text-lg">
          {garmentLabel} / {garmentLabelHi}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Dynamic Measurement Fields */}
          {fields.map((field) => (
            <div key={field.id}>
              <Label className="capitalize">
                {field.label} / {field.labelHi}
              </Label>
              <Input
                value={measurements[field.id] ?? ""}
                onChange={(e) => onMeasurementChange(field.id, e.target.value)}
              />
            </div>
          ))}
          
          {/* Quantity */}
          <div>
            <Label>Quantity / मात्रा</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => onQuantityChange(Number(e.target.value))}
            />
          </div>

          {/* Amount */}
          <div>
            <Label>Amount / राशि</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => onAmountChange(Number(e.target.value))}
            />
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
