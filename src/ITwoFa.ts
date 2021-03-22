export interface ITwoFa {
    id: number;
    type: string;
    ownerUid: TwoFaOwnerUid;
    readonly isEnabled: boolean;
}

export declare type TwoFaOwnerUid = number | string;
