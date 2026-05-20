import { nanoid } from '@reduxjs/toolkit';
import type { Application, ApplicationStatus } from '@/types';
import { delay } from './helpers';

export interface CreateApplicationDto {
  jobId: string;
  chefId: string;
  message: string;
}

export const applicationsApi = {
  create: (dto: CreateApplicationDto): Promise<Application> =>
    delay(400, () => ({
      id: `app-${nanoid(8)}`,
      jobId: dto.jobId,
      chefId: dto.chefId,
      message: dto.message,
      status: 'applied',
      appliedAt: new Date().toISOString(),
    })),

  updateStatus: (id: string, status: ApplicationStatus): Promise<{ id: string; status: ApplicationStatus }> =>
    delay(300, () => ({ id, status })),

  remove: (id: string): Promise<{ id: string }> => delay(300, () => ({ id })),
};
