using ServiceManagementAPI.Dtos.Specialty;

namespace ServiceManagementAPI.Services.Abstract
{
    public interface ISpecialtyService
    {
        Task<List<SpecialtyDto>> GetAllSpecialtiesAsync();
        Task<SpecialtyDto> GetSpecialtyByIdAsync(int id);
        Task CreateSpecialtyAsync(CreateSpecialtyDto specialtyDto);
        Task UpdateSpecialtyAsync(int id, UpdateSpecialtyDto specialtyDto);
        Task DeleteSpecialtyAsync(int id);
    }
}
