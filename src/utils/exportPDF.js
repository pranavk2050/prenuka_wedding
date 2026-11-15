import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const GOLD   = [201, 151, 47]
const PURPLE = [126,  39, 135]
const DARK   = [12,   9,  25]
const CREAM  = [245, 237, 214]
const GRAY   = [120, 110, 140]

function hex(rgb) { return `#${rgb.map(v => v.toString(16).padStart(2,'0')).join('')}` }

function addHeader(doc, pageWidth) {
  doc.setFillColor(...DARK)
  doc.rect(0, 0, pageWidth, 36, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(...GOLD)
  doc.text('Pranav & Renuka', pageWidth / 2, 14, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...CREAM)
  doc.text('12 February 2027  ·  Coco Resort, Punawale, Pune', pageWidth / 2, 21, { align: 'center' })
  doc.text('Marathi Deshasth Rigvedi Vivah Sohala', pageWidth / 2, 27, { align: 'center' })
}

function sectionTitle(doc, title, y, color = GOLD) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...color)
  doc.text(title, 14, y)
  doc.setDrawColor(...color)
  doc.setLineWidth(0.4)
  doc.line(14, y + 2, 196, y + 2)
  return y + 8
}

function fmt(n) {
  if (!n) return '₹0'
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n}`
}

function statusLabel(s) {
  const map = { not_started: 'Not started', advance_paid: 'Advance paid', balance_due: 'Balance due', fully_paid: 'Fully paid' }
  return map[s] ?? s ?? '—'
}

export function exportFullPDF(state) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  let y = 0

  // ── COVER / HEADER ──────────────────────────────────────────────────────────
  addHeader(doc, W)
  y = 44

  // Quick stats bar
  const groomCount = state.guests.groomSide.length
  const brideCount = state.guests.brideSide.length
  const doneTasks  = state.tasks.filter(t => t.completed).length
  const totalSpent = state.budget.categories.reduce((s, c) => s + (c.spent || 0), 0)

  const stats = [
    [`${groomCount + brideCount}`, 'Total Guests'],
    [`${doneTasks}/${state.tasks.length}`, 'Tasks Done'],
    [fmt(totalSpent), 'Spent'],
    [fmt(state.budget.totalBudget), 'Budget'],
  ]
  const colW = (W - 28) / 4
  stats.forEach(([val, label], i) => {
    const x = 14 + i * colW + colW / 2
    doc.setFillColor(30, 20, 50)
    doc.roundedRect(14 + i * colW, y - 4, colW - 2, 18, 2, 2, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(...GOLD)
    doc.text(val, x, y + 5, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...GRAY)
    doc.text(label, x, y + 10, { align: 'center' })
  })
  y += 22

  // ── GUESTS ──────────────────────────────────────────────────────────────────
  y = sectionTitle(doc, 'Guest List', y)

  const allGuests = [
    ...state.guests.groomSide.map(g => ({ ...g, _side: "Pranav's Side" })),
    ...state.guests.brideSide.map(g => ({ ...g, _side: "Renuka's Side" })),
  ]

  autoTable(doc, {
    startY: y,
    head: [['Name', 'Side', 'Relation', 'RSVP', 'Stay', 'Meal']],
    body: allGuests.map(g => [
      g.name || '—',
      g._side,
      g.relation || '—',
      g.rsvp ? g.rsvp.charAt(0).toUpperCase() + g.rsvp.slice(1) : 'Pending',
      g.stay ? 'Yes' : 'No',
      g.meal ? g.meal.charAt(0).toUpperCase() + g.meal.slice(1) : '—',
    ]),
    headStyles: { fillColor: DARK, textColor: GOLD, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 8, textColor: [50, 40, 70] },
    alternateRowStyles: { fillColor: [248, 245, 255] },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 35 },
      2: { cellWidth: 30 },
      3: { cellWidth: 22 },
      4: { cellWidth: 18 },
      5: { cellWidth: 22 },
    },
    margin: { left: 14, right: 14 },
    didParseCell: data => {
      if (data.section === 'body' && data.column.index === 1) {
        data.cell.styles.textColor = data.cell.raw === "Pranav's Side" ? GOLD : PURPLE
        data.cell.styles.fontStyle = 'bold'
      }
    },
  })
  y = doc.lastAutoTable.finalY + 10

  // ── TASKS ───────────────────────────────────────────────────────────────────
  if (y > 240) { doc.addPage(); addHeader(doc, W); y = 44 }
  y = sectionTitle(doc, 'Task Checklist', y)

  const categories = [...new Set(state.tasks.map(t => t.category))]
  categories.forEach(cat => {
    const catTasks = state.tasks.filter(t => t.category === cat)
    const done = catTasks.filter(t => t.completed).length
    if (y > 260) { doc.addPage(); addHeader(doc, W); y = 44 }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...PURPLE)
    doc.text(`${cat}  (${done}/${catTasks.length})`, 14, y)
    y += 2

    autoTable(doc, {
      startY: y,
      body: catTasks.map(t => [t.completed ? '☑' : '☐', t.title, t.priority || '—', t.side || 'both']),
      bodyStyles: { fontSize: 8, textColor: [50, 40, 70] },
      alternateRowStyles: { fillColor: [248, 245, 255] },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 110 },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 30, halign: 'center' },
      },
      margin: { left: 14, right: 14 },
      didParseCell: data => {
        if (data.section === 'body' && data.column.index === 0 && data.cell.raw === '☑') {
          data.cell.styles.textColor = [34, 197, 94]
        }
      },
    })
    y = doc.lastAutoTable.finalY + 5
  })

  // ── BUDGET ──────────────────────────────────────────────────────────────────
  doc.addPage(); addHeader(doc, W); y = 44
  y = sectionTitle(doc, 'Budget Tracker', y)

  const totalAllocated = state.budget.categories.reduce((s, c) => s + (c.allocated || 0), 0)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...GRAY)
  doc.text(
    `Total Budget: ${fmt(state.budget.totalBudget)}   ·   Allocated: ${fmt(totalAllocated)}   ·   Spent: ${fmt(totalSpent)}   ·   Remaining: ${fmt(state.budget.totalBudget - totalSpent)}`,
    14, y
  )
  y += 6

  autoTable(doc, {
    startY: y,
    head: [['Category', 'Allocated', 'Spent', 'Remaining', 'Used %']],
    body: state.budget.categories.map(c => {
      const spent = c.spent || 0
      const rem   = (c.allocated || 0) - spent
      const pct   = c.allocated ? Math.round((spent / c.allocated) * 100) : 0
      return [c.name, fmt(c.allocated), fmt(spent), fmt(rem), `${pct}%`]
    }),
    foot: [['TOTAL', fmt(totalAllocated), fmt(totalSpent), fmt(totalAllocated - totalSpent), '']],
    headStyles: { fillColor: DARK, textColor: GOLD, fontStyle: 'bold', fontSize: 8 },
    footStyles: { fillColor: [30, 20, 50], textColor: GOLD, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 8, textColor: [50, 40, 70] },
    alternateRowStyles: { fillColor: [248, 245, 255] },
    margin: { left: 14, right: 14 },
  })
  y = doc.lastAutoTable.finalY + 10

  // ── VENDORS ─────────────────────────────────────────────────────────────────
  if (y > 220) { doc.addPage(); addHeader(doc, W); y = 44 }
  y = sectionTitle(doc, 'Vendors', y)

  const filledVendors = state.vendors.filter(v => v.name)
  autoTable(doc, {
    startY: y,
    head: [['Category', 'Name', 'Contact', 'Amount', 'Status']],
    body: filledVendors.map(v => [
      v.category || '—',
      v.name || '—',
      v.contact || '—',
      fmt(v.amount),
      statusLabel(v.status),
    ]),
    headStyles: { fillColor: DARK, textColor: GOLD, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 8, textColor: [50, 40, 70] },
    alternateRowStyles: { fillColor: [248, 245, 255] },
    margin: { left: 14, right: 14 },
  })
  y = doc.lastAutoTable.finalY + 10

  // ── SCHEDULE ────────────────────────────────────────────────────────────────
  if (y > 220) { doc.addPage(); addHeader(doc, W); y = 44 }
  y = sectionTitle(doc, 'Event Schedule', y)

  const days = [
    { label: 'Day 1 — 11 February 2027 (Srimant Pujan)', events: state.schedule.feb11 },
    { label: 'Day 2 — 12 February 2027 (Vivah Sohala)',  events: state.schedule.feb12 },
  ]

  days.forEach(({ label, events }) => {
    if (y > 240) { doc.addPage(); addHeader(doc, W); y = 44 }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...PURPLE)
    doc.text(label, 14, y)
    y += 2

    autoTable(doc, {
      startY: y,
      head: [['Time', 'Event', 'Marathi', 'Notes']],
      body: (events || []).map(e => [e.time || '—', e.title || '—', e.subtitle || '', e.description || '']),
      headStyles: { fillColor: DARK, textColor: GOLD, fontStyle: 'bold', fontSize: 8 },
      bodyStyles: { fontSize: 8, textColor: [50, 40, 70] },
      alternateRowStyles: { fillColor: [248, 245, 255] },
      columnStyles: {
        0: { cellWidth: 22 },
        1: { cellWidth: 55 },
        2: { cellWidth: 45 },
        3: { cellWidth: 60 },
      },
      margin: { left: 14, right: 14 },
    })
    y = doc.lastAutoTable.finalY + 8
  })

  // ── FOOTER on each page ──────────────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    const ph = doc.internal.pageSize.getHeight()
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...GRAY)
    doc.text(`Pranav & Renuka Wedding — 12 Feb 2027`, 14, ph - 6)
    doc.text(`Page ${i} of ${pageCount}`, W - 14, ph - 6, { align: 'right' })
  }

  doc.save('pranav-renuka-wedding.pdf')
}
