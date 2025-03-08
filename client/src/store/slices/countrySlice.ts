import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
interface Country {
  code: string;
  name: string;
  languages: {
    code: string;
    name: string;
    isDefault: boolean;
  }[];
  resumeStandards?: any;
  commonTemplates?: any[];
  recommendedSections?: any[];
  atsKeywords?: any[];
  culturalNotes?: any[];
  active: boolean;
}

interface CountryState {
  countries: Country[];
  currentCountry: Country | null;
  countryStandards: any | null;
  countryTemplates: any[] | null;
  countryKeywords: any[] | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CountryState = {
  countries: [],
  currentCountry: null,
  countryStandards: null,
  countryTemplates: null,
  countryKeywords: null,
  loading: false,
  error: null,
};

// Async thunks
export const getCountries = createAsyncThunk(
  'country/getCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/countries');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch countries'
      );
    }
  }
);

export const getCountry = createAsyncThunk(
  'country/getCountry',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/countries/${code}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch country'
      );
    }
  }
);

export const getCountryStandards = createAsyncThunk(
  'country/getCountryStandards',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/countries/${code}/standards`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch country standards'
      );
    }
  }
);

export const getCountryTemplates = createAsyncThunk(
  'country/getCountryTemplates',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/countries/${code}/templates`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch country templates'
      );
    }
  }
);

export const getCountryKeywords = createAsyncThunk(
  'country/getCountryKeywords',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/countries/${code}/keywords`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch country keywords'
      );
    }
  }
);

// Slice
const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    clearCountryError: (state) => {
      state.error = null;
    },
    clearCurrentCountry: (state) => {
      state.currentCountry = null;
      state.countryStandards = null;
      state.countryTemplates = null;
      state.countryKeywords = null;
    },
  },
  extraReducers: (builder) => {
    // Get Countries
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountries.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.countries = action.payload.data;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Country
    builder
      .addCase(getCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountry.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentCountry = action.payload.data;
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Country Standards
    builder
      .addCase(getCountryStandards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCountryStandards.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.countryStandards = action.payload.data;
        }
      )
      .addCase(getCountryStandards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Country Templates
    builder
      .addCase(getCountryTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCountryTemplates.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.countryTemplates = action.payload.data;
        }
      )
      .addCase(getCountryTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Country Keywords
    builder
      .addCase(getCountryKeywords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCountryKeywords.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.countryKeywords = action.payload.data;
        }
      )
      .addCase(getCountryKeywords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCountryError, clearCurrentCountry } = countrySlice.actions;

export default countrySlice.reducer;
