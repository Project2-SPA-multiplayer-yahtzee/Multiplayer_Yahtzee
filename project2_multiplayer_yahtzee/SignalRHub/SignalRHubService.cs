using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Linq;
using System.Collections.Concurrent;

namespace project2_multiplayer_yahtzee.SignalRHub
{
    public class SignalRHubService : Hub
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SignalRHubService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public static ConcurrentDictionary<string, int> playerChoices = new ConcurrentDictionary<string, int>();
        public static ConcurrentDictionary<string, string> playerConnection = new ConcurrentDictionary<string, string>();
        public static int playerOneScore = 0;
        public static int playerTwoScore = 0;
        public async Task ManagePoints(string id, int choice, string userName)
        {

            playerChoices[id] = choice;
            playerConnection[id] = userName;


            // Check if both players have made their choices
            if (playerChoices.Count == 2)
            {
                List<string> playerChoiceList = playerChoices.Keys.ToList();
                List<string> playerNameList = playerConnection.Values.ToList();
                string results = "";

                // Determine the winner...
                string winner = DetermineWinner(playerChoices.Values.ToList(), playerChoices.Keys.ToList());

                if (winner == playerChoiceList[0] && playerOneScore < 2 )
                {
                    results = playerNameList[0] + "Won the round";
                    playerOneScore++;

                }
                else if (winner == playerChoiceList[1] && playerTwoScore < 2)
                {
                    results = playerNameList[1] + "Won the round";
                    playerTwoScore++;
                }

                else if (winner == playerChoiceList[0] && playerOneScore == 2 )
                {
                    results = playerNameList[0] + "Won the game";
                    playerOneScore = 0;
                    playerTwoScore = 0;
                }
                else if (winner == playerChoiceList[1] && playerTwoScore == 2)
                {
                    results = playerNameList[1] + "Won the game";
                    playerOneScore = 0;
                    playerTwoScore = 0;
                }
                else
                {
                    results = "Draw";
                }


                // Send the result to the clients
                await Clients.All.SendAsync("RecievePointNumber", results);

                // Clear the choices for the next round
                playerChoices.Clear();
            }
        }

        private string DetermineWinner(List<int> choices, List<string> id)
        {
            string winner = "";
            // 1 is rock, 2 is paper, 3 is scissors
            switch (choices[0], choices[1])
            {
                case (1, 1):
                case (2, 2):
                case (3, 3):
                    Console.WriteLine("Draw");
                    break;

                case (1, 2):
                case (2, 3):
                case (3, 1):
                    Console.WriteLine("Winner: 2");
                    Console.WriteLine("---");
                    winner = id[1];
                    break;
                case (1, 3):
                case (2, 1):
                case (3, 2):
                    winner = id[0];
                    break;
                default:
                    Console.WriteLine("Invalid values");
                    break;
            }

            return winner;
        }
    }
}
