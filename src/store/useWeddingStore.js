import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialData } from '../data/initialData'

const useWeddingStore = create(
  persist(
    (set, get) => ({
      ...initialData,
      editMode: false,

      // ─── Edit mode ───────────────────────────────────────────────────────────
      toggleEditMode: () => set(s => ({ editMode: !s.editMode })),

      // ─── Guests ──────────────────────────────────────────────────────────────
      addGuest: (side, guest) =>
        set(s => ({
          guests: {
            ...s.guests,
            [side]: [...s.guests[side], { ...guest, id: crypto.randomUUID() }],
          },
        })),

      updateGuest: (side, id, patch) =>
        set(s => ({
          guests: {
            ...s.guests,
            [side]: s.guests[side].map(g => (g.id === id ? { ...g, ...patch } : g)),
          },
        })),

      deleteGuest: (side, id) =>
        set(s => ({
          guests: {
            ...s.guests,
            [side]: s.guests[side].filter(g => g.id !== id),
          },
        })),

      // ─── Tasks ───────────────────────────────────────────────────────────────
      addTask: task =>
        set(s => ({
          tasks: [...s.tasks, { ...task, id: crypto.randomUUID(), completed: false }],
        })),

      toggleTask: id =>
        set(s => ({
          tasks: s.tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
        })),

      updateTask: (id, patch) =>
        set(s => ({
          tasks: s.tasks.map(t => (t.id === id ? { ...t, ...patch } : t)),
        })),

      deleteTask: id =>
        set(s => ({ tasks: s.tasks.filter(t => t.id !== id) })),

      // ─── Budget ──────────────────────────────────────────────────────────────
      setTotalBudget: amount =>
        set(s => ({ budget: { ...s.budget, totalBudget: amount } })),

      updateBudgetCategory: (id, patch) =>
        set(s => ({
          budget: {
            ...s.budget,
            categories: s.budget.categories.map(c => (c.id === id ? { ...c, ...patch } : c)),
          },
        })),

      addBudgetCategory: category =>
        set(s => ({
          budget: {
            ...s.budget,
            categories: [...s.budget.categories, { ...category, id: crypto.randomUUID(), spent: 0 }],
          },
        })),

      deleteBudgetCategory: id =>
        set(s => ({
          budget: {
            ...s.budget,
            categories: s.budget.categories.filter(c => c.id !== id),
          },
        })),

      // ─── Vendors ─────────────────────────────────────────────────────────────
      addVendor: vendor =>
        set(s => ({ vendors: [...s.vendors, { ...vendor, id: crypto.randomUUID() }] })),

      updateVendor: (id, patch) =>
        set(s => ({ vendors: s.vendors.map(v => (v.id === id ? { ...v, ...patch } : v)) })),

      deleteVendor: id =>
        set(s => ({ vendors: s.vendors.filter(v => v.id !== id) })),

      // ─── Schedule ────────────────────────────────────────────────────────────
      addScheduleEvent: (day, event) =>
        set(s => ({
          schedule: {
            ...s.schedule,
            [day]: [...s.schedule[day], { ...event, id: crypto.randomUUID() }],
          },
        })),

      updateScheduleEvent: (day, id, patch) =>
        set(s => ({
          schedule: {
            ...s.schedule,
            [day]: s.schedule[day].map(e => (e.id === id ? { ...e, ...patch } : e)),
          },
        })),

      deleteScheduleEvent: (day, id) =>
        set(s => ({
          schedule: {
            ...s.schedule,
            [day]: s.schedule[day].filter(e => e.id !== id),
          },
        })),

      // ─── Venue ───────────────────────────────────────────────────────────────
      updateVenue: patch =>
        set(s => ({ venue: { ...s.venue, ...patch } })),

      // ─── Data import/export ──────────────────────────────────────────────────
      exportData: () => {
        const state = get()
        const exportable = {
          guests: state.guests,
          tasks: state.tasks,
          budget: state.budget,
          vendors: state.vendors,
          schedule: state.schedule,
          venue: state.venue,
          exportedAt: new Date().toISOString(),
          version: '1.0',
        }
        return JSON.stringify(exportable, null, 2)
      },

      importData: jsonString => {
        try {
          const data = JSON.parse(jsonString)
          set({
            guests: data.guests ?? initialData.guests,
            tasks: data.tasks ?? initialData.tasks,
            budget: data.budget ?? initialData.budget,
            vendors: data.vendors ?? initialData.vendors,
            schedule: data.schedule ?? initialData.schedule,
            venue: data.venue ?? initialData.venue,
          })
          return true
        } catch {
          return false
        }
      },

      resetToDefaults: () => set({ ...initialData }),

      // ─── Firebase sync ───────────────────────────────────────────────────────
      setRemoteData: data =>
        set({
          guests:   data.guests   ?? undefined,
          tasks:    data.tasks    ?? undefined,
          budget:   data.budget   ?? undefined,
          vendors:  data.vendors  ?? undefined,
          schedule: data.schedule ?? undefined,
          venue:    data.venue    ?? undefined,
        }),
    }),
    {
      name: 'prenuka_wedding_data',
      version: 1,
      partialize: state => ({
        guests: state.guests,
        tasks: state.tasks,
        budget: state.budget,
        vendors: state.vendors,
        schedule: state.schedule,
        venue: state.venue,
      }),
    }
  )
)

export default useWeddingStore
