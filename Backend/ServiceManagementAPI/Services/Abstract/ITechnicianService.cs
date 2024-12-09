using ServiceManagementAPI.Dtos.Technician;

namespace ServiceManagementAPI.Services.Abstract
{
    public interface ITechnicianService
    {
        Task<List<TechnicianDto>> GetAllTechniciansAsync();
        Task<TechnicianDto> GetTechnicianByIdAsync(int id);
        Task CreateTechnicianAsync(CreateTechnicianDto technicianDto);
        Task UpdateTechnicianAsync(int id, UpdateTechnicianDto technicianDto);
        Task DeleteTechnicianAsync(int id);
    }
}
