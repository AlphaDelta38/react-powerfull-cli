export interface Counter{
    [key: string]: number
}

export type FromUtoI<U> = (U extends any ? (k: U)=> void : never) extends (k: infer I) => void ? I : never

export interface IBasicOptions{
    useTypescript: boolean;
    folder: string;
    ds: boolean;
    di: boolean;
}
