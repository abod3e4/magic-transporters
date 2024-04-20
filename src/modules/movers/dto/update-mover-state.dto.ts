import { IsEnum, IsNotEmpty } from 'class-validator';
import { QuestState } from '../enums/quest-state.enum';

export class UpdateMoverStateDto {
    @IsEnum(QuestState, {
        message:
            'The value should be on of ' +
            Object.values(QuestState).join(' , '),
    })
    @IsNotEmpty({ message: 'questState should not be empty.' })
    questState: QuestState;
}
