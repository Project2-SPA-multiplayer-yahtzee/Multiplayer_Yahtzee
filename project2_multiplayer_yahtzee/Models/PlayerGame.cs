using project2_multiplayer_yahtzee.Models;

public class PlayerGame
{
    public int Id { get; set; }
    public int PlayerId { get; set; }
    public Player Player { get; set; }

    public int GameId { get; set; }
    public Game Game { get; set; }

    public int RollCount { get; set; }
}
