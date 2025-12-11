"use client"

import { useEffect, useRef } from "react"

interface BarcodeDisplayProps {
  value: string
  width?: number
  height?: number
}

export function BarcodeDisplay({ value, width = 200, height = 80 }: BarcodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)

    // Generate Code128-like barcode pattern
    const barWidth = 2
    const startX = 10
    const barHeight = height - 25

    // Convert string to binary pattern for barcode
    const pattern = generateBarcodePattern(value)

    ctx.fillStyle = "#000000"
    let x = startX

    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === "1") {
        ctx.fillRect(x, 5, barWidth, barHeight)
      }
      x += barWidth
    }

    // Draw text below barcode
    ctx.fillStyle = "#000000"
    ctx.font = "12px monospace"
    ctx.textAlign = "center"
    ctx.fillText(value, width / 2, height - 5)
  }, [value, width, height])

  return <canvas ref={canvasRef} width={width} height={height} className="border rounded bg-white" />
}

// Generate a simple barcode pattern from string
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

  // Start pattern
  let result = "11010000100"

  for (const char of value.toUpperCase()) {
    result += patterns[char] || "10101010101"
  }

  // Stop pattern
  result += "1100011101011"

  return result
}

// Generate unique barcode
export function generateBarcode(): string {
  const prefix = "KPD"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp.slice(-4)}${random}`
}
