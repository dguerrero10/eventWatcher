export interface Marker {
    _id: string;
    position: { lat: number, lng: number };
    label: { color: string, text: string };
    options: { name: string };
    title: string;
    eventDescription: string;
    timestamp: Date;
}