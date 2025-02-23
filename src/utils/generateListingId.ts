import crypto from 'crypto';

export function generateListingId(username: string, listingName: string): string {
    const input = `${username}-${listingName}`;
    const hash = crypto.createHash('sha1').update(input).digest('base64url');
    return hash.substring(0, 10); // Short but unique
}
