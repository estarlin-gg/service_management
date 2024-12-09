using ServiceManagementAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

public class ServiceOrder
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int? TechnicianId { get; set; }
    public User Technician { get; set; }
    public int ServiceTypeId { get; set; }
    public ServiceType ServiceType { get; set; }
    public int OrderStatusId { get; set; }
    public OrderStatus OrderStatus { get; set; }

    public string Description { get; set; }

}
