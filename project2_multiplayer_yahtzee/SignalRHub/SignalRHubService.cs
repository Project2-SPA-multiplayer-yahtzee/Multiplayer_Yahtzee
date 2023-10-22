using Microsoft.AspNetCore.SignalR;

namespace project2_multiplayer_yahtzee.SignalRHub
{
    public class SignalRHubService : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task GenerateRandomNumber()
        {
            Random rand = new Random();
            int randomNumber = rand.Next(1, 4); // Generates a random number between 1 and 3
            await Clients.All.SendAsync("ReceiveRandomNumber", randomNumber);
        }

        public async Task DiceRolls(int[] roll)
        {
            Random rand = new Random();
            int[] newRolls = new int[5];

            for (int i = 0; i < newRolls.Length; i++)
            {
                newRolls[i] = rand.Next(1, 7);
            }
            await Clients.All.SendAsync("RecieveRoll", newRolls);
        }
        public async Task UpdateScore(string category, int score)
        {
            // Handle the score update here.
            // You can update the game state, check for valid moves, and notify other clients.

            // For demonstration purposes, we'll just broadcast the updated score to all clients.
            await Clients.All.SendAsync("ScoreUpdated", category, score);
        }
        public async Task JoinLobby()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "GameLobby");
        }

        public async Task NotifyGameUpdate(string message)
        {
            await Clients.Group("GameLobby").SendAsync("ReceiveGameUpdate", message);
        }
    }
}
