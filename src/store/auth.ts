import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      setToken: (token: string) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'auth-token-storage',
    },
  ),
)

export default useAuthStore
