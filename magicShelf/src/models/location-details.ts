export class LocationDetails {
    public istatCode: number;
    public cap: number;
    public district: string;
    public region: string;
    public municipality: string;

    constructor(istatCode: number, cap: number, district: string, region: string, municipality: string) {
        this.istatCode = istatCode;
        this.cap = cap;
        this.district = district;
        this.region = region;
        this.municipality = municipality;
    }
}
