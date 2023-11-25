class PreciseDate extends Date {

    #microseconds = 0;
    #nanoseconds = 0;

    constructor(...args) {

        if (args.length === 0) {
            const nanosecondsTotal = PreciseDate.now();
            const milliseconds = Number(nanosecondsTotal / BigInt(1e6));
            super(milliseconds);
            this.#microseconds = Number((nanosecondsTotal / BigInt(1e3)) % BigInt(1e3));
            this.#nanoseconds = Number(nanosecondsTotal % BigInt(1e3));

        } else if (args.length === 1 && typeof args[0] === 'string') {
            super(args[0]);

            if (!isNaN(super.getTime())) {
                const isoRegex = /\.(\d{3,9})Z$/;
                const match = isoRegex.exec(args[0]);
                if (match) {
                    const fraction = match[1].padEnd(9, '0'); // Ensure it's 9 digits
                    this.#microseconds = parseInt(fraction.substr(3, 3));
                    this.#nanoseconds = parseInt(fraction.substr(6, 3));
                } else {
                    this.#microseconds = 0;
                    this.#nanoseconds = 0;
                }
            }

        } else if (args.length === 1 && args[0] instanceof PreciseDate) {
            super(args[0]);

            this.#microseconds = args[0].getMicroseconds();
            this.#nanoseconds = args[0].getNanoseconds();

        } else if (args.length === 1 && args[0] instanceof Date) {
            super(args[0]);
            
            this.#microseconds = 0;
            this.#nanoseconds = 0;

        } else if (args.length === 1 && typeof args[0] === 'number') {
            super(args[0]);
            
            this.#microseconds = 0;
            this.#nanoseconds = 0;

        } else if (args.length === 1 && typeof args[0] === 'bigint') {
            const nanosecondsTotal = args[0];
            const milliseconds = Number(nanosecondsTotal / BigInt(1e6));
            super(milliseconds);
            this.#microseconds = Number((nanosecondsTotal / BigInt(1e3)) % BigInt(1e3));
            this.#nanoseconds = Number(nanosecondsTotal % BigInt(1e3));

        } else {
            super(...args.slice(0, 7));

            if (args.length >= 8 && typeof args[7] === 'number') {
                this.setMicroseconds(args[7]);
            }
            if (args.length >= 9 && typeof args[8] === 'number') {
                this.setNanoseconds(args[8]);
            }
        }
    }

    getMicroseconds() {
        return this.#microseconds;
    }

    setMicroseconds(value) {
        if (!isNaN(value)) {
            if (value >= 1e3) {
                let extraMilliseconds = Math.floor(value / 1e3);
                this.setMilliseconds(this.getMilliseconds() + extraMilliseconds);
                value %= 1e3;
            }
            this.#microseconds = value;
        } else {
            super.setTime(NaN);
        }
    }

    getNanoseconds() {
        return this.#nanoseconds;
    }

    setNanoseconds(value) {
        if (!isNaN(value)) {
            if (value >= 1e3) {
                let extraMicroseconds = Math.floor(value / 1e3);
                this.setMicroseconds(this.getMicroseconds() + extraMicroseconds);
                value %= 1e3;
            }
            this.#nanoseconds = value;
        } else {
            super.setTime(NaN);
        }
    }

    setTime(value) {
        if (typeof value === 'bigint') {
            const nanosecondsTotal = value;
            const milliseconds = Number(nanosecondsTotal / BigInt(1e6));
            super.setTime(milliseconds);
            this.#microseconds = Number((nanosecondsTotal / BigInt(1e3)) % BigInt(1e3));
            this.#nanoseconds = Number(nanosecondsTotal % BigInt(1e3));

        } else if (!isNaN(value) && typeof value === 'number') {
            super.setTime(value);
            
            this.#microseconds = 0;
            this.#nanoseconds = 0;

        } else {
            super.setTime(value);
        }
    }

    toISOString() {
        let baseIsoString = super.toISOString();
        let floatingPoint = baseIsoString.split('.')[1];
        let ms = floatingPoint.substr(0, 3);
        return `${baseIsoString.substring(0, baseIsoString.length - floatingPoint.length)}${ms}${this.#microseconds.toString().padStart(3, '0')}${this.#nanoseconds.toString().padStart(3, '0')}Z`;
    }

    getTime() {
        const milliseconds = super.getTime();
        if (isNaN(milliseconds)) return NaN;
        return BigInt(milliseconds) * BigInt(1e6) + BigInt(this.#microseconds) * BigInt(1e3) + BigInt(this.#nanoseconds);
    }

    valueOf() {
        return super.getTime();
    }

    static now() {
        if (PreciseDate.#hasHrtime()) {
            // Node.js environment
            const nanoReference = PreciseDate.#hrtime();
            const nanoTimeOrigin = PreciseDate.#preciseNow();
            return nanoTimeOrigin + (PreciseDate.#hrtime() - nanoReference);

        } else {
            // Browser environment
            return PreciseDate.#preciseNow();
        }
    }

    static #hrtime() {
        return process.hrtime.bigint();
    }

    static #hasHrtime() {
        return Boolean(typeof process !== 'undefined' && process?.hrtime?.bigint);
    }

    static #msToNano(ms) {
        const intPart = parseInt(ms);
        const floatPart = parseFloat((ms - intPart).toFixed(4));
        const nanoIntPart = BigInt(intPart) * BigInt(1e6);
        const nanoFloatPart = BigInt(parseInt(floatPart * 1e6));
        return nanoIntPart + nanoFloatPart;
    }

    static #preciseNow() {
        return PreciseDate.#msToNano(performance.timeOrigin + performance.now());
    }
}

const isNodeJs = typeof module !== 'undefined' && typeof module.exports !== 'undefined';

if (isNodeJs) {
    module.exports = PreciseDate;
}