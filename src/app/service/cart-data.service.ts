import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { Cart } from '../model/cart';
import { CartService } from '../ws/cart.service';
import { BehaviorSubject } from 'rxjs';
import { AppAuthService } from './app-auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class CartDataService {
	private _cartItems: CartItem[] = [];
	private _cart: Cart;
	private notifier = new BehaviorSubject(this._cartItems);
	public selectionStatus = this.notifier.asObservable();

	constructor(private cartService: CartService, private userService: AppAuthService,
		private toasts: ToastrService) {
		this.initCart();
	}

	/**
	 * Initializa the car with zero items.
	 */
	public initCart() {
		// initialize main attributes
		this._cart = new Cart();
		this._cartItems = [];
		// assigning initial values
		this._cart.checkedOut = false;
		this._cart.items = this._cartItems;
		this._cart.created_date = new Date();
	}


	/**
	 * Adding a new item to the cart. If the item is already existing then it will be updated.
	 * @param cartItem item to be added
	 */
	public addItem(cartItem: CartItem) {
		if (this._cart === undefined) throw Error('Cart is not initialized');

		if (this._cartItems.findIndex(item => (item.productId === cartItem.productId)) === -1) {
			//item is not available then push it
			this._cartItems.push(cartItem);
		} else {
			//item is available then remove it and add it with new values
			this._cartItems = this._cartItems.filter(item => item.productId !== cartItem.productId);
			this._cartItems.push(cartItem);
			// since filter returns a new array we have to assign it again.
			this._cart.items = this._cartItems;
		}

		// add item to database
		if (this._cart._id === undefined) {
			this.cartService.addCart(this._cart).subscribe((id: string) => {
				this._cart._id = id;
			});
		} else {
			this.cartService.updateCart(this._cart).subscribe(data => {
				this.toasts.success('Added Item', 'Success');
			}, error => {
				this.toasts.error(error, 'Error');
			});
		}
		this.notifier.next(this._cartItems);
	}

	/**
	 * Remove an item from the cart.
	 * @param cartItem item to be removed
	 */
	public removeItem(cartItem: CartItem) {
		if (this._cart === undefined) throw Error('Cart is not initialized');

		this._cartItems = this._cartItems.filter(item => item._id !== cartItem._id);

		// update the cart with modified data
		this.cartService.updateCart(this._cart);
	}

	/**
	 * Get the cart
	 */
	public get cart() {
		if (this._cart === undefined) throw Error('Cart is not initialized');

		return this._cart;
	}

	/**
	 * Set the user id for the cart.
	 */
	public set userId(userId: string) {
		if (this._cart === undefined) throw Error('Cart is not initialized');

		this._cart.userId = userId;
	}

	/**
	 * Marke the cart as completed.
	 */
	public completeCheckout() {
		// user id will be added only for logged users. Guest users will not have a user ID.
		if (this.userService.loggedUser._id !== undefined) {
			this._cart.userId = this.userService.loggedUser._id;
		}
		this._cart.checkedOut = true;
		this.cartService.updateCart(this._cart);
		// reset all data
		this._cart = undefined;
		this._cartItems = undefined;
	}
}
