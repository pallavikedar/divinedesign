// import type { GarmentMeasurements } from "./types"

// interface MeasurementField {
//   id: string
//   label: string
//   labelHi: string
// }

// export const measurementFields: Record<string, MeasurementField[]> = { 
//   coat: [
//     { id: "lambai", label: "Length", labelHi: "लंबाई" },
//     { id: "pet", label: "Chest", labelHi: "पेट" },
//     { id: "chati", label: "Chest", labelHi: "छाती" },
//     { id: "seat", label: "Seat", labelHi: "सीट" },
//     { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
//     { id: "asteen", label: "Sleeve", labelHi: "आस्तीन" },
//     { id: "gala", label: "Neck", labelHi: "गला" },
//   ],
//   jodhpuri: [
//     { id: "lambai", label: "Length", labelHi: "लंबाई" },
//     { id: "pet", label: "Chest", labelHi: "पेट" },
//     { id: "chati", label: "Chest", labelHi: "छाती" },
//     { id: "seat", label: "Seat", labelHi: "सीट" },
//     { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
//     { id: "asteen", label: "Sleeve", labelHi: "आस्तीन" },
//     { id: "gala", label: "Neck", labelHi: "गला" },
//   ],
//   pant: [
//     { id: "lambai", label: "Length", labelHi: "लंबाई" },
//     { id: "kamar", label: "Waist", labelHi: "कमर" },
//     { id: "seat", label: "Seat", labelHi: "सीट" },
//     { id: "jang", label: "Thigh", labelHi: "जांग" },
//     { id: "latka", label: "Inseam", labelHi: "लटका" },
//     { id: "bottom", label: "Bottom", labelHi: "बाटम" },
//     { id: "ghutna", label: "Knee", labelHi: "घुटना" },
//   ],
//   shirt: [
//     { id: "lambai", label: "Length", labelHi: "लंबाई" },
//     { id: "pet", label: "Chest", labelHi: "पेट" },
//     { id: "chati", label: "Chest", labelHi: "छाती" },
//     { id: "seat", label: "Seat", labelHi: "सीट" },
//     { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
//     { id: "asteen", label: "Sleeve", labelHi: "आस्तीन" },
//     { id: "gala", label: "Neck", labelHi: "गला" },
//     { id: "kaf", label: "Cuff", labelHi: "कफ" },
//   ],
//   kurta: [
//     { id: "lambai", label: "Length", labelHi: "लंबाई" },
//     { id: "chati", label: "Chest", labelHi: "छाती" },
//     { id: "pet", label: "Belly", labelHi: "पेट" },
//     { id: "seat", label: "Seat", labelHi: "सीट" },
//     { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
//     { id: "asteen", label: "Sleeve", labelHi: "आस्तीन" },
//     { id: "gala", label: "Neck", labelHi: "गला" },
//     { id: "mohri", label: "Cuff", labelHi: "मोहरी" },
//     { id: "kaf", label: "Armhole", labelHi: "कफ" },
//   ],
//   paijama: [
//     { id: "lambai", label: "Length", labelHi: "लंबाई" },
//     { id: "kamar", label: "Waist", labelHi: "कमर" },
//     { id: "seat", label: "Seat", labelHi: "सीट" },
//     { id: "jang", label: "Thigh", labelHi: "जांग" },
//     { id: "latka", label: "Inseam", labelHi: "लटका" },
//     { id: "bottom", label: "Bottom", labelHi: "बाटम" },
//     { id: "ghutna", label: "Knee", labelHi: "घुटना" },
//   ],
//   waistcoat: [
//     { id: "lambai", label: "Length", labelHi: "लंबाई" },
//     { id: "chati", label: "Chest", labelHi: "छाती" },
//     { id: "pet", label: "Belly", labelHi: "पेट" },
//     { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
//   ],
//   modiJacket: [
//     { id: "lambai", label: "Length", labelHi: "लंबाई" },
//     { id: "chati", label: "Chest", labelHi: "छाती" },
//     { id: "pet", label: "Belly", labelHi: "पेट" },
//     { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
//   ],
// }

// export const defaultMeasurements: Record<string, GarmentMeasurements> = Object.keys(measurementFields).reduce(
//   (acc, key) => ({
//     ...acc,
//     [key]: measurementFields[key].reduce((fields, field) => ({ ...fields, [field.id]: "" }), {}),
//   }),
//   {},
// )

import type { GarmentMeasurements } from "./types";

interface MeasurementField {
  id: string
  label: string
  labelHi: string
}

export const measurementFields: Record<string, MeasurementField[]> = {
  coat: [
    { id: "lambai", label: "Length", labelHi: "लंबाई" },
     { id: "chati", label: "Chest", labelHi: "छाती" },
    { id: "pet", label: "Belly", labelHi: "पेट" },
   
    { id: "seat", label: "Seat", labelHi: "सीट" },
    { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
    { id: "asteen", label: "Sleeve", labelHi: "आस्तीन" },
    { id: "gala", label: "Neck", labelHi: "गला" },
    { id: "note", label: "note", labelHi: "नोट " },
  ],

  jodhpuri: [
    { id: "lambai", label: "Length", labelHi: "लंबाई" },
   
    { id: "chati", label: "Chest", labelHi: "छाती" },
     { id: "pet", label: "Belly", labelHi: "पेट" },
    { id: "seat", label: "Seat", labelHi: "सीट" },
    { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
    { id: "asteen", label: "Sleeve", labelHi: "आस्तीन" },
    { id: "gala", label: "Neck", labelHi: "गला" },
    { id: "note", label: "note", labelHi: "नोट " },
  ],

  pant: [
    { id: "lambai", label: "Length", labelHi: "लंबाई" },
    { id: "kamar", label: "Waist", labelHi: "कमर" },
    { id: "seat", label: "Seat", labelHi: "सीट" },
    { id: "jang", label: "Thigh", labelHi: "जांग" },
    { id: "latka", label: "Inseam", labelHi: "लटका" },
    { id: "bottom", label: "Bottom", labelHi: "बाटम" },
    { id: "ghutna", label: "Knee", labelHi: "घुटना" },
    { id: "note", label: "note", labelHi: "नोट " },
  ],

  shirt: [
    { id: "lambai", label: "Length", labelHi: "लंबाई" },
    { id: "chati", label: "Chest", labelHi: "छाती" },
    { id: "pet", label: "Belly", labelHi: "पेट" },
    
    { id: "seat", label: "Seat", labelHi: "सीट" },
    { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
    { id: "asteen", label: "Sleeve", labelHi: "आस्तीन" },
    { id: "gala", label: "Neck", labelHi: "गला" },
    { id: "kaf", label: "Cuff", labelHi: "कफ" },
    { id: "note", label: "note", labelHi: "नोट " },
  ],

  kurta: [
    { id: "lambai", label: "Length", labelHi: "लंबाई" },
    { id: "chati", label: "Chest", labelHi: "छाती" },
    { id: "pet", label: "Belly", labelHi: "पेट" },
    { id: "seat", label: "Seat", labelHi: "सीट" },
    { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
    { id: "asteen", label: "Sleeve", labelHi: "आस्तीन" },
    { id: "gala", label: "Neck", labelHi: "गला" },
    { id: "mohri", label: "Cuff", labelHi: "मोहरी" },
    { id: "kaf", label: "Armhole", labelHi: "कफ" },
    { id: "note", label: "note", labelHi: "नोट " },
  ],

  paijama: [
    { id: "lambai", label: "Length", labelHi: "लंबाई" },
    { id: "kamar", label: "Waist", labelHi: "कमर" },
    { id: "seat", label: "Seat", labelHi: "सीट" },
    { id: "jang", label: "Thigh", labelHi: "जांग" },
    { id: "latka", label: "Inseam", labelHi: "लटका" },
    { id: "bottom", label: "Bottom", labelHi: "बाटम" },
    { id: "ghutna", label: "Knee", labelHi: "घुटना" },
    { id: "note", label: "note", labelHi: "नोट " },
  ],

  waistcoat: [
    { id: "lambai", label: "Length", labelHi: "लंबाई" },
     
    { id: "chati", label: "Chest", labelHi: "छाती" },
    { id: "pet", label: "Belly", labelHi: "पेट" },
     { id: "seat", label: "Seat", labelHi: "सीट" },
    { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
   { id: "gala", label: "Neck", labelHi: "गला" },
    { id: "note", label: "note", labelHi: "नोट " },
  ],

  modiJacket: [
     { id: "lambai", label: "Length", labelHi: "लंबाई" },
     
    { id: "chati", label: "Chest", labelHi: "छाती" },
    { id: "pet", label: "Belly", labelHi: "पेट" },
     { id: "seat", label: "Seat", labelHi: "सीट" },
    { id: "shoulder", label: "Shoulder", labelHi: "शोल्डर" },
   { id: "gala", label: "Neck", labelHi: "गला" },
    { id: "note", label: "note", labelHi: "नोट " },
  ],
};

export const defaultMeasurements: Record<string, GarmentMeasurements> =
  Object.keys(measurementFields).reduce(
    (acc, key) => ({
      ...acc,
      [key]: measurementFields[key].reduce(
        (fields, field) => ({ ...fields, [field.id]: "" }),
        {},
      ),
    }),
    {},
  );

