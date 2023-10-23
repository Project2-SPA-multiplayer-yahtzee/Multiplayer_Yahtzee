using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project2_multiplayer_yahtzee.Data.Migrations
{
    public partial class MovedGamesPlayedAndGamesWonToApplicationUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GamesPlayed",
                table: "PlayerGames");

            migrationBuilder.DropColumn(
                name: "GamesWon",
                table: "PlayerGames");

            migrationBuilder.AddColumn<int>(
                name: "GamesPlayed",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GamesWon",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GamesPlayed",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GamesWon",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "GamesPlayed",
                table: "PlayerGames",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GamesWon",
                table: "PlayerGames",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
