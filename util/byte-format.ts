const kb = 1000;
const mb = kb * 1000;

export function formatBytes(bytes: number): string {
    let remainder = bytes % mb;

    remainder = bytes % mb;

    if (remainder != bytes) {
        return `${(bytes / mb).toFixed(2)} MB`;
    }

    remainder = bytes % kb;

    if (remainder != bytes) {
        return `${(bytes / kb).toFixed(2)} KB`;
    }

    return `${bytes} bytes`;
}