using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project2_multiplayer_yahtzee.Data.Migrations
{
    public partial class UppdatedModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxPlayers",
                table: "Games");

            migrationBuilder.RenameColumn(
                name: "Score",
                table: "PlayerGames",
                newName: "GamesWon");

            migrationBuilder.AddColumn<int>(
                name: "GamesPlayed",
                table: "PlayerGames",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GamesPlayed",
                table: "PlayerGames");

            migrationBuilder.RenameColumn(
                name: "GamesWon",
                table: "PlayerGames",
                newName: "Score");

            migrationBuilder.AddColumn<int>(
                name: "MaxPlayers",
                table: "Games",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
