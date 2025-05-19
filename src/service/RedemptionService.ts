import fs from 'fs';
import path from 'path';
import { StaffMapping, Redemption } from '../model/types';
import { loadStaffMappings } from '../utils/csvLoader';

const REDEMPTION_FILE = path.join(__dirname, '../../data/redemptions.json');

export class RedemptionService {
    private mappings: StaffMapping[];
    private redemptions: Redemption[];

    constructor(mappingPath: string) {
        this.mappings = loadStaffMappings(mappingPath);
        this.redemptions = this.loadRedemptions();
    }

    private loadRedemptions(): Redemption[] {
        try {
            if (fs.existsSync(REDEMPTION_FILE)) {
                const data = fs.readFileSync(REDEMPTION_FILE, 'utf-8');
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Error loading redemptions:', e);
        }
        return [];
    }

    private saveRedemptions(): void {
        fs.writeFileSync(REDEMPTION_FILE, JSON.stringify(this.redemptions, null, 2));
    }

    public lookupTeamByStaffId(staffId: string): string | null {
        const record = this.mappings.find(m => m.staff_pass_id === staffId);
        return record ? record.team_name : null;
    }

    public hasRedeemed(teamName: string): boolean {
        return this.redemptions.some(r => r.team_name === teamName);
    }

    public redeem(staffId: string): string {
        const team = this.lookupTeamByStaffId(staffId);
        if (!team) return 'Invalid staff pass ID';

        if (this.hasRedeemed(team)) {
            return `Team ${team} has already redeemed their gift.`;
        }

        this.redemptions.push({ team_name: team, redeemed_at: Date.now() });
        this.saveRedemptions();
        return `Redemption successful for team ${team}`;
    }
}
