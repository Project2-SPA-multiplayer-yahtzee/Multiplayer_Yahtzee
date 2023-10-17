using Microsoft.AspNetCore.SignalR;

namespace project2_multiplayer_yahtzee.ChatHub
{
    public class ChatHubService : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task DiceRolls(int roll)
        {
            await Clients.All.SendAsync("RecieveRoll", roll);
        }
    }
}
