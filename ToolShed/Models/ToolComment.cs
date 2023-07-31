namespace ToolShed.Models
{
    public class ToolComment
    {
        public int Id { get; set; }
        public int ToolId { get; set; }
        public int UserId { get; set; }
        public string Body { get; set; }
        public User User { get; set; }
    }
}
