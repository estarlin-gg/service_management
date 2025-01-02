# Sistema de Gestión de Órdenes de Servicio

Este es un sistema diseñado para gestionar las órdenes de servicio en una empresa de mantenimiento. Los usuarios pueden crear órdenes de servicio, asignarlas a técnicos y hacer un seguimiento del progreso de las órdenes hasta su finalización. El sistema maneja tablas para clientes, técnicos, órdenes de servicio, estados y detalles del servicio. Además, incluye roles de usuario como administrador, técnico y usuario, con permisos específicos para cada uno.

## Tecnologías Utilizadas

### Frontend:
- **React con TypeScript**: Framework y lenguaje para desarrollar el frontend de la aplicación.

### Backend:
- **ASP.NET Core Web API**: Framework para crear la API RESTful que gestiona la lógica de negocio.
- **SQLite**: Base de datos ligera utilizada para almacenar la información de clientes, técnicos, órdenes y más.

### Autenticación:
- **JWT (JSON Web Token)**: Se utiliza para la autenticación de usuarios en el login y el registro. El sistema genera y verifica tokens JWT para asegurar que solo los usuarios autenticados puedan acceder a las funcionalidades protegidas.

## Roles de Usuario

- **Administrador**: Tiene acceso completo al sistema. Puede gestionar órdenes, técnicos y usuarios.
- **Técnico**: Puede ver las órdenes asignadas a él y actualizar el estado de las mismas.
- **Usuario**: Puede crear órdenes de servicio y hacer seguimiento de las que ha creado.

## Funcionalidades

- **Gestión de Órdenes de Servicio**: Los usuarios pueden crear nuevas órdenes de servicio, asignarlas a técnicos y hacer seguimiento de su progreso.
- **Gestión de Técnicos**: Los administradores pueden asignar órdenes a los técnicos y hacer un seguimiento del estado de cada orden.
- **Seguimiento de Estado**: Los usuarios pueden ver y actualizar el estado de cada orden, desde su creación hasta su finalización.

