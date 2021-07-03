import { BanishCommand } from "./banish/BanishCommand";
import { ICommand } from "./ICommand";

// Base file that exports all created coommands (this case only one)

const commands: ICommand[] = [
    new BanishCommand()
];

export {
    commands
};