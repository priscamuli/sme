import { Injectable } from '@nestjs/common';
import prisma from '../prisma/client';

@Injectable()
export class SettingsService {

  async getSettings() {

    let settings = await prisma.settings.findFirst();

    if (!settings) {

      settings = await prisma.settings.create({

        data: {
          businessName: "MGhetto Retailer",
          currency: "KES",
        },

      });

    }

    return settings;

  }

  async update(data: any) {

    const settings = await prisma.settings.findFirst();

    return prisma.settings.update({

      where: {
        id: settings!.id,
      },

      data,

    });

  }

}
