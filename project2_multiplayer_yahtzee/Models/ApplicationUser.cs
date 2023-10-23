using Microsoft.AspNetCore.Identity;

namespace project2_multiplayer_yahtzee.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int GamesPlayed { get; set; }
        public int GamesWon { get; set; }
    }
}