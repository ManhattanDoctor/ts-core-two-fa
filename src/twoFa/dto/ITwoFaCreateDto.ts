import { ITraceable } from '@ts-core/common/trace';
import { TwoFaOwnerUid } from '../ITwoFa';

export interface ITwoFaCreateDto extends ITraceable {
    type: string;
    ownerUid: TwoFaOwnerUid;
}

export interface ITwoFaCreateDtoResponse<T = any> {
    type: string;
    details: T;
}
