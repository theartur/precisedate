
# PreciseDate

**PreciseDate** is an advanced extension of the JavaScript `Date` class, offering high-precision timekeeping capabilities. By utilizing `BigInt`, it precisely captures time in nanoseconds since the Unix Epoch, surpassing the limitations of standard number types. This makes it perfect for applications where time precision is critical.

## Key Features

- **High precision**: Utilizes high-resolution real time `BigInt` for nanosecond accuracy, ensuring precise time measurements.
- **Browser and Node.JS**: From backend servers to browser-based applications, PreciseDate is universally applicable.
- **Compatible with JS `Date` class**: Allow seamless integration into existing projects.
- **No extra dependencies**: Fully standalone, requiring no additional libraries for functionality.

## Installation

```bash
npm install precisedate
```

## Usage

### Constructor Signatures

- **new PreciseDate()**: Initializes with current time with nanosecond precision.
- **new PreciseDate("2023-11-05T00:01:02.345678901Z")**: Parses an ISO string with extended precision.
- **new PreciseDate(new Date())**: Converts a standard Date object to PreciseDate.
- **new PreciseDate(1699142462345)**: Initializes with a `number` Unix timestamp in milliseconds.
- **new PreciseDate(1699142462345678901n)**: Initializes with a `bigint` Unix timestamp in nanoseconds.

### Examples

**Basic Usage:**
```javascript
preciseNow = new PreciseDate();
console.log(preciseNow.getTime()); // (bigint) 1699142462345678901n
console.log(preciseNow.toISOString()); // (string) "2023-11-05T00:01:02.345678901Z"
```

**Parsing ISO String:**
```javascript
isoDate = new PreciseDate("2023-11-05T00:01:02.345678901Z");
console.log(isoDate.getMilliseconds()); // (number) 345
console.log(isoDate.getMicroseconds()); // (number) 678
console.log(isoDate.getNanoseconds()); // (number) 901
```

**Using `number` Unix Timestamp in Milliseconds:**
```javascript
dateFromMillis = new PreciseDate(1699142462345);
console.log(dateFromMillis.toISOString());
// "2023-11-05T00:01:02.345000000Z"
```

**Using `Date` object:**
```javascript
regularDate = new Date(1699142462345);
preciseFromDate = new PreciseDate(date);
console.log(preciseFromDate.toISOString());
// "2023-11-05T00:01:02.345000000Z"
```

```javascript
preciseDate = new PreciseDate("2023-11-05T00:01:02.345678901Z");
regularDate = new Date(preciseDate);
console.log(regularDate.toISOString());
// "2023-11-05T00:01:02.345Z"
```

**Using Unix Timestamp in Nanoseconds (BigInt):**
```javascript
dateFromNanos = new PreciseDate(BigInt("1699142462345678901"));
dateFromNanos = new PreciseDate(1699142462345678901n);
console.log(dateFromNanos.toISOString());
// "2023-11-05T00:01:02.345678901Z"
```

**Using Unix Timestamp in Milliseconds (number):**
```javascript
preciseDate = new PreciseDate(1699142462345);
console.log(preciseDate.toISOString());
// "2023-11-05T00:01:02.345000000Z"
```

## API Reference

- All standard `Date` methods.
- `getMicroseconds()`: Returns `number` of microseconds.
- `setMicroseconds(number)`: Sets `number` of microseconds.
- `getNanoseconds()`: Returns `number` of nanoseconds.
- `setNanoseconds(number)`: Sets `number` of nanoseconds.
- `toISOString()`: Returns `string` of the ISO 8601 representation. (`YYYY-MM-DDTHH:mm:ss.sssssssssZ`)
- `getTime()`: Returns `BigInt` with the time value in nanoseconds since the Unix Epoch.
- `valueOf()`: Returns the standard Unix milliseconds timestamp (`number`) without nanosecond precision, for compatibility purposes.

## Contributing

Contributions are warmly welcomed. Please feel free to fork the repository, make changes, and submit a pull request.

## License

The project is open-source and free for any use. It is licensed under the MIT License.
