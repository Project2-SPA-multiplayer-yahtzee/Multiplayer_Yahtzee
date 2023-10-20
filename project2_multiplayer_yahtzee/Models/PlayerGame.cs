using project2_multiplayer_yahtzee.Models;

public class PlayerGame
{
    public int Id { get; set; }
    public string PlayerId { get; set; }
    public ApplicationUser Player { get; set; }

    public int GameId { get; set; }
    public Game Game { get; set; }
    public int Score { get; set; }
}
