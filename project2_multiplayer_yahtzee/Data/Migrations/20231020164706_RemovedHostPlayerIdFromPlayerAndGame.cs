using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project2_multiplayer_yahtzee.Data.Migrations
{
    public partial class RemovedHostPlayerIdFromPlayerAndGame : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Players_HostPlayerId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_HostPlayerId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "HostPlayerId",
                table: "Games");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HostPlayerId",
                table: "Games",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Games_HostPlayerId",
                table: "Games",
                column: "HostPlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Players_HostPlayerId",
                table: "Games",
                column: "HostPlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
