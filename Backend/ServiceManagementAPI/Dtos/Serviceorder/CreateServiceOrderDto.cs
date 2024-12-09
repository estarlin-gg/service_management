namespace ServiceManagementAPI.Dtos.Serviceorder
{
    public class CreateServiceOrderDto
    {
        public int ServiceTypeId { get; set; }
        public string ClientName { get; set; }
        public string Description { get; set; }

    }

}
