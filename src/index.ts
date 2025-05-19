import path from 'path';
import { RedemptionService } from './service/RedemptionService';

const MAPPING_FILE = path.join(__dirname, '../data/staff-id-to-team-mapping.csv');
const service = new RedemptionService(MAPPING_FILE);

const inputId = process.argv[2];
if (!inputId) {
    console.error('Please provide a staff pass ID as argument.');
    process.exit(1);
}

const result = service.redeem(inputId);
console.log(result);