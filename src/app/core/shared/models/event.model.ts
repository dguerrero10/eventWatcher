export interface Event {
    _id: string;
    uid: string;
    IPAddress: string;
    classification: string;
    eventDescription: string;
    coordinates: { lat: number, lng: number };
    timestamp: Date;
  }
  