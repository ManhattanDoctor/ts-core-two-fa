import { ITraceable } from '@ts-core/common/trace';

export interface ITwoFaResetFinishDto extends ITraceable {
    resetUid: string;
}


export type ITwoFaResetFinishDtoResponse = string;
