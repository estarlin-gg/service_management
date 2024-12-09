namespace ServiceManagementAPI.Dtos.Technician
{
    public class CreateTechnicianDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public int SpecialtyId { get; set; }
    }
}
