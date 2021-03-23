import { ITraceable } from '@ts-core/common/trace';
import { ITwoFa } from '../ITwoFa';

export interface ITwoFaResetFinishDto extends ITraceable {
    resetUid: string;
}


export type ITwoFaResetFinishDtoResponse = ITwoFa;
