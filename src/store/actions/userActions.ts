import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginForm } from '../../models/LoginForm';
import { ApiService } from '../../services/api.service';
import type { User } from '../../models/User';
import type { ApiResponse } from '../../models/ApiResponse';
import { AuthService } from '../../services/auth.service';
import { getApiError } from '../../utils/apiUtils';

interface LikeResponse {
  totalLikes: number;
  itineraryId: string;
}

const setAuthError = createAction<boolean>('setAuthError');

const authenticate = createAsyncThunk<
  ApiResponse<User>,
  void,
  { rejectValue: ApiResponse<User> }
>('authenticate', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.authenticate();
    return response;
  } catch (err: unknown) {
    return rejectWithValue(getApiError(err) as ApiResponse<User>);
  }
});

const login = createAsyncThunk<
  ApiResponse<User>,
  LoginForm,
  { rejectValue: ApiResponse<User> }
>('login', async (payload: LoginForm, { rejectWithValue }) => {
  // 'rejectWithValue' es una funcion que se pasa como tercer argumento a createAsyncThunk
  // y se usa para devolver un valor personalizado en el estado de la promesa si la promesa es rechazada
  try {
    const response = await AuthService.login(payload.email, payload.password);
    return response;
  } catch (error) {
    // Si se devuelve (return) un  objeto en el catch, el estado de la promesa pasa a ser
    // 'fulfilled' (aun dentro del catch) y se puede obtener en el reducer con action.payload
    // Si lanza throw(error), el estado de la promesa pasa a ser 'rejected' automaticamente
    // En un componente por ej se usa: dispatch(login()).then((res)=>{})
    // res.payload es undefined si se lanzo throw(error) y res.payload es el objeto que se devuelve
    // en el return del catch si se devuelve un objeto
    return rejectWithValue(getApiError(error) as ApiResponse<User>);
  }
});

const register = createAsyncThunk<
  ApiResponse<User>,
  User,
  { rejectValue: ApiResponse<User> }
>('register', async (user: User, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(user);
    return response;
  } catch (error) {
    return rejectWithValue(getApiError(error) as ApiResponse<User>);
  }
});

const logout = createAction('logout', () => {
  AuthService.logout();
  return { payload: null };
});

const addFavouriteItinerary = createAsyncThunk<
  ApiResponse<LikeResponse>,
  { postId: string },
  { rejectValue: ApiResponse<LikeResponse> }
>(
  'addFavouriteItinerary',
  async (payload: { postId: string }, { rejectWithValue }) => {
    try {
      const response = await ApiService.postData<LikeResponse>(
        '/itinerary/like/' + payload.postId
      );
      return response;
    } catch (error) {
      return rejectWithValue(getApiError(error) as ApiResponse<LikeResponse>);
    }
  }
);

const removeFavouriteItinerary = createAsyncThunk<
  ApiResponse<LikeResponse>,
  { postId: string },
  { rejectValue: ApiResponse<LikeResponse> }
>(
  'removeFavouriteItinerary',
  async (payload: { postId: string }, { rejectWithValue }) => {
    try {
      const response = await ApiService.deleteData<LikeResponse>(
        '/itinerary/dislike/' + payload.postId
      );
      return response;
    } catch (error) {
      return rejectWithValue(getApiError(error) as ApiResponse<LikeResponse>);
    }
  }
);

export {
  setAuthError,
  authenticate,
  login,
  register,
  logout,
  addFavouriteItinerary,
  removeFavouriteItinerary,
};
