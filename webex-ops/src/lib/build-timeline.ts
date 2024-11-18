import { Entity } from "@loopback/repository";
import { CDRReason, Timeline } from "./types";
import { CdrEntry } from "webex-data/dist/models";



export function buildTimeline(cdrEntries: CdrEntry[]): Timeline[] {
  const merged = mergeTimeline(cdrEntries);
  const timeline = merged.map((entry) => getTimelineItem(entry));

  return timeline.sort((a, b) => a.reportIds.length - b.reportIds.length);
}

const numberMap: Record<string, string> = {
  '8880': 'Contact Center Queue',
  '8881': 'CD Queue',
  '9999': 'Voicemail',
}

const nullEntry: Omit<CdrEntry, keyof Entity> = {
  id: '',
  answerIndicator: '',
  answerTime: '',
  answered: '',
  authCode: '',
  callId: '',
  callOutcome: '',
  callOutcomeReason: '',
  callTransferTime: '',
  callType: '',
  calledLineId: '',
  calledNumber: '',
  callingLineId: '',
  callingNumber: '',
  clientType: '',
  clientVersion: '',
  correlationId: '',
  departmentId: '',
  deviceMac: '',
  direction: '',
  duration: 0,
  finalLocalSessionId: '',
  finalRemoteSessionId: '',
  inboundTrunk: '',
  intlCountry: '',
  localCallId: '',
  localSessionId: '',
  location: '',
  model: '',
  networkCallId: '',
  orgUuid: '',
  originalReason: '',
  osType: '',
  outboundTrunk: '',
  pstnEntity: '',
  pstnProviderId: '',
  pstnProviderName: '',
  pstnOrgId: '',
  redirectReason: '',
  redirectingNumber: '',
  relatedCallId: '',
  relatedReason: '',
  releaseTime: '',
  releasingParty: '',
  remoteCallId: '',
  remoteSessionId: '',
  reportId: '',
  reportTime: '',
  ringDuration: 0,
  siteMainNumber: '',
  siteUuid: '',
  startTime: '',
  subClientType: '',
  transferRelatedCallId: '',
  userNumber: '',
  userType: '',
  userUuid: '',
};

const messageMap: Record<CDRReason, (calling: string, called: string) => string> = {
  '': (calling, called) => `Call from ${calling} to ${called}`,
  Unconditional: (calling, called) => `Forwarded (all) ${calling} to  ${called}`,
  NoAnswer: (calling, called) => `Forwarded (no answer) ${calling} to ${called}`,
  TimeOfDay: (calling, called) => `TimeOfDay :${calling} => ${called}`,
  UserBusy: (calling, called) => `Forwarded (user busy) ${calling} to ${called}`,
  FollowMe: (calling, called) => `FollowMe :${calling} => ${called}`,
  HuntGroup: (calling, called) => `HuntGroup :${calling} => ${called}`,
  Unrecognized: (calling, called) => `Unrecognized :${calling} => ${called}`,
  Unknown: (calling, called) => `Unknown :${calling} => ${called}`,
  ImplicitId: (calling, called) => `ImplicitId :${calling} => ${called}`,
  Deflection: (calling, called) => `Call from ${calling} transferred to ${called}`,
  Unavailable: (calling, called) => `Call from ${calling} bounced to ${called}`,
  CallQueue: (calling, called) => `Call from ${calling} queued to ${called}`,
  ExplicitId: (calling, called) => `ExplicitId :${calling} => ${called}`,
};

function mergeTimeline(cdrEntries: CdrEntry[]) {
  cdrEntries = cdrEntries.reverse().sort((a, b) => {
    return new Date(a.answerTime || a.releaseTime).getTime() - new Date(b.answerTime || b.releaseTime).getTime();
  });

  return cdrEntries.reduce((acc, cdrEntry) => {
    const { remoteCallId, localCallId } = cdrEntry;
    const related = acc.find((item) => item[0].localCallId === remoteCallId || item[0].remoteCallId === localCallId);

    if (related) {
      related.push(cdrEntry);

      return acc;
    } 

    acc.push([cdrEntry]);

    return acc;
  }, [] as ([CdrEntry, CdrEntry] | [CdrEntry])[]);
}


function getTimelineItem(entries: ([CdrEntry, CdrEntry] | [CdrEntry])): Timeline {
  if(entries.length === 1) {
    return getTimelineItem([entries[0], entries[0]]);
  }
  
  const [first, second] = entries;
  const [calling, called] = getNameOrNumber(first, second);
  const type = (first.originalReason === second.originalReason ? first.originalReason : 'Unknown') as CDRReason;
  const time = first.answerTime === second.answerTime ? new Date(first.answerTime || first.releaseTime).toLocaleString() : `${new Date(first.answerTime || first.releaseTime).toLocaleString()} - ${new Date(second.answerTime || second.releaseTime).toLocaleString()}`;
  const description = messageMap[type](calling, called);
  
  return {
    type,
    time: new Date(first.answerTime || first.releaseTime).toLocaleString(),
    title: time,
    duration: convertSecondsToTime(first.duration || 0),
    description,
    entry: first,
    reportIds: entries.map((entry) => entry.reportId).reduce((acc, id) => id ? acc.includes(id) ? acc : [...acc, id] : acc, [] as string[]),
  }
}
function convertSecondsToTime(seconds: number) {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function cleanNumber(num: string) {
  const cleaned = num.replace(/^\+[\d]{7}([\d{4}])/, '$1');

  return cleaned;
}

function getNameOrNumber(entry: CdrEntry, entryB?: CdrEntry): [string, string] {
  const { calledLineId: aCalledId, calledNumber: aCalledNumber, callingLineId: aCallingId, callingNumber: aCallingNumber } = entry;

  const called = aCalledId && aCalledId !== 'NA' ? aCalledId : cleanNumber(aCalledNumber || "");
  const calling = aCallingId && aCallingId !== 'NA' ? aCallingId : cleanNumber(aCallingNumber || "");
  
  if (!entryB) { 
    return [calling, called];
  }

  const { calledLineId: bCalledId, calledNumber: bCalledNumber, callingLineId: bCallingId, callingNumber: bCallingNumber } = entryB;

  const bCalled = bCalledId && bCalledId !== 'NA' ? bCalledId : cleanNumber(bCalledNumber || "");
  const bCalling = bCallingId && bCallingId !== 'NA' ? bCallingId : cleanNumber(bCallingNumber || "");

  const selectCalled = [called, bCalled].find((c) => !/[0-9]{4}/.test(c));
  const selectCalling = [calling, bCalling].find((c) => !/[0-9]{4}/.test(c));

  const calledText = numberMap[selectCalled || bCalled] || selectCalled || bCalled;
  const callingText =numberMap[selectCalling || bCalling] || selectCalling || bCalling;


  return [callingText, calledText];
}