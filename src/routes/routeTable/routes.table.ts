import booksRouter,{ routeTable as booksRouteTable,} from '../../modules/books/routes/books.routes';
import { RouterModule } from '../../types/routes-types';
import { ROUTE_MODULE_LIST_E } from './route.module';
export const routeTable: RouterModule.IRouteEntry[] = [
	{ routePath: ROUTE_MODULE_LIST_E.BOOKS, router: booksRouter, routetable: booksRouteTable },
];
