
    public class Game
    {
    public int Id { get; set; }
        public string Name { get; set; }
        public bool Started { get; set; } = false;

    // Navigation property representing the players in the game.
        public ICollection<PlayerGame>? PlayerGames { get; set; }
    }

