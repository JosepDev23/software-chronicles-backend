import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import EntryDto from './dtos/entry.dto'
import { EntryService } from './entry.service'
import { JwtAuthGuard } from '../jwt/jwt-auth.guard'

@ApiTags('entry')
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/userId/:userId')
  @ApiOperation({ summary: 'Get entries by userId' })
  @ApiResponse({ status: 200, description: 'Entries list', type: [EntryDto] })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
    description: 'User id',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit by page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Initial index for pagination',
  })
  async getEntriesByUserId(
    @Param('userId') userId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.entryService.findByUserId(userId, limit, offset)
  }

  @Get('/lastest')
  @ApiOperation({ summary: 'Get lastest entries' })
  @ApiResponse({ status: 200 })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit by page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Initial index for pagination',
  })
  async getLastestEntries(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.entryService.findLastest(limit, offset)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new entry' })
  @ApiResponse({
    status: 201,
    description: 'Entry created successfully',
    type: EntryDto,
  })
  @ApiBody({
    type: EntryDto,
  })
  async postEntry(@Body() entryDto: EntryDto) {
    return this.entryService.save(entryDto)
  }
}
