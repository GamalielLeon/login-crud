import { UserModel } from './user.model';
export interface ApiDataModel{
  pageNumber: string;
  pageSize: string;
  totalPages: string;
  totalRecords: string;
  data: UserModel[];
}
