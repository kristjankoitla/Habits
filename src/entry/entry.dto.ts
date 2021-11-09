import { ApiProperty } from "@nestjs/swagger";

export class CreateEntryDto {
    @ApiProperty()
    readonly date: Date;

    @ApiProperty()
    readonly habitId: number;
}
