import { injectable } from "inversify";
import { ICommand } from "./ICommand";

@injectable()
export class CommandInvoker {
    
    private onBanish: ICommand | undefined;

    /**
     * Initialize command.
     */
    public setOnBanish(cmd: ICommand): void {
        this.onBanish = cmd;
    }

    public doBanish(): void {
        if (!this.onBanish) return;
        this.onBanish.execute();
    }
}