export class Notification {
    type: NotificationType;  
    title: string;
    message: string;
}

export enum NotificationType {  
    Success,  
    Error,  
    Info,  
    Warning  
} 

export enum NotifyPosition {
    TOPCENTER = "notify-top-center",
    BOTTOMCENTER = "notify-bottom-center",
    TOPFW = "notify-top-full-width",
    BOTTOMFW = "notify-bottom-full-width", 
    TOPLEFT = "notify-top-left",
    TOPRIGHT = "notify-top-right", 
    BOTTOMRIGHT = "notify-bottom-right",
    BOTTOMLEFT = "notify-bottom-left"
  }
