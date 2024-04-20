import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class LoadMoverDto {
    @IsArray({ message: 'Items must be an array.' })
    @ArrayNotEmpty({ message: 'At least one item ID is required.' })
    @IsString({ each: true, message: 'Each item ID must be a string.' })
    items: [string];
}
