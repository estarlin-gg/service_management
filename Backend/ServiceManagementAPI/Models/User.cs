namespace ServiceManagementAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ProfilePictureUrl { get; set; }
        public int? SpecialtyId { get; set; }

        public Specialty Specialty { get; set; }
        public string Address { get; set; }

        public int UserRoleId { get; set; }
        public UserRole UserRole { get; set; }

        public ICollection<ServiceOrder> Orders { get; set; } = new List<ServiceOrder>();
    }
}
