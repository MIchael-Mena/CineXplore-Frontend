import { createReducer } from '@reduxjs/toolkit';
import type { User } from '../../models/User';
import {
  authenticate,
  login,
  logout,
  register,
  setAuthError,
} from '../actions/userActions';
import type { ApiResponse } from '../../models/ApiResponse';
import type { AuthData } from '../../models/AuthData';

const defaultUser: User = {
  id: '',
  username: '',
  email: '',
  country: null,
  birthDate: null, // formato LocalDate (YYYY-MM-DD)
  roles: [],
  avatarUrl: '',
};

interface UserState {
  user: User;
  isLogged: boolean;
  authError: boolean;
}

const initialState: UserState = {
  isLogged: false,
  user: defaultUser,
  authError: false,
};

const handleAuthenticationSuccess = (
  _state: UserState,
  payload: ApiResponse<AuthData>
) => {
  return {
    authError: false,
    user: payload.data?.user ?? defaultUser,
    isLogged: true,
  };
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthError, (state, action) => {
      state.authError = action.payload;
    })

    .addCase(login.fulfilled, (state, action) =>
      handleAuthenticationSuccess(state, action.payload)
    )
    .addCase(login.rejected, (state) => {
      state.authError = true;
      state.isLogged = false;
      state.user = defaultUser;
    })
    .addCase(register.fulfilled, (state, action) =>
      handleAuthenticationSuccess(state, action.payload)
    )

    .addCase(authenticate.fulfilled, (state, action) =>
      handleAuthenticationSuccess(state, action.payload)
    )
    .addCase(authenticate.rejected, () => initialState)

    .addCase(logout, () => initialState);
});

export default userReducer;
