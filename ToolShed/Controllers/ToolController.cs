using Microsoft.AspNetCore.Mvc;
using ToolShed.Repositories;
using ToolShed.Models;
using Microsoft.Extensions.Hosting;

namespace ToolShed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolController : ControllerBase
    {
        private readonly IToolRepository _toolRepository;
        private readonly IUserRepository _userRepository;
        public ToolController(IToolRepository toolRepository, IUserRepository userRepository)
        {
            _toolRepository = toolRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_toolRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetToolById(int id)
        {
            var tool = _toolRepository.GetById(id);
            if (tool == null)
            {
                return NotFound();
            }
            return Ok(tool);
        }

        [HttpGet("MyToolShed/{userId}")]
        public IActionResult GetUserTools(int userId)
        {
            return Ok(_toolRepository.GetByUserId(userId));
        }

        [HttpPost("add")]
        public IActionResult Post(Tool tool)
        {
            _toolRepository.Add(tool);

            return CreatedAtAction("Get", new { id = tool.Id }, tool);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tool tool)
        {
            if (id != tool.Id)
            {
                return BadRequest();
            }

            _toolRepository.Update(tool);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _toolRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            return Ok(_toolRepository.Search(q, sortDesc));
        }
    }
}
