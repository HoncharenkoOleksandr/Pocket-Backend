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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pocket')
export class PocketController {
  constructor(private readonly pocketSevice: PocketService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createPocketItem(
    @Body('owner') owner: string,
    @Body('link') link: string,
    @Body('name') name: string,
  ): Promise<any> {
    try {
      const result: any = await this.pocketSevice.insertPocketItem(
        owner,
        link,
        name,
      );

      if (result?.errors) {
        return {
          msg: 'Failed',
          pocketItem: result,
        };
      }

      return {
        msg: 'Created',
        pocketItem: result,
      };
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getPocket(@Param('id') id): Promise<any> {
    try {
      const result = await this.pocketSevice.getPocket('asd');

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
      return e;
    }
  }

  @UseGuards(JwtAuthGuard)
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
      return e;
    }
  }
}
