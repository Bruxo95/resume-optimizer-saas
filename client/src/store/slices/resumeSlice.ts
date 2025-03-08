import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
interface Resume {
  _id: string;
  title: string;
  country: string;
  language: string;
  originalContent: string;
  optimizedContent?: string;
  parsedData?: any;
  aiSuggestions?: any[];
  atsScore?: number;
  keywordMatches?: any[];
  fileUrl?: string;
  fileType?: string;
  status: 'draft' | 'optimizing' | 'optimized' | 'exported';
  template: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ResumeState {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface CreateResumeData {
  title: string;
  country: string;
  language: string;
  originalContent: string;
  template?: string;
}

interface UpdateResumeData {
  id: string;
  title?: string;
  country?: string;
  language?: string;
  originalContent?: string;
  template?: string;
  isPublic?: boolean;
}

// Initial state
const initialState: ResumeState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
  success: false,
};

// Async thunks
export const getResumes = createAsyncThunk(
  'resume/getResumes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/resumes');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch resumes'
      );
    }
  }
);

export const getResume = createAsyncThunk(
  'resume/getResume',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/resumes/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch resume'
      );
    }
  }
);

export const createResume = createAsyncThunk(
  'resume/createResume',
  async (resumeData: CreateResumeData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/resumes', resumeData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create resume'
      );
    }
  }
);

export const updateResume = createAsyncThunk(
  'resume/updateResume',
  async (resumeData: UpdateResumeData, { rejectWithValue }) => {
    try {
      const { id, ...data } = resumeData;
      const response = await axios.put(`/api/resumes/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update resume'
      );
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resume/deleteResume',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/resumes/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete resume'
      );
    }
  }
);

export const optimizeResume = createAsyncThunk(
  'resume/optimizeResume',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/resumes/${id}/optimize`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to optimize resume'
      );
    }
  }
);

export const applySuggestion = createAsyncThunk(
  'resume/applySuggestion',
  async (
    { resumeId, suggestionId }: { resumeId: string; suggestionId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `/api/resumes/${resumeId}/suggestions/${suggestionId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to apply suggestion'
      );
    }
  }
);

export const exportResume = createAsyncThunk(
  'resume/exportResume',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/resumes/${id}/export`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to export resume'
      );
    }
  }
);

// Slice
const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    clearResumeError: (state) => {
      state.error = null;
    },
    clearResumeSuccess: (state) => {
      state.success = false;
    },
    clearCurrentResume: (state) => {
      state.currentResume = null;
    },
  },
  extraReducers: (builder) => {
    // Get Resumes
    builder
      .addCase(getResumes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResumes.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.resumes = action.payload.data;
      })
      .addCase(getResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Resume
    builder
      .addCase(getResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResume.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentResume = action.payload.data;
      })
      .addCase(getResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Resume
    builder
      .addCase(createResume.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createResume.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.resumes.unshift(action.payload.data);
        state.currentResume = action.payload.data;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Resume
    builder
      .addCase(updateResume.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateResume.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.currentResume = action.payload.data;
        
        // Update in resumes array
        const index = state.resumes.findIndex(
          (resume) => resume._id === action.payload.data._id
        );
        if (index !== -1) {
          state.resumes[index] = action.payload.data;
        }
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Resume
    builder
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResume.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.resumes = state.resumes.filter(
          (resume) => resume._id !== action.payload
        );
        if (state.currentResume && state.currentResume._id === action.payload) {
          state.currentResume = null;
        }
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Optimize Resume
    builder
      .addCase(optimizeResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(optimizeResume.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentResume = action.payload.data;
        
        // Update in resumes array
        const index = state.resumes.findIndex(
          (resume) => resume._id === action.payload.data._id
        );
        if (index !== -1) {
          state.resumes[index] = action.payload.data;
        }
      })
      .addCase(optimizeResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Apply Suggestion
    builder
      .addCase(applySuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applySuggestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentResume = action.payload.data;
        
        // Update in resumes array
        const index = state.resumes.findIndex(
          (resume) => resume._id === action.payload.data._id
        );
        if (index !== -1) {
          state.resumes[index] = action.payload.data;
        }
      })
      .addCase(applySuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Export Resume
    builder
      .addCase(exportResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportResume.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        
        // Update current resume if it matches
        if (
          state.currentResume &&
          state.currentResume._id === action.payload.data.resumeId
        ) {
          state.currentResume.status = 'exported';
        }
        
        // Update in resumes array
        const index = state.resumes.findIndex(
          (resume) => resume._id === action.payload.data.resumeId
        );
        if (index !== -1) {
          state.resumes[index].status = 'exported';
        }
      })
      .addCase(exportResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearResumeError, clearResumeSuccess, clearCurrentResume } =
  resumeSlice.actions;

export default resumeSlice.reducer;
