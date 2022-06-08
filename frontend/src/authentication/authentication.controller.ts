import { Get, Param, Controller, StreamableFile, Header, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CodeDto } from './dto/code.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post()
  async authenticate(@Body() codeDto: CodeDto): Promise<any> {
    return this.authenticationService.authenticate(codeDto.code);
  }
}
