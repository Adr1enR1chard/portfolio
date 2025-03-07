import { LoadedObject } from "../abstracts/LoadedObject";
export class Logo extends LoadedObject {
    public url: string;

    constructor(path: string, url: string) {
        super(path);
        this.url = url;
    }

    public onMouseClick() {
        window.open(this.url, '_blank')?.focus();
    }

}