import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import {
  ResponseNoData,
  ResponseSuccessWithData,
} from './types/tickets-response.types';
import { Tickets } from './tickets.entity';
import {
  DeleteTicketByFlightNumberType,
  DeleteTicketByIdType,
} from './types/controller-types';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get(':userId')
  async getAllTicketsForUserId(
    @Param('userId') userId: string,
  ): Promise<ResponseSuccessWithData<Tickets[]> | ResponseNoData> {
    console.log(userId);
    return this.ticketsService.getAllTicketsForUserId(userId);
  }

  @Post()
  async createTicket(
    @Body() ticket: Tickets,
  ): Promise<ResponseSuccessWithData<Tickets> | ResponseNoData> {
    return this.ticketsService.createTicket(ticket);
  }

  @Delete()
  async deleteById(
    @Body() data: DeleteTicketByIdType,
  ): Promise<ResponseNoData> {
    return this.ticketsService.deleteById(data.userId, data.ticketId);
  }

  @Delete('flight-number')
  async deleteByFlightNumber(
    @Body() data: DeleteTicketByFlightNumberType,
  ): Promise<ResponseNoData> {
    return this.ticketsService.deleteByFlightNumber(
      data.userId,
      data.flightNumber,
    );
  }
}
