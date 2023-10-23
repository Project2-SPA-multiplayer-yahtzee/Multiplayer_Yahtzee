using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project2_multiplayer_yahtzee.Data.Migrations
{
    public partial class restructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerGames_AspNetUsers_PlayerId1",
                table: "PlayerGames");

            migrationBuilder.DropIndex(
                name: "IX_PlayerGames_PlayerId1",
                table: "PlayerGames");

            migrationBuilder.DropColumn(
                name: "PlayerId1",
                table: "PlayerGames");

            migrationBuilder.AlterColumn<string>(
                name: "PlayerId",
                table: "PlayerGames",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerGames_PlayerId",
                table: "PlayerGames",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerGames_AspNetUsers_PlayerId",
                table: "PlayerGames",
                column: "PlayerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerGames_AspNetUsers_PlayerId",
                table: "PlayerGames");

            migrationBuilder.DropIndex(
                name: "IX_PlayerGames_PlayerId",
                table: "PlayerGames");

            migrationBuilder.AlterColumn<int>(
                name: "PlayerId",
                table: "PlayerGames",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "PlayerId1",
                table: "PlayerGames",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlayerGames_PlayerId1",
                table: "PlayerGames",
                column: "PlayerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerGames_AspNetUsers_PlayerId1",
                table: "PlayerGames",
                column: "PlayerId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
