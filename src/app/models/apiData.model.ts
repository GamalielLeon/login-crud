import { UserModel } from './user.model';
export interface ApiDataModel{
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: UserModel[];
}
