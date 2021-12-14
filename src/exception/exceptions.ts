import { ConflictException } from "@nestjs/common";

export class UsernameAlreadyExistsException extends ConflictException {
    constructor() {
        super("Username is already in use");
    }
}
