using Microsoft.AspNetCore.Mvc;
using ToolShed.Models;
using ToolShed.Repositories;

namespace ToolShed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolCommentController : ControllerBase
    {
        private readonly IToolCommentRepository _toolCommentRepository;

        public ToolCommentController(IToolRepository toolRepository, IUserRepository userRepository, IToolCommentRepository toolCommentRepository)
        {
            _toolCommentRepository = toolCommentRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_toolCommentRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetToolCommentById(int id)
        {
            var toolComment = _toolCommentRepository.GetById(id);
            if (toolComment == null)
            {
                return NotFound();
            }
            return Ok(toolComment);
        }

        [HttpGet("tool/{id}")]
        public IActionResult GetToolComments(int id) 
        {
            return Ok(_toolCommentRepository.GetByToolId(id));
        }

        [HttpPost("add")]
        public IActionResult Post(ToolComment toolComment)
        {
            _toolCommentRepository.Add(toolComment);

            return CreatedAtAction("Get", new { id = toolComment.Id }, toolComment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ToolComment toolComment)
        {
            if (id != toolComment.Id)
            {
                return BadRequest();
            }

            _toolCommentRepository.Update(toolComment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _toolCommentRepository.Delete(id);
            return NoContent();
        }
    }
}