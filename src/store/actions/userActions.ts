import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginForm } from '../../models/LoginForm';
import type { User } from '../../models/User';
import type { ApiResponse } from '../../models/ApiResponse';
import { AuthService } from '../../services/auth.service';
import { getApiError } from '../../utils/apiUtils';
import type { AuthData } from '../../models/AuthData';

const setAuthError = createAction<boolean>('setAuthError');

const authenticate = createAsyncThunk<
  ApiResponse<AuthData>,
  void,
  { rejectValue: ApiResponse<AuthData> }
>('authenticate', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.authenticate();
    return response;
  } catch (err: unknown) {
    return rejectWithValue(getApiError(err) as ApiResponse<AuthData>);
  }
});

const login = createAsyncThunk<
  ApiResponse<AuthData>,
  LoginForm,
  { rejectValue: ApiResponse<AuthData> }
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
    return rejectWithValue(getApiError(error) as ApiResponse<AuthData>);
  }
});

const register = createAsyncThunk<
  ApiResponse<AuthData>,
  User,
  { rejectValue: ApiResponse<AuthData> }
>('register', async (user: User, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(user);
    return response;
  } catch (error) {
    return rejectWithValue(getApiError(error) as ApiResponse<AuthData>);
  }
});

const logout = createAction('logout', () => {
  AuthService.logout();
  return { payload: null };
});

export { setAuthError, authenticate, login, register, logout };
