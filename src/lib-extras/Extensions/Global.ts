interface StringIndexable<T> {
    [key: string]: T;
}

interface NumberIndexable<T> {
    [key: number]: T;
}

interface Comparer<T> {
    (a: T, b: T): number;
}

interface EqualityComparer<T> {
    (a: T, b: T): boolean;
}