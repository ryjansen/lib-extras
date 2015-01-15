class ObjectComparer {
    public static default: Comparer<any> = function (a: any, b: any): number {
        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0;
    }
}

class ObjectEqualityComparer {
    public static default: EqualityComparer<any> = function (a: any, b: any): boolean {
        return a === b;
    }
}
