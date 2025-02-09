import jwtRouter,{routeTable as jwtPreRouteTable} from "../../apis/JWTApi/routes/jwtApi.pre.routes";
import { RouterModule } from "../../types/routes-types";
import { ROUTE_MODULE_LIST_E } from "./route.module";
export const preRouteTable: RouterModule.IRouteEntry[] = [
    { routePath: ROUTE_MODULE_LIST_E.JWT, router: jwtRouter, routetable: jwtPreRouteTable },
];
