using ServiceManagementAPI.Dtos.ServiceType;

namespace ServiceManagementAPI.Services.Abstract
{
    public interface IServiceTypeService
    {
        Task<List<ServiceTypeDto>> GetAllServiceTypesAsync();
        Task<ServiceTypeDto> GetServiceTypeByIdAsync(int id);
        Task CreateServiceTypeAsync(CreateServiceTypeDto serviceTypeDto);
        Task UpdateServiceTypeAsync(int id, UpdateServiceTypeDto serviceTypeDto);
        Task DeleteServiceTypeAsync(int id);
    }
}
