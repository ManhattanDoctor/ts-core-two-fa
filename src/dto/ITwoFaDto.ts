import { ITraceable } from '@ts-core/common/trace';

export interface ITwoFaDto extends ITraceable {
    type: string;
    token: string;
}
