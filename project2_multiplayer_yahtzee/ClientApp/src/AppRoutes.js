import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Leaderboard } from "./components/Leaderboard";
import { CreateLobby } from "./components/CreateLobby";
import { JoinLobby } from "./components/JoinLobby";
import { Rules } from "./components/Rules";
import { Home } from "./components/Home";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />
  },
  {
    path: '/createlobby',
    element: <CreateLobby />
   },
   {
     path: '/joinlobby',
     element: <JoinLobby />
   },
   {
     path: '/rules',
     element: <Rules />
   },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
