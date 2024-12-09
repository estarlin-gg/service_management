using Microsoft.EntityFrameworkCore;
using ServiceManagementAPI.Data;
using ServiceManagementAPI.Models;
using ServiceManagementAPI.Services.Abstract;

namespace ServiceManagementAPI.Services
{
    public class StatusService : IStatusService
    {
        private readonly SMContext _context;

        public StatusService(SMContext context)
        {
            _context = context;
        }

        public async Task<List<OrderStatus>> GetAllStatusesAsync()
        {
            return await _context.OrderStatuses.ToListAsync();
        }
    }
}
