
export interface FABStatus<T> {
    opened: boolean;
    currentValue: T;
    position: FABPosition;
}

export interface FABPosition {
    horizontal: 'center' | 'end' | 'start';
    vertical: 'bottom' | 'center' | 'top';
    side: 'bottom' | 'end' | 'start' | 'top';
}
