using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceManagementAPI.Dtos.Serviceorder;
using ServiceManagementAPI.Services.Abstract;

namespace ServiceManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ServiceOrderController : ControllerBase
    {
        private readonly IServiceOrderService _serviceOrderService;

        public ServiceOrderController(IServiceOrderService serviceOrderService)
        {
            _serviceOrderService = serviceOrderService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Technician")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _serviceOrderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _serviceOrderService.GetOrderByIdAsync(id);
            return Ok(order);
        }


        [HttpPost]
        [Authorize(Roles = "Client, Admin")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateServiceOrderDto orderDto)
        {
            try
            {
                var (userId, fullName) = GetUserDetailsFromContext();
                if (!userId.HasValue)
                    return Unauthorized(new { error = "Token no válido o claim de usuario no encontrado." });

                
                orderDto.ClientName = fullName;

                await _serviceOrderService.CreateOrderAsync(userId.Value, orderDto);
                return Ok(new { message = $"Orden de servicio creada correctamente por {fullName}." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] UpdateServiceOrderDto orderDto)
        {
            try
            {
                if (User.IsInRole("Admin"))
                {
                    await _serviceOrderService.UpdateOrderAsync(id, orderDto);
                }
                else if (User.IsInRole("Technician"))
                {
                    var order = await _serviceOrderService.GetOrderByIdAsync(id);
                    if (order.TechnicianName != User.Identity?.Name)
                        return Forbid();

                    await _serviceOrderService.UpdateOrderAsync(id, orderDto);
                }
                else if (User.IsInRole("Client"))
                {
                    var order = await _serviceOrderService.GetOrderByIdAsync(id);
                    if (order.ClientName != User.Identity?.Name)
                        return Forbid();

                    await _serviceOrderService.UpdateOrderAsync(id, orderDto);
                }

                return Ok(new { message = "Orden de servicio actualizada correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("status/{id}")]
        [Authorize(Roles = "Admin, Technician")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateServiceOrderDto updateDto)
        {
            if (updateDto == null || updateDto.OrderStatusId <= 0)
            {
                return BadRequest(new { error = "El OrderStatusId es inválido." });
            }

            try
            {
                
                await _serviceOrderService.UpdateOrderStatusAsync(id, updateDto);
                return NoContent(); 
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
                await _serviceOrderService.DeleteOrderAsync(id);
                return Ok(new { message = "Orden de servicio eliminada correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("myOrders")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetMyOrders()
        {
            try
            {
                var (userId, fullName) = GetUserDetailsFromContext();
                if (!userId.HasValue)
                    return Unauthorized(new { error = "Token no válido o claim de usuario no encontrado." });

                var orders = await _serviceOrderService.GetOrdersByClientIdAsync(userId.Value);
                return Ok(new { userName = fullName, orders });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }



        private (int? UserId, string? FullName) GetUserDetailsFromContext()
        {
            var userIdClaim = User?.FindFirst("id")?.Value;
            var fullNameClaim = User?.FindFirst("fullName")?.Value;

            int? userId = null;
            if (int.TryParse(userIdClaim, out var parsedUserId))
            {
                userId = parsedUserId;
            }

            return (userId, fullNameClaim);
        }

    }
}
