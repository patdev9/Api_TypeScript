import { hash, compare } from "bcrypt";

export default class CartException extends Error {

    private static SALT_ROUNDS: number = 10;
    private static MIN_PASS_SIZE: number = 16;

    constructor() {
        super('Le numero de la carte est invalide')
    }

    public static isValidCart(cart_number: string): boolean {
        return cart_number.length == this.MIN_PASS_SIZE;
    }

    public static async hashCart(cart_number: string): Promise < string > {
        return await hash(cart_number, this.SALT_ROUNDS)
    }

    public static async comparecart_number(cart_number: string, hash: string): Promise < boolean > {
        return await compare(cart_number, hash)
    }

}