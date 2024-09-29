export interface EyeMovementResponse {
    status: string;
    image: string; // Base64 image string or binary data
    gaze: {
        screen_x: number;
        screen_y: number;
    };
}
