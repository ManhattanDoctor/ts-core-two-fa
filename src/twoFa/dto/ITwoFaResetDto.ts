import { TwoFaOwnerUid } from '../ITwoFa';
import { ITwoFaDto } from './ITwoFaDto';

export interface ITwoFaResetDto extends ITwoFaDto {
    ownerUid: TwoFaOwnerUid;
}

export type ITwoFaResetDtoResponse = void;
