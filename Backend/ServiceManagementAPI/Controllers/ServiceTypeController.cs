using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceManagementAPI.Data;

namespace ServiceManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceTypeController : ControllerBase
    {
        private readonly SMContext _context;

        public ServiceTypeController(SMContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Client")]
        public IActionResult GetServiceTypes()
        {
            var serviceTypes = _context.ServiceTypes.ToList();
            return Ok(serviceTypes);
        }
    }
}
