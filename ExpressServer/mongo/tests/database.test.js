const db = require('../database.js');
const key = "mongo_test_key";

beforeAll(async () => await db.connect());

beforeAll(async () => await db.deleteUser(key));

afterAll(async () => await db.disconnect());

describe('userInfo Tests', () => {

    it('addUser Test', async () => {
        await db.addUser(key, 10000, {"TSLA": 2, "XOM" : 1}, {"5/31/2023": 45000, "5/30/2023": 43500, "5/29/2023": 35000}, []);
        const user = await db.getUser(key);

        expect(user.email).toBe(key);
    })

    it('getUser Test-1', async () => {
        const user = await db.getUser(key);

        expect(user.buyingPower).toBe(10000);
        expect(user.stocks["TSLA"]).toBe(2);
        expect(user.stocks["XOM"]).toBe(1);
        expect(user.balance["5/31/2023"]).toBe(45000);
        expect(user.balance["5/30/2023"]).toBe(43500);
        expect(user.balance["5/29/2023"]).toBe(35000);
    })

    it('getUser Test-2', async () => {
        const user = await db.getUser("fake_key");

        expect(user).toBe(null);
    })

    it('addStock Test', async () => {
        await db.addStock(key, {"GOOGL": 6});
        const user = await db.getUser(key);

        expect(user.stocks["GOOGL"]).toBe(6);
    })

    it('updateStock Test', async () => {
        await db.updateStock(key, "GOOGL", 9);
        const user = await db.getUser(key);

        expect(user.stocks["GOOGL"]).toBe(9);
    })

    it('deleteStock Test', async () => {
        await db.deleteStock(key, "XOM");
        const user = await db.getUser(key);

        expect(user.stocks["XOM"]).toBe(undefined);
    })

    it('stockQuantity Test-1', async () => {
        const amount = await db.stockQuantity(key, "GOOGL")
    
        expect(amount).toBe(9);
    })

    it('stockQuantity Test-2', async () => {
        const amount = await db.stockQuantity(key, "XOM")
    
        expect(amount).toBe(0);
    })

})