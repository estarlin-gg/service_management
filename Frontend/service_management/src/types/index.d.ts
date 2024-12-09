export interface IUser {
  fullname: string;
  email: string;
  password: string;
  userRoleId: number;
  specialtyId: number;
}

export interface IUserDto {
  id: number;
  fullname: string;
  email: string;
  userRole: string;
  specialty: string;
}

export interface Credentials {
  email: string;
  fullName: string;
  token?: string;
  role: string;
}

export interface IAuthContext {
  credentials: Credentials | null;
  // Login: (data: Credentials) => Promise<void>;
  // Register: (data: IUser) => Promise<void>;
}

export interface IAuthResponse {
  token: string;
}

export interface IStatistics {
  ordersCompleted: [];
  pendingOrders: [];
}
export interface IRoles {
  id: number;
  name: string;
  users: [];
}
export interface IAppContext {
  modal: boolean;
  handleModal: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEditId: React.Dispatch<React.SetStateAction<number>>;
  editId: number;
  UpdateStatus: ( statusId: number) => Promise<void>;

  statuses: IStatus[];
}

export interface IServiceType {
  id: number;
  name: string;
  description: string;
}

export interface ISpecialty {
  id: number;
  name: string;
}

export interface ICreateOrder {
  serviceTypeId: number;

  description: string;
}

export interface IOrder {
  id: number;
  serviceType: string;
  orderStatus: string;
  description: string;
  clientName: string;
}

export interface IUserOrders {
  username: string;
  orders: IOrder[];
}

export interface IStatus {
  id: number;
  name: string;
}

export interface IStatusIdDto {
  orderStatusId: number;
}
export interface IOrderStatusUpdateResponse {
  orderId: number;  // ID de la orden que se ha actualizado
  statusId: number;  // ID del estado que se ha asignado a la orden
  statusName: string;  // Nombre del estado
  updatedAt: string;  // Fecha de la actualización
}