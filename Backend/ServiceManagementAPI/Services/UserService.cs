using ServiceManagementAPI.Data;
using ServiceManagementAPI.Models;
using ServiceManagementAPI.Dtos.User;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly SMContext _context;

    public UserService(SMContext context)
    {
        _context = context;
    }

    public async Task<UserDto> CreateUserAsync(CreateUserDto createUserDto)
    {
        var user = new User
        {
            FullName = createUserDto.FullName,
            Email = createUserDto.Email,
            Password = createUserDto.Password,
            UserRoleId = createUserDto.UserRoleId,
            SpecialtyId = createUserDto.SpecialtyId 
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var userDto = new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            UserRole = user.UserRole.Name,
            Specialty = user.Specialty != null ? user.Specialty.Name : "Sin especialidad"
        };

        return userDto;
    }





    public async Task<List<UserDto>> GetAllUsersAsync()
    {
        return await _context.Users
            .Include(u => u.UserRole)
            .Include(u => u.Specialty) 
            .Select(u => new UserDto
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email,
                UserRole = u.UserRole.Name,
                Specialty = u.Specialty != null ? u.Specialty.Name : "Sin especialidad"
            })
            .ToListAsync();
    }



    public async Task<UserDto> GetUserByIdAsync(int id)
    {
        var user = await _context.Users
            .Include(u => u.UserRole) 
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null) throw new Exception("Usuario no encontrado");

        return new UserDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            UserRole = user.UserRole.Name  
        };
    }


    public async Task UpdateUserAsync(int id, UpdateUserDto userDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) throw new Exception("Usuario no encontrado");

        user.FullName = userDto.FullName;
        user.Email = userDto.Email;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) throw new Exception("Usuario no encontrado");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
    public async Task<List<UserRole>> GetAllRolesAsync()
    {
        return await _context.UserRoles.ToListAsync();
    }
}
