export class TimeoutHelpers {
    public static sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}