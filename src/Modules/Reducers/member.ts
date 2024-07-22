import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface PROFILE_DATA {
  NAME: '';
  EMAIL: '';
  MOBILE_NUMBER: '';
  PASSWORD: '';
}
interface AppState {
  member: PROFILE_DATA;
}

const initialState: AppState = {
  member: {
    NAME: '',
    EMAIL: '',
    MOBILE_NUMBER: '',
    PASSWORD: '',
  },
};

export const AppSlice = createSlice({
  name: 'Member',
  initialState,
  reducers: {
    setMember: (
      state,
      action: PayloadAction<{
        member: PROFILE_DATA;
      }>,
    ) => {
      state.member = action.payload.member;
    },
  },
});

export const {setMember} = AppSlice.actions;

export default AppSlice.reducer;
