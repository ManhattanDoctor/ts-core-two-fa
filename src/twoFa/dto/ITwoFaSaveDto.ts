import { TwoFaOwnerUid } from '../ITwoFa';
import { ITwoFaDto } from './ITwoFaDto';

export interface ITwoFaSaveDto extends ITwoFaDto {
    ownerUid: TwoFaOwnerUid;
}

export type ITwoFaSaveDtoResponse = void;
