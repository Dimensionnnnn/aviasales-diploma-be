import { InjectRepository } from '@nestjs/typeorm';
import { Tickets } from './tickets.entity';
import { Repository } from 'typeorm';
import {
  ResponseNoData,
  ResponseSuccessWithData,
} from './types/tickets-response.types';

export class TicketsService {
  constructor(
    @InjectRepository(Tickets)
    private ticketsRepository: Repository<Tickets>,
  ) {}

  async getAllTicketsForUserId(
    id: string,
  ): Promise<ResponseSuccessWithData<Tickets[]> | ResponseNoData> {
    const tickets = await this.ticketsRepository.find({
      where: { userId: id },
    });

    if (!tickets) {
      return {
        success: false,
        message: 'Tickets not found',
      };
    }

    return {
      success: true,
      message: 'Tickets found',
      data: tickets,
    };
  }

  async createTicket(
    ticket: Tickets,
  ): Promise<ResponseSuccessWithData<Tickets> | ResponseNoData> {
    const count = await this.ticketsRepository.count({
      where: { userId: ticket.userId },
    });

    if (count >= 10) {
      return {
        success: false,
        message: 'User cannot create more than 10 tickets',
      };
    }

    await this.ticketsRepository.create(ticket);
    const ticketCreated = await this.ticketsRepository.save(ticket);

    if (!ticketCreated) {
      return {
        success: false,
        message: 'Ticket not created',
      };
    }

    return {
      success: true,
      message: 'Ticket created',
      data: ticketCreated,
    };
  }

  async deleteById(userId: string, ticketId: string): Promise<ResponseNoData> {
    const response = await this.ticketsRepository.find({
      where: { userId: userId },
    });

    if (response) {
      const ticket = response.find((ticket) => ticket.id === ticketId);

      if (ticket) {
        await this.ticketsRepository.remove(ticket);

        return {
          success: true,
          message: 'Ticket deleted',
        };
      } else {
        return {
          success: false,
          message: 'Ticket not found for this user',
        };
      }
    }

    return {
      success: false,
      message: 'User has no tickets or an error occurred',
    };
  }

  async deleteByFlightNumber(
    userId: string,
    flightNumber: string,
  ): Promise<ResponseNoData> {
    const response = await this.ticketsRepository.find({
      where: { userId: userId },
    });

    if (response) {
      const ticket = response.find(
        (ticket) => ticket.flight_number === flightNumber,
      );

      if (ticket) {
        await this.ticketsRepository.remove(ticket);

        return {
          success: true,
          message: 'Ticket deleted',
        };
      } else {
        return {
          success: false,
          message: 'Ticket not found for this user',
        };
      }
    }

    return {
      success: false,
      message: 'User has no tickets or an error occurred',
    };
  }
}
