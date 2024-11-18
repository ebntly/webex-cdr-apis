import { Entity } from "@loopback/repository";
import { CdrEntry, ConvergedRecording } from "webex-data/dist/models";

export interface Page<T> {
  data: T[];
  total: number;
  pages: {
    total: number;
    size: number;
    current: number;
    next?: number;
    prev?: number;
  }
}

export interface Timeline {
  type: CDRReason;
  time: string;
  title: string;
  duration: string;
  description: string;
  entry: Omit<CdrEntry, keyof Entity>;
  reportIds: string[];
}
export type CDRReason = 
  | ''
  | 'Unconditional'
  | 'NoAnswer'
  | 'TimeOfDay'
  | 'UserBusy'
  | 'FollowMe'
  | 'HuntGroup'
  | 'Unrecognized'
  | 'Unknown'
  | 'ImplicitId'
  | 'Deflection'
  | 'Unavailable'
  | 'CallQueue'
  | 'Unknown'
  | 'ExplicitId';