namespace ServiceManagementAPI.Models
{
    public class OrderStatus
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public ICollection<ServiceOrder> ServiceOrders { get; set; } = new List<ServiceOrder>();
    }


}
