import { SetMetadata } from '@nestjs/common';
import { Authority } from '../entity/user.authority';

export const Role = (role: Authority): any => SetMetadata('role', role);
