export class ArrayUtils {
    public static getArrayPosition(arr: Array<any>, arrObj) {
        return arr.indexOf(arrObj);
    }

    public static getNextElement(arr: Array<any>, currentIndex: number) {
        return arr[currentIndex + 1];
    }

    public static getPreviousElement(arr: Array<any>, currentIndex: number) {
        return arr[currentIndex - 1];
    }
}