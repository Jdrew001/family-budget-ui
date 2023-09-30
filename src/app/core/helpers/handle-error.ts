import { EMPTY } from "rxjs";

export class HandleErrorHelper {
    public static handleError(error: any) {
        console.error('An error occurred', error);
        return EMPTY;
    }
}