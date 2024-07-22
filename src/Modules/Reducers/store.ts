import {configureStore} from '@reduxjs/toolkit';
import AppReducer from './app';
import MemberReducer from './member';

import {
  useDispatch as useAppDispatch,
  useSelector as AppSelector,
  TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    app: AppReducer,
    member: MemberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = AppSelector;
