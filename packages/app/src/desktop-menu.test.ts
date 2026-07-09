import { describe, expect, test } from "bun:test"
import { DESKTOP_MENU } from "./desktop-menu"

describe("desktop menu", () => {
  test("focuses the prompt input from the native macOS menu", () => {
    const item = DESKTOP_MENU.flatMap((menu) => menu.items ?? []).find(
      (item) => item.type === "item" && item.command === "input.focus",
    )

    expect(item).toEqual({
      type: "item",
      label: "Focus Input",
      command: "input.focus",
      accelerator: { macos: "Ctrl+L" },
    })
  })

  test("exports logs through the desktop command registry", () => {
    const items = DESKTOP_MENU.flatMap((menu) => menu.items ?? []).filter(
      (item) => item.type === "item" && item.label === "Export Logs...",
    )

    expect(items).toHaveLength(2)
    expect(items.every((item) => item.type === "item" && item.command === "logs.export" && !item.action)).toBe(true)
  })
})
