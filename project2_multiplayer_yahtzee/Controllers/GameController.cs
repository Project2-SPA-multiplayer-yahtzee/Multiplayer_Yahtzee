using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project2_multiplayer_yahtzee.Data;
using project2_multiplayer_yahtzee.Models;
using System.Linq;

namespace project2_multiplayer_yahtzee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<Player> _userManager;

        public GameController(ApplicationDbContext context, UserManager<Player> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized();
            }

            var games = await _context.Games
                .Where(g => g.HostPlayerId == user.Id)
                .ToListAsync();

            return Ok(games);
        }

        [HttpPost]
        public async Task<ActionResult<Game>> CreateGame(Game game)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized();
            }

            game.HostPlayerId = user.Id;
            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetGame", new { id = game.Id }, game);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        [HttpPost("{id}/join")]
        public async Task<IActionResult> JoinGame(int id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            // Get the current user (player) from the authenticated context.
            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized();
            }

            // Check if the user is already hosting the game.
            if (game.HostPlayerId == user.Id)
            {
                // User is already hosting the game, return a conflict response or other appropriate response.
                return Conflict();
            }

            // Check if the user has reached the game's max players limit.
            if (game.PlayerGames.Count >= game.MaxPlayers)
            {
                // Game is full, return an appropriate response.
                return BadRequest("Game is full.");
            }

            // Check if the user is already in the game.
            if (game.PlayerGames.Any(pg => pg.PlayerId == int.Parse(user.Id)))
            {
                // User is already in the game, return a conflict response or other appropriate response.
                return Conflict();
            }

            // Create a PlayerGame entry to associate the player with the game.
            var playerGame = new PlayerGame
            {
                Player = user,
                Game = game
            };

            _context.PlayerGames.Add(playerGame);
            await _context.SaveChangesAsync();
            return NoContent();
        }



        [HttpPost("{id}/start")]
        public async Task<IActionResult> StartGame(int id)
        {
            var game = await _context.Games
                .Include(g => g.PlayerGames)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null)
            {
                return NotFound();
            }

            // Additional logic to start the game here.
            if (!game.Started)
            {
                game.Started = true;

                // Initialize the game state for a Yahtzee game.
                InitializeYahtzeeGame(game);

                // Save changes to the database.
                await _context.SaveChangesAsync();

                return NoContent();
            }

            // Handle cases where the game is already started.
            return BadRequest("The game is already started.");
        }

        private void InitializeYahtzeeGame(Game game)
        {
            // Initialize each player's dice values, player score, and roll count.
            foreach (var playerGame in game.PlayerGames)
            {
                playerGame.RollCount = 3; // Initial roll count for each player.
            }
        }


        [HttpGet("api/players/{playerId}")]
        public async Task<IActionResult> FetchPlayerDetails(string playerId)
        {
            var player = await _context.Players.FindAsync(playerId);

            if (player == null)
            {
                return NotFound();
            }

            // Return the player details as JSON response.
            return Ok(player);
        }

        [HttpGet("api/games/{gameId}")]
        public async Task<IActionResult> FetchGameDetails(int gameId)
        {
            var game = await _context.Games.FindAsync(gameId);

            if (game == null)
            {
                return NotFound();
            }

            // Return the game details as JSON response.
            return Ok(game);
        }


    }
}
