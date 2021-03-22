import { ITraceable } from '@ts-core/common/trace';
import { TwoFaOwnerUid } from '../ITwoFa';

export interface ITwoFaResetStartDto extends ITraceable {
    ownerUid: TwoFaOwnerUid;
    type: string;
}

export type ITwoFaResetStartDtoResponse = string;
