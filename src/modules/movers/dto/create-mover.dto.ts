import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMoverDto {
    @IsNumber({}, { message: 'weight Limit should be number.' })
    @IsNotEmpty({ message: 'weight Limit should not be empty.' })
    weightLimit: number;

    @IsNumber({}, { message: 'Energy should be number.' })
    @IsNotEmpty({ message: 'Energy should not be empty.' })
    energy: number;
}
