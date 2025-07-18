import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>,
  ) {}

  create(dto: CreateInvoiceDto) {
    const invoice = this.invoiceRepo.create(dto);
    return this.invoiceRepo.save(invoice);
  }

  findAll() {
    return this.invoiceRepo.find();
  }

  findOne(id: number) {
    return this.invoiceRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateInvoiceDto) {
    await this.invoiceRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.invoiceRepo.delete(id);
    return { deleted: true };
  }
}
