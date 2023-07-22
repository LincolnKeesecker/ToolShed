using System.ComponentModel.DataAnnotations;

namespace ToolShed.Models
{
    public class Condition
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
    }
}