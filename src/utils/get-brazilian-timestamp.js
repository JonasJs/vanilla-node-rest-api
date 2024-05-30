export function getBrazilianTimestamp() {
  const MILLISECONDS_IN_A_MINUTE = 60000;
  const MINUTES_IN_AN_HOUR = 60;
  const UTC_OFFSET_BRAZIL = -3; // Brasília Time - UTC-3

  const now = new Date();

  const utcTimeInMs = now.getTime() + (now.getTimezoneOffset() * MILLISECONDS_IN_A_MINUTE);
  const brazilOffsetInMs = UTC_OFFSET_BRAZIL * MINUTES_IN_AN_HOUR * MILLISECONDS_IN_A_MINUTE;
  const brazilTime = new Date(utcTimeInMs + brazilOffsetInMs);
  return brazilTime.toISOString();

}