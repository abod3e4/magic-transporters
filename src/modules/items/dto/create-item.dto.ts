import { IsNotEmpty, IsNumber, IsString,  } from 'class-validator';

export class CreateItemDto {
    @IsString({ message: 'Name should be string.' })
    @IsNotEmpty({ message: 'Name should not be empty.' })
    name: string;

    @IsNumber({},{ message: 'weight should be number.' })
    @IsNotEmpty({ message: 'weight should not be empty.' })
    weight: number;
}
