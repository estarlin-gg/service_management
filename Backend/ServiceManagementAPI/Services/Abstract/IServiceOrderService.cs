using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceManagementAPI.Dtos.Serviceorder;

namespace ServiceManagementAPI.Services.Abstract
{
    public interface IServiceOrderService
    {
        Task<List<ServiceOrderDto>> GetAllOrdersAsync();
        Task<ServiceOrderDto> GetOrderByIdAsync(int id);
        Task CreateOrderAsync(int userId, CreateServiceOrderDto orderDto); 
        Task UpdateOrderAsync(int id, UpdateServiceOrderDto orderDto);
        Task UpdateOrderStatusAsync(int orderId, UpdateServiceOrderDto orderDto);
        Task DeleteOrderAsync(int id);
        Task<List<ServiceOrderDto>> GetOrdersByClientIdAsync(int clientId);
    }
}
