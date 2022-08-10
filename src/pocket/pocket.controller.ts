import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PocketService } from './pocket.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('pocket')
export class PocketController {
  constructor(private readonly pocketSevice: PocketService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createPocketItem(
    @Body('owner') owner: string,
    @Body('link') link: string,
    @Body('name') name: string,
  ): Promise<any> {
    try {
      const result = await this.pocketSevice.insertPocketItem(
        owner,
        link,
        name,
      );
      return {
        msg: 'Created',
        pocketItem: result,
      };
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/all/:id')
  @HttpCode(HttpStatus.OK)
  async getPocket(@Param('id') id): Promise<any> {
    try {
      const result = await this.pocketSevice.getPocket(id);

      if (!result || !result[0]) {
        throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        return;
      }
      return {
        msg: 'User pocket',
        pocket: result,
      };
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async deletePocketItem(@Param('id') id): Promise<any> {
    try {
      const result = await this.pocketSevice.deletePocketItem(id);
      if (!result) {
        throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
        return;
      }
      return {
        msg: 'Deleted',
        pocket: result,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
