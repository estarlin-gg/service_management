using ServiceManagementAPI.Models;

namespace ServiceManagementAPI.Services.Abstract
{
    public interface IStatusService
    {
        Task<List<OrderStatus>> GetAllStatusesAsync();
    }
}
