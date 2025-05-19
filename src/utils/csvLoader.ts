import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { StaffMapping } from '../model/types';

export const loadStaffMappings = (filePath: string): StaffMapping[] => {
    const content = fs.readFileSync(filePath);
    const rawRecords = parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });

    return rawRecords.map((record: any) => {
        const keys = Object.keys(record);
        const staffKey = keys.find(k => k.includes('staff_pass_id'))!;
        return {
            staff_pass_id: record[staffKey].trim(),
            team_name: record['team_name'].trim(),
            created_at: Number(record['created_at'])
        };
    });
};
