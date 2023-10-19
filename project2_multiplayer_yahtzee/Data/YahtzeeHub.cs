using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class YahtzeeHub : Hub
{
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