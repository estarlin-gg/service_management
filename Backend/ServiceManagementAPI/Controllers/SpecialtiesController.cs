using Microsoft.AspNetCore.Mvc;
using ServiceManagementAPI.Dtos.Specialty;
using ServiceManagementAPI.Services.Abstract;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServiceManagementAPI.Controllers
{
    [Route("api/specialties")]
    [ApiController]
    public class SpecialtiesController : ControllerBase
    {
        private readonly ISpecialtyService _specialtyService;

        public SpecialtiesController(ISpecialtyService specialtyService)
        {
            _specialtyService = specialtyService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpecialtyDto>>> GetAll()
        {
            var specialties = await _specialtyService.GetAllSpecialtiesAsync();
            return Ok(specialties);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SpecialtyDto>> GetById(int id)
        {
            var specialty = await _specialtyService.GetSpecialtyByIdAsync(id);
            if (specialty == null)
                return NotFound();
            return Ok(specialty);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSpecialtyDto specialtyDto)
        {
            try
            {
                await _specialtyService.CreateSpecialtyAsync(specialtyDto);
                return CreatedAtAction(nameof(GetById), specialtyDto.Name);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSpecialtyDto specialtyDto)
        {
            try
            {
                await _specialtyService.UpdateSpecialtyAsync(id, specialtyDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _specialtyService.DeleteSpecialtyAsync(id);
                return Ok("Especialidad eliminada.");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
