import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface Alert {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timeout?: number;
}

interface Modal {
  id: string;
  type: string;
  props?: any;
}

interface UIState {
  alerts: Alert[];
  modals: Modal[];
  darkMode: boolean;
  sidebarOpen: boolean;
  loading: {
    [key: string]: boolean;
  };
}

// Initial state
const initialState: UIState = {
  alerts: [],
  modals: [],
  darkMode: localStorage.getItem('darkMode') === 'true',
  sidebarOpen: true,
  loading: {},
};

// Slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Alert actions
    addAlert: (state, action: PayloadAction<Omit<Alert, 'id'>>) => {
      const id = Date.now().toString();
      state.alerts.push({
        id,
        ...action.payload,
      });
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },

    // Modal actions
    openModal: (state, action: PayloadAction<Omit<Modal, 'id'>>) => {
      const id = Date.now().toString();
      state.modals.push({
        id,
        ...action.payload,
      });
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter((modal) => modal.id !== action.payload);
    },
    closeAllModals: (state) => {
      state.modals = [];
    },

    // Theme actions
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString());
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', state.darkMode.toString());
    },

    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    // Loading actions
    setLoading: (
      state,
      action: PayloadAction<{ key: string; isLoading: boolean }>
    ) => {
      state.loading[action.payload.key] = action.payload.isLoading;
    },
    clearLoading: (state) => {
      state.loading = {};
    },
  },
});

export const {
  addAlert,
  removeAlert,
  clearAlerts,
  openModal,
  closeModal,
  closeAllModals,
  toggleDarkMode,
  setDarkMode,
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  clearLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
