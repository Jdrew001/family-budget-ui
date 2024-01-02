export interface CircleGaugeModel {
    minValue: number;
    maxValue: number;
    currentValue: number;
    showRed: boolean;
    icon?: string;
    size?: string;
    text?: string;
}