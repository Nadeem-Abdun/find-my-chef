import { delay } from './helpers';

export interface ContactDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactApi = {
  send: (dto: ContactDto): Promise<{ ok: true }> => delay(500, () => {
    console.info('[mock contact] received', dto);
    return { ok: true };
  }),
};
