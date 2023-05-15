export declare type HEXValue = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "A" | "B" | "C" | "D" | "E" | "F";
export declare type GUIDValue = [
    [
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue
    ],
    [
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue
    ],
    [
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue
    ],
    [
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue
    ],
    [
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue,
        HEXValue
    ]
];
export declare class GUID {
    value: GUIDValue;
    constructor();
    private hex;
    toString(): string;
}
