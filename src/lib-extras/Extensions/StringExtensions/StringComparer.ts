class StringComparer {
    public static default(a: string, b: string): number {
        a = "" + a;
        b = "" + b;

        return ObjectComparer.default(a, b);
    }

    public static ignoreCase(a: string, b: string): number {
        a = ("" + a).toUpperCase();
        b = ("" + b).toUpperCase();

        return StringComparer.default(a, b);
    }
}

class StringEqualityComparer {
    public static default(a: any, b: any): boolean {
        return StringComparer.default(a, b) === 0;
    }

    public static ignoreCase(a: any, b: any): boolean {
        return StringComparer.ignoreCase(a, b) === 0;
    }
}