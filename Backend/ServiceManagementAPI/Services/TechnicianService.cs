using ServiceManagementAPI.Data;
using ServiceManagementAPI.Dtos.Technician;
using ServiceManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using ServiceManagementAPI.Services.Abstract;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace ServiceManagementAPI.Services
{
    public class TechnicianService : ITechnicianService
    {
        private readonly SMContext _context;

        public TechnicianService(SMContext context)
        {
            _context = context;
        }
        public async Task<List<TechnicianDto>> GetAllTechniciansAsync()
        {
            return await _context.Users
                .Where(u => u.UserRole != null && u.UserRole.Name == "Technician") 
                .Include(u => u.Specialty) 
                .Select(t => new TechnicianDto
                {
                    Id = t.Id,
                    FullName = t.FullName,
                    Email = t.Email,
                    SpecialtyName = t.Specialty != null ? t.Specialty.Name : "Sin especialidad" 
                })
                .ToListAsync();
        }

       
        public async Task<TechnicianDto> GetTechnicianByIdAsync(int id)
        {
            var technician = await _context.Users
                .Include(t => t.Specialty)
                .Include(t => t.UserRole) 
                .FirstOrDefaultAsync(t => t.Id == id && t.UserRole.Name == "Technician");

            if (technician == null)
                throw new KeyNotFoundException("Técnico no encontrado");

            return new TechnicianDto
            {
                Id = technician.Id,
                FullName = technician.FullName,
                Email = technician.Email,
                SpecialtyName = technician.Specialty != null ? technician.Specialty.Name : "Sin especialidad"
            };
        }

        
        public async Task CreateTechnicianAsync(CreateTechnicianDto technicianDto)
        {
            
            var technicianRole = await _context.UserRoles.FirstOrDefaultAsync(r => r.Name == "Technician");
            if (technicianRole == null)
                throw new KeyNotFoundException("El rol de técnico no existe.");

            var technician = new User
            {
                FullName = technicianDto.FullName,
                Email = technicianDto.Email,
                UserRoleId = technicianRole.Id,
                SpecialtyId = technicianDto.SpecialtyId
            };

            _context.Users.Add(technician);
            await _context.SaveChangesAsync();
        }

        
        public async Task UpdateTechnicianAsync(int id, UpdateTechnicianDto technicianDto)
        {
            var technician = await _context.Users
                .Include(u => u.UserRole)
                .FirstOrDefaultAsync(u => u.Id == id && u.UserRole.Name == "Technician"); 

            if (technician == null)
                throw new KeyNotFoundException("Técnico no encontrado.");

            technician.FullName = technicianDto.FullName;
            technician.Email = technicianDto.Email;
            technician.SpecialtyId = technicianDto.SpecialtyId;

            await _context.SaveChangesAsync();
        }

        
        public async Task DeleteTechnicianAsync(int id)
        {
            var technician = await _context.Users
                .Include(u => u.UserRole)
                .FirstOrDefaultAsync(u => u.Id == id && u.UserRole.Name == "Technician");

            if (technician == null)
                throw new KeyNotFoundException("Técnico no encontrado.");

            _context.Users.Remove(technician);
            await _context.SaveChangesAsync();
        }
    }
}
