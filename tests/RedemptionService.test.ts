import path from 'path';
import fs from 'fs';
import { RedemptionService } from '../src/service/RedemptionService';

const TEST_MAPPING_FILE = path.join(__dirname, '../data/staff-id-to-team-mapping.csv');
const TEST_REDEMPTION_FILE = path.join(__dirname, '../data/redemptions.json');

beforeEach(() => {
    if (fs.existsSync(TEST_REDEMPTION_FILE)) fs.unlinkSync(TEST_REDEMPTION_FILE);
});

test('Successful redemption', () => {
    const service = new RedemptionService(TEST_MAPPING_FILE);
    const result = service.redeem('STAFF_H123804820G');
    expect(result).toMatch(/successful/i);
});

test('Duplicate redemption prevented', () => {
    const service = new RedemptionService(TEST_MAPPING_FILE);
    service.redeem('STAFF_H123804820G');
    const result = service.redeem('STAFF_H123804820G');
    expect(result).toMatch(/already redeemed/i);
});

test('Invalid staff ID handled', () => {
    const service = new RedemptionService(TEST_MAPPING_FILE);
    const result = service.redeem('INVALID_ID');
    expect(result).toMatch(/invalid/i);
});
