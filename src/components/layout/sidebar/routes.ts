import Dashboard from '@assets/icons/barsDashboard.svg'
import AccountBox from '@mui/icons-material/AccountBox'
import SetMeal from '@mui/icons-material/SetMeal'
import RequestPage from '@mui/icons-material/RequestPage'
import FoodBankIcon from '@mui/icons-material/FoodBank'
import MonitorWeight from '@mui/icons-material/MonitorWeight'
import Person from '@mui/icons-material/Person'
import FitnessCenter from '@mui/icons-material/FitnessCenter'
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics'
import FactCheck from '@mui/icons-material/FactCheck'
import Poll from '@mui/icons-material/Poll'
import { RawRoute } from '@schemas/routes'
import { LocalDining, Groups, FoodBankTwoTone } from '@mui/icons-material'

export const ROUTES_ATHLETE: RawRoute[] = [
  {
    name: 'Dashboard',
    to: 'dashboard',
    groupIcon: Dashboard,
  },
  {
    name: 'Mi Perfil',
    to: 'profile',
    groupIcon: AccountBox,
  },
  {
    name: 'Profesionales',
    to: 'profesionales',
    groupIcon: SetMeal,
  },
  {
    name: 'Alimentos',
    to: 'alimentos',
    groupIcon: LocalDining,
  },
  {
    name: 'Registro de comidas',
    to: 'registroComidas',
    groupIcon: FoodBankIcon,
  },
  {
    name: 'Planes de Dieta',
    to: 'dietas',
    groupIcon: FoodBankTwoTone,
  },
  {
    name: 'Ejercicios',
    to: 'ejercicios',
    groupIcon: FitnessCenter,
  },
  {
    name: 'Registro de Actividades',
    to: 'registroActividades',
    groupIcon: SportsGymnasticsIcon,
  },
  {
    name: 'Rutinas',
    to: 'rutinas',
    groupIcon: FactCheck,
  },
  {
    name: 'Registro de peso',
    to: 'registroPeso',
    groupIcon: MonitorWeight,
  },
  {
    name: 'Progreso',
    to: 'progreso',
    groupIcon: Poll,
  },
]

export const ROUTES_NUTRICIONIST: RawRoute[] = [
  {
    name: 'Dashboard',
    to: 'nutricionista/dashboard',
    groupIcon: Dashboard,
  },
  {
    name: 'Mi Perfil',
    to: 'profile',
    groupIcon: AccountBox,
  },
  {
    name: 'Solicitudes',
    to: 'nutricionista/requests',
    groupIcon: RequestPage,
  },
  {
    name: 'Atletas',
    to: 'nutricionista/gestion_atletas',
    groupIcon: Person,
  },
  {
    name: 'Grupos',
    to: 'nutricionista/gestion_grupos',
    groupIcon: Groups,
  },
]

export const ROUTES_TRAINER: RawRoute[] = [
  {
    name: 'Dashboard',
    to: 'entrenador/dashboard',
    groupIcon: Dashboard,
  },
  {
    name: 'Mi Perfil',
    to: 'profile',
    groupIcon: AccountBox,
  },
  {
    name: 'Solicitudes',
    to: 'entrenador/requests',
    groupIcon: RequestPage,
  },
  {
    name: 'Atletas',
    to: 'entrenador/gestion_atletas',
    groupIcon: Person,
  },
  {
    name: 'Grupos',
    to: 'entrenador/gestion_grupos',
    groupIcon: Groups,
  },
]
