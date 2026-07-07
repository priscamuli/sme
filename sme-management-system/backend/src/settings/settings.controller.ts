import { Body, Controller, Get, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {

  constructor(
    private readonly settingsService: SettingsService,
  ) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  update(@Body() body: any) {
    return this.settingsService.update(body);
  }

}
