using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project2_multiplayer_yahtzee.Data;
using project2_multiplayer_yahtzee.Models;
using System.Linq;
using System.Text;

namespace project2_multiplayer_yahtzee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public GameController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("getgames")]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {

            var games = await _context.Games.ToListAsync();
            return Ok(games);
        }

        [HttpPost("creategame")]
        public async Task<ActionResult<Game>> CreateGame([FromBody] Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            return Ok(game);
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<Game>> GetGame(int id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        [HttpPost("join/{id}")]
        public async Task<IActionResult> JoinGame(int id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                var userId = await reader.ReadToEndAsync();

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                //// Check if the user has reached the game's max players limit.
                //if (game.PlayerGames.Count >= game.MaxPlayers)
                //{
                //    // Game is full, return an appropriate response.
                //    return BadRequest("Game is full.");
                //}

                //// Check if the user is already in the game.
                //if (game.PlayerGames.Any(pg => pg.PlayerId == user.Id))
                //{
                //    // User is already in the game, return a conflict response or other appropriate response.
                //    return Conflict();
                //}

                // Create a PlayerGame entry to associate the player with the game.
                var playerGame = new PlayerGame
                {
                    PlayerId = userId,
                    GameId = game.Id,
                    Score = 0
                };

                _context.PlayerGames.Add(playerGame);
                await _context.SaveChangesAsync();
                return NoContent();
            }
        }


            [HttpPut("start/{id}")]
            public async Task<IActionResult> StartGame(int id)
            {
                var game = await _context.Games
                    .FirstOrDefaultAsync(g => g.Id == id);

                if (game == null)
                {
                    return NotFound();
                }

                // Additional logic to start the game here.
                if (!game.Started)
                {
                    game.Started = true;

                    // Save changes to the database.
                    await _context.SaveChangesAsync();

                    return NoContent();
                }

                // Handle cases where the game is already started.
                return BadRequest("The game is already started.");
            }

            [HttpPut("finish/{id}")]
            public async Task<IActionResult> FinishGame(int id)
            {
                var game = await _context.Games
                    .FirstOrDefaultAsync(g => g.Id == id);

                if (game == null)
                {
                    return NotFound();
                }

                // Additional logic to start the game here.
                if (game.Started)
                {
                    game.Started = false;

                    // Save changes to the database.
                    await _context.SaveChangesAsync();

                    return NoContent();
                }

                // Handle cases where the game is already started.
                return BadRequest("Game is over");
            }

            [HttpGet("(player/{playerId}")]
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

            [HttpGet("game/{gameId}")]
            public async Task<IActionResult> FetchGameDetails(int gameId)
            {
                var game = await _context.PlayerGames
                    .Where(pg => pg.GameId == gameId)
                    .ToListAsync();

                if (game == null)
                {
                    return NotFound();
                }
                // Return the game details as JSON response.
                return Ok(game);
            }
        }
    }

