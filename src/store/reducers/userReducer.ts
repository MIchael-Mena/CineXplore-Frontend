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
import type { Comment } from '../../models/Comment';

const defaultUser: User = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  profilePic: '',
  country: '',
  birthDate: '',
  comments: [] as Comment[],
  favouritesCities: [],
  favouriteActivities: [],
  favouriteItineraries: [],
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
  payload: ApiResponse<User>
) => {
  return {
    authError: false,
    user: payload.data ?? defaultUser,
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
