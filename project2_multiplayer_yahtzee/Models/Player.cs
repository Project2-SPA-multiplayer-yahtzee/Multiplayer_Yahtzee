using Microsoft.AspNetCore.Identity;
using project2_multiplayer_yahtzee.Models;

public class Player : IdentityUser
{
    public int Score { get; set; }

    // Navigation property representing the games the player is a part of.
    public ICollection<PlayerGame> Games { get; set; }
}
