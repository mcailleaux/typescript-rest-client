import { IPaginate } from './paginate';
import { ISort } from './sort';

export interface ISearch {
  paginate: IPaginate;
  sorts: Array<ISort>;
  filter: any;
}
