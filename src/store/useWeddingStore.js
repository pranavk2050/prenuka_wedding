import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialData } from '../data/initialData'
import { getUserName } from '../hooks/useUserName'

function makeEntry(message) {
  return { id: crypto.randomUUID(), user: getUserName(), message, at: Date.now() }
}

function appendLog(log, entry) {
  return [entry, ...log].slice(0, 50)
}

const useWeddingStore = create(
  persist(
    (set, get) => ({
      ...initialData,
      activityLog: [],
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
          activityLog: appendLog(s.activityLog, makeEntry(
            `Added ${guest.name} to ${side === 'groomSide' ? "Pranav's" : "Renuka's"} guest list`
          )),
        })),

      updateGuest: (side, id, patch) =>
        set(s => ({
          guests: {
            ...s.guests,
            [side]: s.guests[side].map(g => (g.id === id ? { ...g, ...patch } : g)),
          },
        })),

      deleteGuest: (side, id) =>
        set(s => {
          const guest = s.guests[side].find(g => g.id === id)
          return {
            guests: {
              ...s.guests,
              [side]: s.guests[side].filter(g => g.id !== id),
            },
            activityLog: appendLog(s.activityLog, makeEntry(
              `Removed ${guest?.name ?? 'a guest'} from ${side === 'groomSide' ? "Pranav's" : "Renuka's"} guest list`
            )),
          }
        }),

      // ─── Tasks ───────────────────────────────────────────────────────────────
      addTask: task =>
        set(s => ({
          tasks: [...s.tasks, { ...task, id: crypto.randomUUID(), completed: false }],
        })),

      toggleTask: id =>
        set(s => {
          const task = s.tasks.find(t => t.id === id)
          const nowDone = !task?.completed
          return {
            tasks: s.tasks.map(t => (t.id === id ? { ...t, completed: nowDone } : t)),
            activityLog: appendLog(s.activityLog, makeEntry(
              `${nowDone ? 'Completed' : 'Reopened'} task: ${task?.title ?? 'a task'}`
            )),
          }
        }),

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
        set(s => ({
          vendors: [...s.vendors, { ...vendor, id: crypto.randomUUID() }],
          activityLog: appendLog(s.activityLog, makeEntry(
            `Added vendor: ${vendor.name} (${vendor.category})`
          )),
        })),

      updateVendor: (id, patch) =>
        set(s => {
          const vendor = s.vendors.find(v => v.id === id)
          const statusChanged = patch.status && patch.status !== vendor?.status
          return {
            vendors: s.vendors.map(v => (v.id === id ? { ...v, ...patch } : v)),
            activityLog: statusChanged
              ? appendLog(s.activityLog, makeEntry(
                  `Updated ${vendor?.name ?? 'vendor'} status to ${patch.status.replace('_', ' ')}`
                ))
              : s.activityLog,
          }
        }),

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
          guests:      data.guests      ?? undefined,
          tasks:       data.tasks       ?? undefined,
          budget:      data.budget      ?? undefined,
          vendors:     data.vendors     ?? undefined,
          schedule:    data.schedule    ?? undefined,
          venue:       data.venue       ?? undefined,
          activityLog: data.activityLog ?? undefined,
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
        activityLog: state.activityLog,
      }),
    }
  )
)

export default useWeddingStore
