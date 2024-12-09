namespace ServiceManagementAPI.Dtos.User
{
    public class CreateUserDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int UserRoleId { get; set; }

        public int? SpecialtyId { get; set; }
    }
}
