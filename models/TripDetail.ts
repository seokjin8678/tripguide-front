export interface TripDetail {
    id : number,
    title : string
    score : number
    desc : string
    contents : string,
    country : string,
    city : string,
    author : string,
    latLng : {
        lat: number,
        lng: number
    }
}