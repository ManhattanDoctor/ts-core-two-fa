import { ITraceable } from '@ts-core/common/trace';
import { IPaginable, IPagination } from '@ts-core/common/dto';
import { ITwoFa } from '../ITwoFa';

export interface ITwoFaListDto extends IPaginable<ITwoFa>, ITraceable {}
export interface ITwoFaListDtoResponse extends IPagination<ITwoFa> {}
