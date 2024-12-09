using Microsoft.EntityFrameworkCore;
using ServiceManagementAPI.Models;

namespace ServiceManagementAPI.Data
{
    public class SMContext : DbContext
    {
        public SMContext(DbContextOptions<SMContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<ServiceOrder> ServiceOrders { get; set; }
        public DbSet<ServiceType> ServiceTypes { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<Specialty> Specialties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);



            modelBuilder.Entity<User>()
                .HasOne(u => u.Specialty)
                .WithMany(s => s.Users)
                .HasForeignKey(u => u.SpecialtyId)
                .IsRequired(false);


            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId);


            modelBuilder.Entity<UserRole>()
                .HasMany(ur => ur.Users)
                .WithOne(u => u.UserRole)
                .HasForeignKey(u => u.UserRoleId);


            modelBuilder.Entity<ServiceOrder>()
    .HasOne(o => o.Technician)
    .WithMany()
    .HasForeignKey(o => o.TechnicianId)
    .OnDelete(DeleteBehavior.SetNull);


            modelBuilder.Entity<ServiceOrder>()
                .HasOne(o => o.ServiceType)
                .WithMany(st => st.ServiceOrders)
                .HasForeignKey(o => o.ServiceTypeId);


            modelBuilder.Entity<ServiceOrder>()
                .HasOne(o => o.OrderStatus)
                .WithMany(os => os.ServiceOrders)
                .HasForeignKey(o => o.OrderStatusId);
        }
    }
}
