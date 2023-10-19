
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Started { get; set; } = false;

        // Foreign key for the player who owns or hosts the game.
        public string HostPlayerId { get; set; }
        public Player HostPlayer { get; set; }

        // Maximum number of players allowed in the game.
        public int MaxPlayers { get; set; } = 2;

        // Navigation property representing the players in the game.
        public ICollection<PlayerGame> PlayerGames { get; set; }
    }

