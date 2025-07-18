/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let repo: Repository<Invoice>;

  const mockInvoiceRepo = {
    create: jest.fn().mockImplementation((dto: Partial<Invoice>) => dto),
    save: jest.fn().mockImplementation(invoice =>
      Promise.resolve({ id: 1, ...invoice }),
    ),
    find: jest.fn().mockResolvedValue([{ id: 1, customer: 'Acme Corp', amount: 100, status: 'paid' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getRepositoryToken(Invoice),
          useValue: mockInvoiceRepo,
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    repo = module.get<Repository<Invoice>>(getRepositoryToken(Invoice));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an invoice', async () => {
    const dto: CreateInvoiceDto = { customer: 'Acme Corp', amount: 500, status: 'pending' };
    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(repo.save).toHaveBeenCalledWith(dto);
  });

  it('should return all invoices', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: 1, customer: 'Acme Corp', amount: 100, status: 'paid' },
    ]);
    expect(repo.find).toHaveBeenCalled();
  });
});
