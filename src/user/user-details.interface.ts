import { Types } from 'mongoose';

export interface UserDetails {
  id: Types.ObjectId;
  name: string;
  email: string;
}
