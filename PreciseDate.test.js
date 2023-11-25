const PreciseDate = require("./PreciseDate");

const tests = [

    // Constructor Tests
    ["PreciseDate constructor with no arguments creates a Date object", () => {
        const date = new PreciseDate();
        return date instanceof Date;
    }],
    ["PreciseDate constructor with date string matches the provided date", () => {
        const dateString = "2023-01-01";
        const date = new PreciseDate(dateString);
        return date.toISOString().substring(0, 10) === dateString;
    }],
    ["PreciseDate constructor with milliseconds since Unix Epoch matches the correct date", () => {
        const millis = 1672531200000; // Corresponds to 2023-01-01
        const date = new PreciseDate(millis);
        return date.getFullYear() === 2023 && date.getMonth() === 0 && date.getDate() === 1;
    }],
    ["PreciseDate constructor with ISO date string", () => {
        const dateString = '2023-01-01T00:00:00.000000000Z';
        const date = new PreciseDate(dateString);
        return date.toISOString() === dateString;
    }],
    ["PreciseDate constructor with invalid date string returns 'Invalid Date'", () => {
        const date = new PreciseDate("invalid-date");
        return isNaN(date.getTime());
    }],
    ["PreciseDate constructor with year, month, day, hours, minutes, seconds, milliseconds", () => {
        const date = new PreciseDate(2023, 0, 1, 15, 30, 45, 123); // January 1, 2023, 15:30:45.123
        return date.getFullYear() === 2023 && date.getMonth() === 0 && date.getDate() === 1 &&
               date.getHours() === 15 && date.getMinutes() === 30 && date.getSeconds() === 45 &&
               date.getMilliseconds() === 123;
    }],
    ["getDate returns the day of the month", () => {
        const date = new PreciseDate("2023-01-15");
        return date.getDate() === 15;
    }],
    ["setDate changes the day of the month", () => {
        const date = new PreciseDate("2023-01-01");
        date.setDate(15);
        return date.getDate() === 15;
    }],
    ["getMonth returns the month (0-indexed)", () => {
        const date = new PreciseDate("2023-06-15");
        return date.getMonth() === 5; // June is month 5 (0-indexed)
    }],
    ["setMonth changes the month", () => {
        const date = new PreciseDate("2023-01-01");
        date.setMonth(5); // Setting to June (0-indexed)
        return date.getMonth() === 5;
    }],
    ["getFullYear returns the year", () => {
        const date = new PreciseDate("2023-01-01");
        return date.getFullYear() === 2023;
    }],
    ["setFullYear changes the year", () => {
        const date = new PreciseDate("2023-01-01");
        date.setFullYear(2024);
        return date.getFullYear() === 2024;
    }],
    ["getDay returns the correct day of the week", () => {
        const date = new PreciseDate("2023-11-22"); // Nov 22, 2023, is a Wednesday
        return date.getDay() === 3; // Sunday is 0, Wednesday is 3
    }],
    ["setHours changes hours and reflects in getTime", () => {
        const date = new PreciseDate("2023-01-01");
        date.setHours(12); // Setting hours to 12 noon
        return date.getHours() === 12;
    }],
    ["toDateString returns a readable date string", () => {
        const date = new PreciseDate("2023-01-01");
        return typeof date.toDateString() === "string";
    }],
    ["Checking if setting minutes reflects correctly", () => {
        const date = new PreciseDate("2023-01-01T00:00:00Z");
        date.setMinutes(30);
        return date.getMinutes() === 30;
    }],
    ["getUTCFullYear correctly returns the UTC year", () => {
        const date = new PreciseDate("2023-12-31T23:00:00Z"); // Depending on the timezone, this might be 2024
        return date.getUTCFullYear() === 2023;
    }],
    ["toLocaleDateString returns a string for specific locale", () => {
        const date = new PreciseDate("2023-01-01");
        return typeof date.toLocaleDateString('en-US') === 'string';
    }],
    ["setSeconds and getSeconds work correctly", () => {
        const date = new PreciseDate("2023-01-01T00:00:00Z");
        date.setSeconds(30);
        return date.getSeconds() === 30;
    }],
    ["setMilliseconds and getMilliseconds work correctly", () => {
        const date = new PreciseDate();
        date.setMilliseconds(123);
        return date.getMilliseconds() === 123;
    }],
    ["valueOf returns the primitive value of a Date object", () => {
        const date = new PreciseDate("2023-01-01T00:00:00Z");
        return typeof date.valueOf() === 'number';
    }],
    ["PreciseDate.now returns a number", () => {
        return typeof PreciseDate.now() === "bigint";
    }],
    ["PreciseDate.parse with valid date string", () => {
        const timestamp = PreciseDate.parse("2023-01-01T00:00:00.000Z");
        return typeof timestamp === "number" && !isNaN(timestamp);
    }],
    ["PreciseDate.UTC for specific date and time", () => {
        const utcMillis = PreciseDate.UTC(2023, 0, 1); // 2023-01-01 UTC
        const date = new PreciseDate(utcMillis);
        return date.getUTCFullYear() === 2023 && date.getUTCMonth() === 0 && date.getUTCDate() === 1;
    }],
    ["PreciseDate.parse handles invalid date string", () => {
        return isNaN(PreciseDate.parse("This is not a date"));
    }],
    ["PreciseDate.UTC handles leap year date", () => {
        const leapYear = PreciseDate.UTC(2024, 1, 29); // 2024-02-29
        const date = new PreciseDate(leapYear);
        return date.getUTCFullYear() === 2024 && date.getUTCMonth() === 1 && date.getUTCDate() === 29;
    }],
    ["PreciseDate.now returns a value greater than a past timestamp", () => {
        const past = 1609459200000; // Jan 1, 2021
        return PreciseDate.now() > past;
    }],
    ["PreciseDate.UTC returns correct timestamp for a specific date", () => {
        const utcTimestamp = PreciseDate.UTC(2023, 0, 1); // Jan 1, 2023
        const date = new PreciseDate(utcTimestamp);
        return date.getUTCFullYear() === 2023 && date.getUTCMonth() === 0 && date.getUTCDate() === 1;
    }],
    ["PreciseDate.parse recognizes leap year", () => {
        return !isNaN(PreciseDate.parse("2024-02-29")); // 2024 is a leap year
    }],
    ["PreciseDate.UTC handles edge case of year transition", () => {
        const newYearEve = PreciseDate.UTC(2023, 11, 31, 23, 59, 59); // Dec 31, 2023, 23:59:59
        const newYear = new PreciseDate(newYearEve);
        return newYear.getUTCFullYear() === 2023 && newYear.getUTCMonth() === 11 && newYear.getUTCDate() === 31;
    }],
    ["Leap year date handling", () => {
        const date = new PreciseDate("2024-02-29");
        return date.getFullYear() === 2024 && date.getMonth() === 1 && date.getDate() === 29;
    }],
    ["Timezone offset is a number", () => {
        const date = new PreciseDate();
        return typeof date.getTimezoneOffset() === "number";
    }],
    ["Handling date string with time and timezone", () => {
        const date = new PreciseDate("2023-01-01T12:00:00-05:00"); // EST timezone
        return date.getHours() !== 12; // Hours will differ if not in EST
    }],
    ["Setting dates beyond usual ranges (e.g., 32nd day)", () => {
        const date = new PreciseDate("2023-01-01");
        date.setDate(32); // Setting to 32nd day of January
        return date.getMonth() === 1 && date.getDate() === 1; // Should roll over to February 1st
    }],
    ["Handling extremely future dates", () => {
        const futureDate = new PreciseDate("9999-12-31T23:59:59Z");
        return futureDate.getFullYear() === 9999;
    }],
    ["Handling dates around Daylight Saving Time start", () => {
        const beforeDST = new PreciseDate("2023-03-12T01:59:59Z");
        const afterDST = new PreciseDate("2023-03-12T03:00:00Z");
        return beforeDST.getHours() !== afterDST.getHours(); // DST affects the hour
    }],
    ["Setting invalid month rolls over to next year", () => {
        const date = new PreciseDate("2023-01-01");
        date.setMonth(12); // Invalid month (13th month)
        return date.getFullYear() === 2024 && date.getMonth() === 0; // Should roll over to January 2024
    }],
    ["PreciseDate constructor with no arguments creates a Date object", () => {
        const date = new PreciseDate();
        return date instanceof Date;
    }],
    ["PreciseDate constructor with timestamp creates a Date object", () => {
        const timestamp = PreciseDate.now();
        const date = new PreciseDate(timestamp);
        return date instanceof Date && date.getTime() === timestamp;
    }],
    ["PreciseDate constructor with date string creates a Date object", () => {
        const dateString = "2023-01-01";
        const date = new PreciseDate(dateString);
        return date instanceof Date && date.toISOString().startsWith("2023-01-01");
    }],
    ["PreciseDate constructor with year, month, etc. creates a Date object", () => {
        const date = new PreciseDate(2023, 0, 1, 0, 0, 0, 0); // Jan 1, 2023
        return date instanceof Date && date.getFullYear() === 2023 && date.getMonth() === 0;
    }],
    ["PreciseDate.parse() with a valid date string returns a number", () => {
        return typeof PreciseDate.parse("2023-01-01") === 'number';
    }],
    ["PreciseDate.UTC() with valid arguments returns a number", () => {
        return typeof PreciseDate.UTC(2023, 0, 1) === 'number';
    }],
    ["getDate() returns a number between 1 and 31", () => {
        const date = new PreciseDate();
        return date.getDate() >= 1 && date.getDate() <= 31;
    }],
    ["getDay() returns a number between 0 and 6", () => {
        const date = new PreciseDate();
        return date.getDay() >= 0 && date.getDay() <= 6;
    }],
    ["getFullYear() returns a four-digit number", () => {
        const date = new PreciseDate();
        return date.getFullYear() >= 1000 && date.getFullYear() <= 9999;
    }],
    ["getHours() returns a number between 0 and 23", () => {
        const date = new PreciseDate();
        return date.getHours() >= 0 && date.getHours() <= 23;
    }],
    ["getMilliseconds() returns a number between 0 and 999", () => {
        const date = new PreciseDate();
        return date.getMilliseconds() >= 0 && date.getMilliseconds() <= 999;
    }],
    ["getMinutes() returns a number between 0 and 59", () => {
        const date = new PreciseDate();
        return date.getMinutes() >= 0 && date.getMinutes() <= 59;
    }],
    ["getMonth() returns a number between 0 and 11", () => {
        const date = new PreciseDate();
        return date.getMonth() >= 0 && date.getMonth() <= 11;
    }],
    ["getSeconds() returns a number between 0 and 59", () => {
        const date = new PreciseDate();
        return date.getSeconds() >= 0 && date.getSeconds() <= 59;
    }],
    ["getTime() returns a number", () => {
        const date = new PreciseDate();
        return typeof date.getTime() === 'bigint';
    }],
    ["getTimezoneOffset() returns a number", () => {
        const date = new PreciseDate();
        return typeof date.getTimezoneOffset() === 'number';
    }],
    ["getUTCDate() returns a number between 1 and 31", () => {
        const date = new PreciseDate();
        return date.getUTCDate() >= 1 && date.getUTCDate() <= 31;
    }],
    ["setDate() sets the day of the month", () => {
        const date = new PreciseDate();
        date.setDate(15);
        return date.getDate() === 15;
    }],
    ["toString() returns a string", () => {
        const date = new PreciseDate();
        return typeof date.toString() === 'string';
    }],
    ["valueOf() returns a number", () => {
        const date = new PreciseDate();
        return typeof date.valueOf() === 'number';
    }],
    ["PreciseDate object coerces to a number", () => {
        const date = new PreciseDate();
        return typeof (date * 1) === 'number'; // Implicit coercion
    }],

    ["getUTCDate() returns a number between 1 and 31", () => {
        const date = new PreciseDate();
        return date.getUTCDate() >= 1 && date.getUTCDate() <= 31;
    }],
    ["getUTCDay() returns a number between 0 and 6", () => {
        const date = new PreciseDate();
        return date.getUTCDay() >= 0 && date.getUTCDay() <= 6;
    }],
    ["getUTCFullYear() returns a four-digit number", () => {
        const date = new PreciseDate();
        return date.getUTCFullYear() >= 1000 && date.getUTCFullYear() <= 9999;
    }],
    ["getUTCHours() returns a number between 0 and 23", () => {
        const date = new PreciseDate();
        return date.getUTCHours() >= 0 && date.getUTCHours() <= 23;
    }],
    ["getUTCMilliseconds() returns a number between 0 and 999", () => {
        const date = new PreciseDate();
        return date.getUTCMilliseconds() >= 0 && date.getUTCMilliseconds() <= 999;
    }],
    ["getUTCMinutes() returns a number between 0 and 59", () => {
        const date = new PreciseDate();
        return date.getUTCMinutes() >= 0 && date.getUTCMinutes() <= 59;
    }],
    ["getUTCMonth() returns a number between 0 and 11", () => {
        const date = new PreciseDate();
        return date.getUTCMonth() >= 0 && date.getUTCMonth() <= 11;
    }],
    ["getUTCSeconds() returns a number between 0 and 59", () => {
        const date = new PreciseDate();
        return date.getUTCSeconds() >= 0 && date.getUTCSeconds() <= 59;
    }],
    ["toDateString() returns a string", () => {
        const date = new PreciseDate();
        return typeof date.toDateString() === 'string';
    }],
    ["toISOString() returns a string in ISO format", () => {
        const date = new PreciseDate();
        return typeof date.toISOString() === 'string' && date.toISOString().includes('T');
    }],
    ["toJSON() returns a string in JSON format", () => {
        const date = new PreciseDate();
        return typeof date.toJSON() === 'string';
    }],
    ["toLocaleDateString() returns a string", () => {
        const date = new PreciseDate();
        return typeof date.toLocaleDateString() === 'string';
    }],
    ["toLocaleString() returns a string", () => {
        const date = new PreciseDate();
        return typeof date.toLocaleString() === 'string';
    }],
    ["toLocaleTimeString() returns a string", () => {
        const date = new PreciseDate();
        return typeof date.toLocaleTimeString() === 'string';
    }],
    ["toString() returns a string", () => {
        const date = new PreciseDate();
        return typeof date.toString() === 'string';
    }],
    ["toTimeString() returns a string", () => {
        const date = new PreciseDate();
        return typeof date.toTimeString() === 'string';
    }],
    ["toUTCString() returns a string in UTC format", () => {
        const date = new PreciseDate();
        return typeof date.toUTCString() === 'string';
    }],
    ["setDate() sets the day of the month", () => {
        const date = new PreciseDate();
        date.setDate(15);
        return date.getDate() === 15;
    }],
    ["setFullYear() sets the year", () => {
        const date = new PreciseDate();
        date.setFullYear(2023);
        return date.getFullYear() === 2023;
    }],
    ["setHours() sets the hours", () => {
        const date = new PreciseDate();
        date.setHours(12);
        return date.getHours() === 12;
    }],
    ["setMilliseconds() sets the milliseconds", () => {
        const date = new PreciseDate();
        date.setMilliseconds(500);
        return date.getMilliseconds() === 500;
    }],
    ["setMinutes() sets the minutes", () => {
        const date = new PreciseDate();
        date.setMinutes(30);
        return date.getMinutes() === 30;
    }],
    ["setMonth() sets the month", () => {
        const date = new PreciseDate();
        date.setMonth(5); // June (0-indexed)
        return date.getMonth() === 5;
    }],
    ["setSeconds() sets the seconds", () => {
        const date = new PreciseDate();
        date.setSeconds(45);
        return date.getSeconds() === 45;
    }],
    ["setTime() sets the time in milliseconds since January 1, 1970", () => {
        const timestamp = PreciseDate.now();
        const date = new PreciseDate();
        date.setTime(timestamp);
        return date.getTime() === timestamp;
    }],
    ["setUTCDate() sets the day of the month in UTC", () => {
        const date = new PreciseDate();
        date.setUTCDate(15);
        return date.getUTCDate() === 15;
    }],
    ["setUTCFullYear() sets the full year in UTC", () => {
        const date = new PreciseDate();
        date.setUTCFullYear(2023);
        return date.getUTCFullYear() === 2023;
    }],
    ["setUTCHours() sets the hours in UTC", () => {
        const date = new PreciseDate();
        date.setUTCHours(12);
        return date.getUTCHours() === 12;
    }],
    ["setUTCMilliseconds() sets the milliseconds in UTC", () => {
        const date = new PreciseDate();
        date.setUTCMilliseconds(500);
        return date.getUTCMilliseconds() === 500;
    }],
    ["setUTCMinutes() sets the minutes in UTC", () => {
        const date = new PreciseDate();
        date.setUTCMinutes(30);
        return date.getUTCMinutes() === 30;
    }],
    ["setUTCMonth() sets the month in UTC", () => {
        const date = new PreciseDate();
        date.setUTCMonth(5); // June (0-indexed)
        return date.getUTCMonth() === 5;
    }],
    ["setUTCSeconds() sets the seconds in UTC", () => {
        const date = new PreciseDate();
        date.setUTCSeconds(45);
        return date.getUTCSeconds() === 45;
    }],
    ["PreciseDate constructor with no arguments creates a PreciseDate object", () => {
        const date = new PreciseDate();
        return date instanceof PreciseDate;
    }],
    ["PreciseDate constructor with string argument parses date correctly", () => {
        const isoString = "2023-01-01T12:00:00.123456789Z";
        const date = new PreciseDate(isoString);
        return date instanceof PreciseDate && date.toISOString() === isoString;
    }],
    ["PreciseDate constructor with PreciseDate argument copies date correctly", () => {
        const original = new PreciseDate("2023-01-01T12:00:00.123456789Z");
        const copy = new PreciseDate(original);
        return copy instanceof PreciseDate && original.getTime() === copy.getTime();
    }],
    ["Setting and getting microseconds works correctly", () => {
        const date = new PreciseDate();
        date.setMicroseconds(500);
        return date.getMicroseconds() === 500;
    }],
    ["Setting and getting nanoseconds works correctly", () => {
        const date = new PreciseDate();
        date.setNanoseconds(789);
        return date.getNanoseconds() === 789;
    }],
    ["toISOString returns correct string with microseconds and nanoseconds", () => {
        const date = new PreciseDate(2023, 0, 1, 12, 0, 0, 0, 123, 456);
        return date.toISOString() === "2023-01-01T12:00:00.000123456Z";
    }],
    ["getTime returns bigint representing the precise time", () => {
        const date = new PreciseDate(2023, 0, 1, 12, 0, 0, 0, 123, 456);
        const time = date.getTime();
        return typeof time === 'bigint' && time.toString().endsWith("123456");
    }],
    ["PreciseDate constructor with Date instance argument creates a correct PreciseDate object", () => {
        const originalDate = new Date("2023-01-01T12:00:00Z");
        const preciseDate = new PreciseDate(originalDate);
        return preciseDate instanceof PreciseDate && 
               Number(preciseDate.getTime() / BigInt(1e6)) === originalDate.getTime();
    }],
    ["PreciseDate constructor with number argument creates a correct PreciseDate object", () => {
        const timestamp = Date.now();
        const preciseDate = new PreciseDate(timestamp);
        return preciseDate instanceof PreciseDate && preciseDate.getTime() === BigInt(timestamp) * BigInt(1e6);
    }],
    ["PreciseDate constructor with bigint argument creates a correct PreciseDate object", () => {
        const bigintTimestamp = BigInt(Date.now()) * BigInt(1e6);
        const preciseDate = new PreciseDate(bigintTimestamp);
        return preciseDate instanceof PreciseDate && preciseDate.getTime() === bigintTimestamp;
    }],
    ["PreciseDate constructor with multiple arguments creates a correct PreciseDate object", () => {
        const preciseDate = new PreciseDate(2023, 0, 1, 12, 0, 0, 0, 123, 456);
        return preciseDate instanceof PreciseDate && preciseDate.getMicroseconds() === 123 && preciseDate.getNanoseconds() === 456;
    }],
    ["setMicroseconds with invalid value sets time to NaN", () => {
        const preciseDate = new PreciseDate();
        preciseDate.setMicroseconds(NaN);
        return isNaN(preciseDate.getTime());
    }],
    ["setNanoseconds with invalid value sets time to NaN", () => {
        const preciseDate = new PreciseDate();
        preciseDate.setNanoseconds(NaN);
        return isNaN(preciseDate.getTime());
    }],
    ["Setting microseconds rolls over milliseconds correctly", () => {
        const preciseDate = new PreciseDate(2023, 0, 1, 12, 0, 0, 0);
        preciseDate.setMicroseconds(1000);
        return preciseDate.getMicroseconds() === 0 && preciseDate.getMilliseconds() === 1;
    }],
    ["Setting nanoseconds rolls over microseconds correctly", () => {
        const preciseDate = new PreciseDate(2023, 0, 1, 12, 0, 0, 0, 0, 999);
        preciseDate.setNanoseconds(1000);
        return preciseDate.getNanoseconds() === 0 && preciseDate.getMicroseconds() === 1;
    }],
    ["PreciseDate setTime with number argument sets time correctly", () => {
        const preciseDate = new PreciseDate();
        const timestamp = Date.now();
        preciseDate.setTime(timestamp);
        return preciseDate.getTime() === BigInt(timestamp) * BigInt(1e6);
    }],
    ["PreciseDate setTime with bigint argument sets time correctly", () => {
        const preciseDate = new PreciseDate();
        const bigintTimestamp = BigInt(Date.now()) * BigInt(1e6);
        preciseDate.setTime(bigintTimestamp);
        return preciseDate.getTime() === bigintTimestamp;
    }],
    ["PreciseDate setTime with invalid value sets time to NaN", () => {
        const preciseDate = new PreciseDate();
        preciseDate.setTime(NaN);
        return isNaN(preciseDate.getTime());
    }],
    ["valueOf returns a number and aligns with the millisecond portion of getTime", () => {
        const preciseDate = new PreciseDate();
        // Compare the millisecond part of getTime() with valueOf()
        return preciseDate.valueOf() === Number(preciseDate.getTime() / BigInt(1e6));
    }],
    ["PreciseDate.now() returns a bigint", () => {
        const now = PreciseDate.now();
        return typeof now === 'bigint';
    }],
    ["PreciseDate constructor with invalid date string sets time to NaN", () => {
        const preciseDate = new PreciseDate("invalid-date");
        return isNaN(preciseDate.getTime());
    }],
    ["PreciseDate constructor with PreciseDate instance having NaN time creates a PreciseDate object with NaN time", () => {
        const invalidPreciseDate = new PreciseDate("invalid-date");
        const preciseDate = new PreciseDate(invalidPreciseDate);
        return isNaN(preciseDate.getTime());
    }],
    ["PreciseDate constructor with Date instance having invalid date creates a PreciseDate object with NaN time", () => {
        const invalidDate = new Date("invalid-date");
        const preciseDate = new PreciseDate(invalidDate);
        return isNaN(preciseDate.getTime());
    }],
    ["PreciseDate constructor with excessive arguments ignores extra arguments", () => {
        const preciseDate = new PreciseDate(2023, 0, 1, 12, 0, 0, 0, 123, 456, "extra", "arguments");
        return preciseDate instanceof PreciseDate && preciseDate.getMicroseconds() === 123 && preciseDate.getNanoseconds() === 456;
    }],
    ["PreciseDate toISOString with NaN time throws RangeError", () => {
        const preciseDate = new PreciseDate("invalid-date");
        try {
            preciseDate.toISOString();
            return false; // If no error is thrown, the test should fail
        } catch (error) {
            return error instanceof RangeError; // Test passes if a RangeError is thrown
        }
    }],
    ["PreciseDate setTime with string argument sets time to NaN", () => {
        const preciseDate = new PreciseDate();
        preciseDate.setTime("invalid-time");
        return isNaN(preciseDate.getTime());
    }],
    ["PreciseDate constructor with invalid numeric arguments sets time to NaN", () => {
        const preciseDate = new PreciseDate(NaN, NaN, NaN);
        return isNaN(preciseDate.getTime());
    }],
    ["PreciseDate constructor with future date creates a valid PreciseDate object", () => {
        const futureDate = new PreciseDate(2500, 0, 1);
        return futureDate instanceof PreciseDate && futureDate.getFullYear() === 2500;
    }],
    ["PreciseDate constructor with past date creates a valid PreciseDate object", () => {
        const pastDate = new PreciseDate(1900, 0, 1);
        return pastDate instanceof PreciseDate && pastDate.getFullYear() === 1900;
    }],
    ["PreciseDate constructor with leap year date creates a valid PreciseDate object", () => {
        const leapYearDate = new PreciseDate(2024, 1, 29);
        return leapYearDate instanceof PreciseDate && leapYearDate.getDate() === 29;
    }],
    ["PreciseDate constructor with non-leap year February 29th rolls over to March 1st", () => {
        const nonLeapYearDate = new PreciseDate(2023, 1, 29); // Month is 0-indexed; 1 is February
        return nonLeapYearDate.getFullYear() === 2023 &&
               nonLeapYearDate.getMonth() === 2 && // Month is 0-indexed; 2 is March
               nonLeapYearDate.getDate() === 1;
    }],
    ["PreciseDate toISOString method aligns with Date's toISOString output, disregarding microseconds and nanoseconds", () => {
        const preciseDate = new PreciseDate();
        const date = new Date(Number(preciseDate.getTime() / BigInt(1e6)));
        return preciseDate.toISOString().startsWith(date.toISOString().slice(0, -1));
    }],
    ["Setting and getting time components (year, month, day, etc.) are consistent between PreciseDate and Date", () => {
        const preciseDate = new PreciseDate();
        const date = new Date(Number(preciseDate.getTime() / BigInt(1e6)));
        preciseDate.setFullYear(2023);
        date.setFullYear(2023);
        return preciseDate.getFullYear() === date.getFullYear() &&
               preciseDate.getMonth() === date.getMonth() &&
               preciseDate.getDate() === date.getDate() &&
               preciseDate.getHours() === date.getHours() &&
               preciseDate.getMinutes() === date.getMinutes() &&
               preciseDate.getSeconds() === date.getSeconds();
    }],
    ["Conversion between PreciseDate and Date retains year, month, and day", () => {
        const preciseDate = new PreciseDate();
        const date = new Date(Number(preciseDate.getTime() / BigInt(1e6)));
        const backToPreciseDate = new PreciseDate(date);
        return preciseDate.getFullYear() === backToPreciseDate.getFullYear() &&
               preciseDate.getMonth() === backToPreciseDate.getMonth() &&
               preciseDate.getDate() === backToPreciseDate.getDate();
    }],
    ["PreciseDate and Date handle invalid dates similarly", () => {
        const preciseDate = new PreciseDate("invalid-date");
        const date = new Date("invalid-date");
        return isNaN(preciseDate.getTime()) && isNaN(date.getTime());
    }],
    ["PreciseDate and Date handle leap years similarly", () => {
        const preciseDate = new PreciseDate(2024, 1, 29); // Feb 29 in a leap year
        const date = new Date(2024, 1, 29);
        return preciseDate.getDate() === date.getDate() && preciseDate.getMonth() === date.getMonth();
    }],
    ["PreciseDate and Date produce the same day of the week for the same timestamp", () => {
        const timestamp = Date.now();
        const preciseDate = new PreciseDate(timestamp);
        const date = new Date(timestamp);
        return preciseDate.getDay() === date.getDay();
    }],
    ["Setting time components (hours, minutes, seconds) affects both PreciseDate and Date similarly", () => {
        const preciseDate = new PreciseDate();
        const date = new Date(Number(preciseDate.getTime() / BigInt(1e6)));
        preciseDate.setHours(12, 30, 15);
        date.setHours(12, 30, 15);
        return preciseDate.getHours() === date.getHours() &&
               preciseDate.getMinutes() === date.getMinutes() &&
               preciseDate.getSeconds() === date.getSeconds();
    }],
    ["PreciseDate and Date handle end-of-month dates similarly", () => {
        const preciseDate = new PreciseDate(2023, 0, 31); // Jan 31
        const date = new Date(2023, 0, 31);
        preciseDate.setDate(32); // Should roll over to Feb 1
        date.setDate(32);
        return preciseDate.getDate() === date.getDate() && preciseDate.getMonth() === date.getMonth();
    }],
    ["PreciseDate and Date handle DST transitions similarly", () => {
        // This test assumes the timezone has DST. Adjust the date accordingly.
        const preciseDate = new PreciseDate(2023, 2, 14, 2, 30); // Example: 2:30 AM on a DST transition day
        const date = new Date(2023, 2, 14, 2, 30);
        return preciseDate.getHours() === date.getHours();
    }],
    ["PreciseDate correctly handles milliseconds, separate from Date", () => {
        const preciseDate = new PreciseDate();
        const date = new Date(Number(preciseDate.getTime() / BigInt(1e6)));
        preciseDate.setMilliseconds(500);
        return preciseDate.getMilliseconds() === 500 && preciseDate.getMilliseconds() !== date.getMilliseconds();
    }],
    ["PreciseDate toLocaleString method aligns with Date's toLocaleString output, disregarding microseconds and nanoseconds", () => {
        const preciseDate = new PreciseDate();
        const date = new Date(Number(preciseDate.getTime() / BigInt(1e6)));
        return preciseDate.toLocaleString() === date.toLocaleString();
    }],
    ["PreciseDate and Date parse valid ISO strings similarly", () => {
        const isoString = "2023-01-01T12:00:00Z";
        const preciseDate = PreciseDate.parse(isoString);
        const date = Date.parse(isoString);
        return preciseDate === date;
    }],
    ["PreciseDate and Date have similar behavior for invalid parse inputs", () => {
        const invalidInput = "not-a-date";
        const preciseDate = PreciseDate.parse(invalidInput);
        const date = Date.parse(invalidInput);
        return isNaN(preciseDate) && isNaN(date);
    }],
    ["PreciseDate and Date have the same UTC date components for the same timestamp", () => {
        const timestamp = Date.now();
        const preciseDate = new PreciseDate(timestamp);
        const date = new Date(timestamp);
        return preciseDate.getUTCFullYear() === date.getUTCFullYear() &&
               preciseDate.getUTCMonth() === date.getUTCMonth() &&
               preciseDate.getUTCDate() === date.getUTCDate() &&
               preciseDate.getUTCHours() === date.getUTCHours() &&
               preciseDate.getUTCMinutes() === date.getUTCMinutes() &&
               preciseDate.getUTCSeconds() === date.getUTCSeconds();
    }],
    ["PreciseDate and Date handle epoch time (January 1, 1970) similarly", () => {
        const preciseDate = new PreciseDate(0);
        const date = new Date(0);
        return preciseDate.getTime() / BigInt(1e6) === BigInt(date.getTime());
    }],
    ["PreciseDate and Date handle dates before the epoch similarly", () => {
        const preciseDate = new PreciseDate(1969, 11, 31); // Just before the epoch
        const date = new Date(1969, 11, 31);
        return preciseDate.getFullYear() === date.getFullYear() &&
               preciseDate.getMonth() === date.getMonth() &&
               preciseDate.getDate() === date.getDate();
    }],
    ["PreciseDate and Date have similar toJSON output for the same date, disregarding microseconds and nanoseconds", () => {
        const preciseDate = new PreciseDate();
        const date = new Date(Number(preciseDate.getTime() / BigInt(1e6)));
        return preciseDate.toJSON().startsWith(date.toJSON().slice(0, -1));
    }],
    ["PreciseDate and Date return the same week day for the same date", () => {
        const preciseDate = new PreciseDate(2023, 0, 1); // A specific date
        const date = new Date(2023, 0, 1);
        return preciseDate.getDay() === date.getDay();
    }],
    ["PreciseDate correctly handles the addition of microseconds and nanoseconds beyond the limit", () => {
        const preciseDate = new PreciseDate();
        const ms = preciseDate.getMilliseconds();
        preciseDate.setMicroseconds(1000); // Should roll over to add 1 millisecond
        preciseDate.setNanoseconds(1000); // Should roll over to add 1 microsecond
        return preciseDate.getMicroseconds() === 1 && preciseDate.getMilliseconds() === (ms + 1);
    }],
];

function runTests(tests) {
    let passed = 0;
    let failed = [];
    let totalTime = 0;

    for (const [description, testFn] of tests) {

        console.log(`test: ${description}`);
        const startTime = performance.now();
        const result = testFn();
        const endTime = performance.now();
        const testDuration = endTime - startTime;

        totalTime += testDuration;

        if (result) {
            console.log(`OK`);
            passed++;
        } else {
            console.error(` XXXXXXXXXXXXXX Failed.`);
            failed.push(description);
        }
    }

    console.log(`\nTest Results: ${passed} Passed, ${failed.length} Failed, ${tests.length} Total`);
    console.log(`Total Time: ${totalTime.toFixed(2)}ms`);
    console.log(`FAILED TESTS: ${JSON.stringify(failed, null, 1)}`);
}

runTests(tests);

