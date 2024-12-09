namespace ServiceManagementAPI.Dtos.Serviceorder
{
    public class ServiceOrderDto
    {
        public int Id { get; set; }
        public string ClientName { get; set; } 
        public string ClientAddress { get; set; } 
        public string TechnicianName { get; set; }
        public string ServiceType { get; set; }
      
        public string OrderStatus { get; set; }
        public string Description { get; set; }
    }
}
