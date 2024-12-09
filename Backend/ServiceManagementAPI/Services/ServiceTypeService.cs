using ServiceManagementAPI.Data;
using ServiceManagementAPI.Dtos.ServiceType;
using ServiceManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using ServiceManagementAPI.Services.Abstract;

namespace ServiceManagementAPI.Services
{
    public class ServiceTypeService : IServiceTypeService
    {
        private readonly SMContext _context;

        public ServiceTypeService(SMContext context)
        {
            _context = context;
        }

        public async Task<List<ServiceTypeDto>> GetAllServiceTypesAsync()
        {
            return await _context.ServiceTypes
                .Select(st => new ServiceTypeDto
                {
                    Id = st.Id,
                    Name = st.Name,
                    Description = st.Description
                })
                .ToListAsync();
        }

        public async Task<ServiceTypeDto> GetServiceTypeByIdAsync(int id)
        {
            var serviceType = await _context.ServiceTypes.FindAsync(id);
            if (serviceType == null)
                throw new Exception("Tipo de servicio no encontrado");

            return new ServiceTypeDto
            {
                Id = serviceType.Id,
                Name = serviceType.Name,
                Description = serviceType.Description
            };
        }

        public async Task CreateServiceTypeAsync(CreateServiceTypeDto serviceTypeDto)
        {
            var serviceType = new ServiceType
            {
                Name = serviceTypeDto.Name,
                Description = serviceTypeDto.Description
            };

            _context.ServiceTypes.Add(serviceType);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateServiceTypeAsync(int id, UpdateServiceTypeDto serviceTypeDto)
        {
            var serviceType = await _context.ServiceTypes.FindAsync(id);
            if (serviceType == null)
                throw new Exception("Tipo de servicio no encontrado");

            serviceType.Name = serviceTypeDto.Name;
            serviceType.Description = serviceTypeDto.Description;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteServiceTypeAsync(int id)
        {
            var serviceType = await _context.ServiceTypes.FindAsync(id);
            if (serviceType == null)
                throw new Exception("Tipo de servicio no encontrado");

            _context.ServiceTypes.Remove(serviceType);
            await _context.SaveChangesAsync();
        }
    }
}
