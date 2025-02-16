import { ImmobileService } from "../src/services/immobileService";
import { ImmobileDAO } from "../src/daos/interfaces/ImmobileDAO";

// Mock delle dipendenze
const mockImmobileDAO : ImmobileDAO = {
    findById: jest.fn(),    
    findInRange: jest.fn(),       
    findInRangePaginate: jest.fn(),       
};

const mockPrenotazioneDAO = {
    findById: jest.fn(), 
    create: jest.fn(),
    findByUtenteImmobile: jest.fn(), 
    updateUser: jest.fn(), 
    findByImmobileAgente: jest.fn(),
    findByDateImmobile: jest.fn(),
    findByUtente: jest.fn(),
    findByAgente: jest.fn(),
    update: jest.fn()
};

const immobileService = new ImmobileService(mockImmobileDAO, mockPrenotazioneDAO);

describe("ImmobileService.calculateBounds", () => {

    test("All Valid", async () => {
        const lat = 10;
        const lon = 10;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");
    });

    test("Lat Min+", async () => {
        const lat = -89.99;
        const lon = 10;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");    
    });

    test("Lat Min", async () => {
        const lat = -90;
        const lon = 10;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");        
    });

    test("Lat Min-", async () => {
        const lat = -90.01;
        const lon = 10;
        const radius = 10;
        expect(() => immobileService.calculateBounds(lat, lon, radius)).toThrow("Invalid Latitude");
    });

    test("Lat Max-", async () => {
        const lat = 89.99;
        const lon = 10;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");    
    });

    test("Lat Max", async () => {
        const lat = 90;
        const lon = 10;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");        
    });

    test("Lat Max+", async () => {
        const lat = 90.01;
        const lon = 10;
        const radius = 10;
        expect(() => immobileService.calculateBounds(lat, lon, radius)).toThrow("Invalid Latitude");
    });

    test("Lon Min+", async () => {
        const lat = 10;
        const lon = -179.99;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");    
    });

    test("Lon Min", async () => {
        const lat = 10;
        const lon = -180;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");        
    });

    test("Lon Min-", async () => {
        const lat = 10;
        const lon = -180.01;
        const radius = 10;
        expect(() => immobileService.calculateBounds(lat, lon, radius)).toThrow("Invalid Longitude");
    });

    test("Lon Max-", async () => {
        const lat = 10;
        const lon = 179.99;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");    
    });

    test("Lon Max", async () => {
        const lat = 10;
        const lon = 180;
        const radius = 10;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");        
    });

    test("Lon Max+", async () => {
        const lat = 10;
        const lon = 180.01;
        const radius = 10;
        expect(() => immobileService.calculateBounds(lat, lon, radius)).toThrow("Invalid Longitude");
    });

    test("Radius Min+", async () => {
        const lat = 10;
        const lon = 10;
        const radius = 0.01;

        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");    
    });
    
    test("Radius Min", async () => {
        const lat = 10;
        const lon = 10;
        const radius = 0;

        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(typeof result.latMax).toBe("number");
        expect(typeof result.lonMin).toBe("number");
        expect(typeof result.lonMax).toBe("number");    
    });

    test("Radius Min-", async () => {
        const lat = 10;
        const lon = 10;
        const radius = -0.01;
        expect(() => immobileService.calculateBounds(lat, lon, radius)).toThrow("Invalid Radius");
    });

    test("Radius Max-", async () => {
        const lat = 10;
        const lon = 10;
        const radius = Number.MAX_SAFE_INTEGER;

        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(result.latMin).not.toBe(-Infinity);
        expect(typeof result.latMax).toBe("number");
        expect(result.latMax).not.toBe(Infinity);
        expect(typeof result.lonMin).toBe("number");
        expect(result.lonMin).not.toBe(-Infinity);
        expect(typeof result.lonMax).toBe("number");    
        expect(result.lonMax).not.toBe(Infinity);
    });
    
    test("Radius Max", async () => {
        const lat = 10;
        const lon = 10;
        const radius = Number.MAX_VALUE;

        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(typeof result.latMin).toBe("number");
        expect(result.latMin).not.toBe(-Infinity);
        expect(typeof result.latMax).toBe("number");
        expect(result.latMax).not.toBe(Infinity);
        expect(typeof result.lonMin).toBe("number");
        expect(result.lonMin).not.toBe(-Infinity);
        expect(typeof result.lonMax).toBe("number");    
        expect(result.lonMax).not.toBe(Infinity);
    });

    test("Radius Max+", async () => {
        const lat = 10;
        const lon = 10;
        const radius = Number.POSITIVE_INFINITY;
        const result = immobileService.calculateBounds(lat, lon, radius);

        expect(result).toHaveProperty("latMin");
        expect(result).toHaveProperty("latMax");
        expect(result).toHaveProperty("lonMin");
        expect(result).toHaveProperty("lonMax");
        expect(result.latMin).toBe(-Infinity);
        expect(result.latMax).toBe(Infinity);
        expect(result.lonMin).toBe(-Infinity);
        expect(result.lonMax).toBe(Infinity);     
    });

});
