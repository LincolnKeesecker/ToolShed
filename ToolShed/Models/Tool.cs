namespace ToolShed.Models
{
    public class Tool
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ConditionId { get; set; }
        public int UserId { get; set; }
    }
}