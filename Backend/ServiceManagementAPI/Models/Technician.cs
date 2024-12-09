namespace ServiceManagementAPI.Models
{
    public class Technician : User
    {
       
        public ICollection<ServiceOrder> ServiceOrders { get; set; } = new List<ServiceOrder>();
    }
}
