export interface SalesRaw {
    Count:number
    Message:string
    SearchCriteria:string
    Results:[
        {
            Make_ID:number
            Make_Name:string
            Mfr_Name:string
        }
    ]
}
