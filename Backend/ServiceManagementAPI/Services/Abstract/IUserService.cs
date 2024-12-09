using ServiceManagementAPI.Dtos.User;
using ServiceManagementAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IUserService
{
    Task<UserDto> CreateUserAsync(CreateUserDto userDto);
    Task<List<UserDto>> GetAllUsersAsync();
    Task<UserDto> GetUserByIdAsync(int id);
    Task UpdateUserAsync(int id, UpdateUserDto userDto);
    Task DeleteUserAsync(int id);
    Task<List<UserRole>> GetAllRolesAsync();
}
