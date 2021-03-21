import { ITraceable } from '@ts-core/common/trace';
import { TwoFaOwnerUid } from '../ITwoFa';

export interface ITwoFaResetDto extends ITraceable {
    ownerUid: TwoFaOwnerUid;
    type: string;
}

export type ITwoFaResetDtoResponse = void;
