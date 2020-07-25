export class AppConfig {
    public statusBar: StatusBar;
    public navigationBar: boolean;
    public permissions: string[];
}

export class StatusBar {
    public enabled: boolean;
    public color?: string;
}