using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceManagementAPI.Dtos.Technician;
using ServiceManagementAPI.Services.Abstract;
using System.Threading.Tasks;

namespace ServiceManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TechnicianController : ControllerBase
    {
        private readonly ITechnicianService _technicianService;

        public TechnicianController(ITechnicianService technicianService)
        {
            _technicianService = technicianService;
        }

        
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllTechnicians()
        {
            var technicians = await _technicianService.GetAllTechniciansAsync();
            return Ok(technicians);
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTechnicianById(int id)
        {
            if (User.IsInRole("Technician") && id != int.Parse(User.FindFirst("id").Value))
                return Forbid(); 

            var technician = await _technicianService.GetTechnicianByIdAsync(id);
            return Ok(technician);
        }

      
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTechnician([FromBody] CreateTechnicianDto technicianDto)
        {
            await _technicianService.CreateTechnicianAsync(technicianDto);
            return Ok(new { message = "Técnico creado correctamente." });
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTechnician(int id, [FromBody] UpdateTechnicianDto technicianDto)
        {
            if (User.IsInRole("Technician") && id != int.Parse(User.FindFirst("id").Value))
                return Forbid();

            await _technicianService.UpdateTechnicianAsync(id, technicianDto);
            return Ok(new { message = "Técnico actualizado correctamente." });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTechnician(int id)
        {
            await _technicianService.DeleteTechnicianAsync(id);
            return Ok(new { message = "Técnico eliminado correctamente." });
        }
    }
}
