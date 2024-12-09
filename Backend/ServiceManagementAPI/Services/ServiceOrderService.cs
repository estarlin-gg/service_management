using Microsoft.EntityFrameworkCore;
using ServiceManagementAPI.Data;
using ServiceManagementAPI.Dtos.Serviceorder;
using ServiceManagementAPI.Models;
using ServiceManagementAPI.Services.Abstract;

namespace ServiceManagementAPI.Services
{
    public class ServiceOrderService : IServiceOrderService
    {
        private readonly SMContext _context;

        public ServiceOrderService(SMContext context)
        {
            _context = context;
        }

        
        public async Task<List<ServiceOrderDto>> GetAllOrdersAsync()
        {
            return await _context.ServiceOrders
                .Include(o => o.Technician)
                .Include(o => o.ServiceType)
                .Include(o => o.OrderStatus)
                .Include(o => o.User)
                .Select(o => new ServiceOrderDto
                {
                    Id = o.Id,
                    ClientName = o.User.FullName,
                    ClientAddress = o.User.Address,
                    TechnicianName = o.Technician != null ? o.Technician.FullName : "No asignado",
                    ServiceType = o.ServiceType.Name,
                    OrderStatus = o.OrderStatus.Name
                })
                .ToListAsync();
        }

        
        public async Task CreateOrderAsync(int userId, CreateServiceOrderDto orderDto)
        {
            var order = new ServiceOrder
            {
                UserId = userId,
                ServiceTypeId = orderDto.ServiceTypeId,
                OrderStatusId = 1,
                Description = orderDto.Description,
                //ClientName = orderDto.ClientName, 
              
                TechnicianId = null 
            };

            _context.ServiceOrders.Add(order);
            await _context.SaveChangesAsync();
        }

        
        public async Task<ServiceOrderDto> GetOrderByIdAsync(int id)
        {
            var order = await _context.ServiceOrders
                .Include(o => o.Technician)
                .Include(o => o.ServiceType)
                .Include(o => o.OrderStatus)
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                throw new Exception("Orden de servicio no encontrada");

            return new ServiceOrderDto
            {
                Id = order.Id,
                ClientName = order.User.FullName,
                ClientAddress = order.User.Address,
                TechnicianName = order.Technician?.FullName ?? "No asignado",
                ServiceType = order.ServiceType.Name,
                OrderStatus = order.OrderStatus.Name
            };
        }

        
        public async Task UpdateOrderAsync(int id, UpdateServiceOrderDto orderDto)
        {
            var order = await _context.ServiceOrders.FindAsync(id);
            if (order == null)
                throw new Exception("Orden de servicio no encontrada");

            order.OrderStatusId = orderDto.OrderStatusId;

            await _context.SaveChangesAsync();
        }


        public async Task UpdateOrderStatusAsync(int orderId, UpdateServiceOrderDto orderDto)
        {
            var order = await _context.ServiceOrders.FindAsync(orderId);
            if (order == null)
                throw new Exception("Orden de servicio no encontrada");

            
            order.OrderStatusId = orderDto.OrderStatusId;

            await _context.SaveChangesAsync();
        }



        public async Task DeleteOrderAsync(int id)
        {
            var order = await _context.ServiceOrders.FindAsync(id);
            if (order == null)
                throw new Exception("Orden de servicio no encontrada");

            _context.ServiceOrders.Remove(order);
            await _context.SaveChangesAsync();
        }

        
        public async Task<List<ServiceOrderDto>> GetOrdersByClientIdAsync(int clientId)
        {
            return await _context.ServiceOrders
                .Where(o => o.UserId == clientId)
                .Include(o => o.ServiceType)
                .Include(o => o.OrderStatus)
                .Select(o => new ServiceOrderDto
                {
                    Id = o.Id,
                    ServiceType = o.ServiceType.Name,
                    Description = o.Description,
                    OrderStatus = o.OrderStatus.Name
                })
                .ToListAsync();
        }
    }
}
