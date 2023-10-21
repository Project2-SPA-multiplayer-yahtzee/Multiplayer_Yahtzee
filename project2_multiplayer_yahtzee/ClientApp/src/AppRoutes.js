import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Leaderboard } from "./components/General-Layout/Leaderboard";
import GameLobby from "./components/Game/GameLobby";
import GameRoom from "./components/Game/GameRoom";
import { Rules } from "./components/General-Layout/Rules";
import { Home } from "./components/General-Layout/Home";


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
    path: '/gamelobby',
    element: <GameLobby />
  },
  {
    path: '/rules',
    element: <Rules />
  },
  {
    path: '/gameroom/:gameId',
    element: <GameRoom />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
