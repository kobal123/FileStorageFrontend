import { DevUserService } from "./dev/local-dev-userservice";
import { ProductionUserService } from "./prod/prod-userservice";
import { UserService } from "./userservice-interface";

let service: UserService | null = null;


if (process.env.NODE_ENV === 'development') {
    console.log('You are in development environment');
    service = new DevUserService();
} else {
    console.log('You are in production environment');
    service = new ProductionUserService();
}

export const userservice = service;

