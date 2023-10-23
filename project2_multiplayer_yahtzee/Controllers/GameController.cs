using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project2_multiplayer_yahtzee.Data;
using project2_multiplayer_yahtzee.Models;
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

        [HttpGet("getPlayers")]
        public async Task<ActionResult<IEnumerable<Game>>> GetPlayers()
        {

            var players = await _context.Players.ToListAsync();
            return Ok(players);
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


        [HttpGet("getPlayer/{id}")]
        public async Task<ActionResult<Game>> GetPlayer(string id)
        {
            var player = await _context.Players.FindAsync(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
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

                var playerGame = new PlayerGame
                {
                    PlayerId = userId,
                    GameId = game.Id,
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

        [HttpGet("getPlayersInGame/{id}")]
        public async Task<ActionResult<IEnumerable<PlayerGame>>> GetPlayerGamesByGameId(int id)
        {

            var gamePlayers = await _context.PlayerGames
                .Include(pg => pg.Player)
                .Where(pg => pg.GameId == id)
                .Select(pg => new
                {
                    PlayerId = pg.PlayerId,
                    UserName = pg.Player.UserName, 
                    GameId = pg.GameId,
                })
                .ToListAsync();

            return Ok(gamePlayers);
        }

        [HttpGet("getAllPlayerGame")]
        public async Task<ActionResult<IEnumerable<PlayerGame>>> GetAllPlayerGame()
        {
            var playerGame = await _context.PlayerGames.ToListAsync();

            return Ok(playerGame);
        }

        [HttpPut("updateGamesPlayed/{playerId}")]
        public async Task<ActionResult> UpdateGamesPlayed(string playerId)
        {
            // Find the player by playerId
            var player = await _userManager.FindByIdAsync(playerId);

            if (player == null)
            {
                return NotFound("Player not found.");
            }

            // Increment the GamesPlayed count of the player
            player.GamesPlayed++;

            var result = await _userManager.UpdateAsync(player);

            if (result.Succeeded)
            {
                return Ok("Games played count updated successfully.");
            }
            else
            {
                return BadRequest("Failed to update GamesPlayed count.");
            }
        }
        [HttpPut("updateGamesWon/{playerId}")]
        public async Task<ActionResult> UpdateGamesWon(string playerId)
        {
            // Find the player by playerId
            var player = await _userManager.FindByIdAsync(playerId);

            if (player == null)
            {
                return NotFound("Player not found.");
            }

            // Increment the GamesPlayed count of the player
            player.GamesWon++;

            var result = await _userManager.UpdateAsync(player);

            if (result.Succeeded)
            {
                return Ok("Games Won count updated successfully.");
            }
            else
            {
                return BadRequest("Failed to update GamesWon count.");
            }
        }

    }
}

