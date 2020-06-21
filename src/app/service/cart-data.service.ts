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

		if (this._cartItems.findIndex(item => (item.product._id === cartItem.product._id)) === -1) {
			//item is not available then push it
			this._cartItems.push(cartItem);
		} else {
			//item is available then remove it and add it with new values
			this._cartItems = this._cartItems.filter(item => item.product._id !== cartItem.product._id);
			this._cartItems.push(cartItem);
			// since filter returns a new array we have to assign it again.
			this._cart.items = this._cartItems;
		}

		// add item to database
		if (this._cart._id === undefined) {
			this.cartService.addCart(this.convertToSaveModel(this._cart)).subscribe((id: string) => {
				this._cart._id = id;
			});
		} else {
			this.cartService.updateCart(this.convertToSaveModel(this._cart)).subscribe(data => {
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

		this._cartItems = this._cartItems.filter(item => item.product._id !== cartItem.product._id);
		this._cart.items = this._cartItems;
		this.notifier.next(this._cartItems);

		// update the cart with modified data
		this.cartService.updateCart(this.convertToSaveModel(this._cart)).subscribe(data => {
			this.toasts.success('Item removed successfully', 'Success');
		}, error => {
			this.toasts.error(error.message, 'Error');
		});
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
		this.cartService.updateCart(this.convertToSaveModel(this._cart));
		// reset all data
		this._cart = undefined;
		this._cartItems = undefined;
	}

	/**
	 * Save request does not need every items so this method convert it into a suitable data model.
	 * @param cart cat instance
	 */
	private convertToSaveModel(cart: Cart): CartSave {
		let itemList: CartSaveItem[] = [];
		cart.items.forEach(item => {
			itemList.push(new CartSaveItem(item.product._id, item.quantity));
		});

		let out: CartSave = new CartSave(cart._id, cart.userId, itemList, cart.checkedOut, cart.created_date, cart.modified_date);

		return out;
	}
}

/**
 * Cart model for saving in the backend.
 */
export class CartSave {
	_id: String;
	userId: String;
	items: CartSaveItem[];
	checkedOut: Boolean;
	created_date: Date;
	modified_date: Date;
	constructor(id?: String, userId?: String, items?: CartSaveItem[], checkOut?: Boolean, createdDate?: Date,
		modifiedDate?: Date) {
		this._id = id;
		this.userId = userId;
		this.items = items;
		this.checkedOut = checkOut;
		this.created_date = createdDate;
		this.modified_date = modifiedDate;
	}
}

export class CartSaveItem {
	productId: String;
	quantity: Number;

	constructor(productId: String, quantity: Number) {
		this.productId = productId;
		this.quantity = quantity;
	}
}
