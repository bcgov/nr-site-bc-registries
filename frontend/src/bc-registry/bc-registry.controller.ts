import { Get, Param, Controller, StreamableFile, Header } from '@nestjs/common';
import { BCRegistryService } from './bc-registry.service';

@Controller('bc-registry')
export class BCRegistryController {
  constructor(private testService: BCRegistryService) {}

  @Get('download-pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=cool.pdf')
  async getTest(): Promise<any> {
    return new StreamableFile(await this.testService.getPdf());
  }

  @Get('email-pdf/:email')
  getTest2(@Param('email') email: string): Promise<any> {
    return this.testService.emailPdf(email);
  }
}
