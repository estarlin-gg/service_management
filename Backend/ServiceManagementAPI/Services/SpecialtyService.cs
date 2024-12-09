using ServiceManagementAPI.Data;
using ServiceManagementAPI.Dtos.Specialty;
using ServiceManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using ServiceManagementAPI.Services.Abstract;

namespace ServiceManagementAPI.Services
{
    public class SpecialtyService : ISpecialtyService
    {
        private readonly SMContext _context;

        public SpecialtyService(SMContext context)
        {
            _context = context;
        }

        public async Task<List<SpecialtyDto>> GetAllSpecialtiesAsync()
        {
            return await _context.Specialties
                .Select(s => new SpecialtyDto
                {
                    Id = s.Id,
                    Name = s.Name
                })
                .ToListAsync();
        }

        public async Task<SpecialtyDto> GetSpecialtyByIdAsync(int id)
        {
            var specialty = await _context.Specialties.FindAsync(id);
            if (specialty == null)
                throw new Exception("Especialidad no encontrada");

            return new SpecialtyDto
            {
                Id = specialty.Id,
                Name = specialty.Name
            };
        }

        public async Task CreateSpecialtyAsync(CreateSpecialtyDto specialtyDto)
        {
            var specialty = new Specialty
            {
                Name = specialtyDto.Name
            };

            _context.Specialties.Add(specialty);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSpecialtyAsync(int id, UpdateSpecialtyDto specialtyDto)
        {
            var specialty = await _context.Specialties.FindAsync(id);
            if (specialty == null)
                throw new Exception("Especialidad no encontrada");

            specialty.Name = specialtyDto.Name;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteSpecialtyAsync(int id)
        {
            var specialty = await _context.Specialties.FindAsync(id);
            if (specialty == null)
                throw new Exception("Especialidad no encontrada");

            _context.Specialties.Remove(specialty);
            await _context.SaveChangesAsync();
        }
    }
}
