export type IEventResponseArr = IEventResponse[];

export interface IEventResponse {
  id: number;
  series_id: number;
  message: string;
  event_name: string;
  location: Location;
  date: string;
  time: string;
  contact_information: string;
  description: string;
  status: string;
  event_theme: string;
  venue: string;
  image_url: string;
  event_reference: string;
  created_by: string;
  tickets: IEventTicketRes[];
  publication_state: string;
  isPublished: boolean;
  series_name: string;
  category: string;
  group_ticket_capacity: number;
  is_notification_enabled: boolean;
}

export interface Location {
  lng: string;
  lat: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface IEventTicketRes {
  ticket_type: string;
  name: string;
  capacity: number;
  stock: string;
  price: number;
  purchase_limit: number;
  ticket_reference: string;
  colour: string;
  ticket_sale_end_date: string;
  ticket_sales_end_time: string;
  ticket_sale_start_date: string;
  ticket_sale_start_time: string;
  ticket_perks: string[];
  ticket_id?: any;
  id?: any;
  category: string;
  group_ticket_capacity: number;
}
