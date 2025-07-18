/* eslint-disable prettier/prettier */
import { IsString, IsNumber, Min, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
    @ApiProperty({ example: 'Acme Corp' })
    @IsString({ message: 'Customer name must be a string' })
    customer: string;

    @ApiProperty({ example: 1200 })
    @IsNumber({}, { message: 'Amount must be a number' })
    @Min(1, { message: 'Amount must be greater than 0' })
    amount: number;
    
    @ApiProperty({ example: 'pending', enum: ['pending', 'paid', 'cancelled'] })
    @IsString()
    @IsIn(['pending', 'paid', 'cancelled'], {
        message: 'Status must be one of: pending, paid, cancelled',
    })
    status: string;
}
