import { ApiProperty } from "@nestjs/swagger";

export class CreateHabitDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly userId: number;
}
