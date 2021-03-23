import { ITraceable } from '@ts-core/common/trace';
import { ITwoFa, TwoFaOwnerUid } from '../ITwoFa';

export interface ITwoFaResetStartDto extends ITraceable {
    ownerUid: TwoFaOwnerUid;
    type: string;
}

export type ITwoFaResetStartDtoResponse = string;
