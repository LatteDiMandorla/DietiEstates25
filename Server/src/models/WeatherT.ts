export interface Weather {
    state?: "sereno" | "prevalentemente sereno" | "parzialmente nuvoloso" | "nuvoloso" | "nebbia" | "pioggia debole" | "pioggia" | "neve" | "temporale",
    temperature: number;
}