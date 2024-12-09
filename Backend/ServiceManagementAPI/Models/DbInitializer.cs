using ServiceManagementAPI.Data;

namespace ServiceManagementAPI.Models
{
    public static class DbInitializer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = serviceProvider.GetRequiredService<SMContext>();

            context.Database.EnsureCreated();


            if (!context.UserRoles.Any())
            {
                context.UserRoles.AddRange(
                    new UserRole { Name = "Admin" },
                    new UserRole { Name = "Technician" },
                    new UserRole { Name = "Client" }
                );
                context.SaveChanges();
            }


            if (!context.Users.Any(u => u.Email == "admin@gmail.com"))
            {
                var adminRole = context.UserRoles.Single(r => r.Name == "Admin");

                context.Users.Add(new User
                {
                    FullName = "Administrator",
                    Email = "admin@gmail.com",
                    Password = "admin1234",
                    ProfilePictureUrl = null,
                    UserRoleId = adminRole.Id
                });
                context.SaveChanges();
            }


            if (!context.Specialties.Any())
            {
                context.Specialties.AddRange(
                    new Specialty { Name = "Electricista" },
                    new Specialty { Name = "Plomero" },
                    new Specialty { Name = "Carpintero" },
                    new Specialty { Name = "Cerrajero" },
                    new Specialty { Name = "Técnico en refrigeración" },
                    new Specialty { Name = "Pintor" },
                    new Specialty { Name = "Jardinero" },
                    new Specialty { Name = "Técnico en electrodomésticos" },
                    new Specialty { Name = "Albañil" },
                    new Specialty { Name = "Instalador de sistemas de seguridad" }
                );
                context.SaveChanges();
            }


            if (!context.ServiceTypes.Any())
            {
                context.ServiceTypes.AddRange(
                    new ServiceType { Name = "Electricista", Description = "Instalaciones y reparaciones eléctricas." },
                    new ServiceType { Name = "Plomero", Description = "Instalaciones y reparaciones de fontanería." },
                    new ServiceType { Name = "Carpintero", Description = "Fabricación y reparación de muebles." },
                    new ServiceType { Name = "Cerrajero", Description = "Instalación y reparación de cerraduras." },
                    new ServiceType { Name = "Técnico en refrigeración", Description = "Instalación y reparación de sistemas de refrigeración." },
                    new ServiceType { Name = "Pintor", Description = "Pintura y acabados para interiores y exteriores." },
                    new ServiceType { Name = "Jardinero", Description = "Servicios de jardinería y paisajismo." },
                    new ServiceType { Name = "Técnico en electrodomésticos", Description = "Reparación e instalación de electrodomésticos." },
                    new ServiceType { Name = "Albañil", Description = "Construcción, reparación y mantenimiento de estructuras." },
                    new ServiceType { Name = "Instalador de sistemas de seguridad", Description = "Instalación de sistemas de seguridad y alarmas." }
                );
                context.SaveChanges();
            }


            if (!context.OrderStatuses.Any())
            {
                context.OrderStatuses.AddRange(
                    new OrderStatus { Name = "Pendiente" },
                    new OrderStatus { Name = "En progreso" },
                    new OrderStatus { Name = "Completada" }
                );
                context.SaveChanges();
            }
        }

    }
}
