export interface IEventForm {
  eventDate: string;
  startTime: string;
  endTime: string;
  eventLocation: IEventLocation;
  eventName: string;
  eventDescription: string;
  eventContact: string;
  eventVisibility: IEventVisibility;
  selectedSeries: ISelectedSeries;
  selectedImage: string;
  backgroundPosition: IBackgroundPosition;
  tickets: any[];
}

export interface IEventLocation {
  address: string;
  lat: string;
  lng: string;
}

export interface IEventVisibility {
  label: string;
}

export interface ISelectedSeries {
  label: string;
  id: string;
}

export interface IBackgroundPosition {
  x: number;
  y: number;
}