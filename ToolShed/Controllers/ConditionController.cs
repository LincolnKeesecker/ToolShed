using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToolShed.Models;
using ToolShed.Repositories;

namespace ToolShed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConditionController : ControllerBase
    {
        private readonly IConditionRepository _conditionRepository;
        private readonly IUserRepository _userRepository;

        public ConditionController(IConditionRepository conditionRepository, IUserRepository userRepository)
        {
            _conditionRepository = conditionRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_conditionRepository.GetAllConditions());
        }

        [HttpDelete("{tagId}")]
        public IActionResult Delete([FromRoute] int conditionId)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            User user = _userRepository.GetByFirebaseUserId(UUID);

            if (user.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            try
            {
                _conditionRepository.Delete(conditionId);

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Edit([FromQuery] string oldName, [FromQuery] string newName)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            User user = _userRepository.GetByFirebaseUserId(UUID);

            if (user.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            try
            {
                _conditionRepository.Edit(oldName, newName);

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
