import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { Cart } from '../model/cart';
import { CartService } from '../ws/cart.service';
import { BehaviorSubject } from 'rxjs';
import { AppAuthService } from './app-auth.service';
import { ToastrService } from 'ngx-toastr';
import { IBuyItem } from '../model/ibuy-item';
import { CookieService } from 'ngx-cookie-service';
import Key from '../utils/key';

@Injectable({
	providedIn: 'root'
})
export class CartDataService {
	private _cartItems: IBuyItem[] = [];
	private _cart: Cart;
	private _deliveryCharge: number = 0;

	private notifier = new BehaviorSubject(this._cartItems);
	public selectionStatus = this.notifier.asObservable();

	constructor(private cartService: CartService, private userService: AppAuthService,
		private toasts: ToastrService, private cookieService: CookieService) {
		this.initCart();
	}

	/**
	 * Initialize the car with zero items.
	 */
	public initCart() {
		// initialize main attributes
		this._cart = new Cart();
		this._cartItems = [];
		// assigning initial values
		this._cart.checkedOut = false;
		this._cart.items = this._cartItems;
		this._cart.created_date = new Date();
		this._deliveryCharge = 0;
	}

	public get cart() {
		if (this._cart === undefined) throw Error('Cart is not initialized');
		return this._cart;
	}

	/**
	 * This code is very sensitive. Many problems can be solved here.
	 */
	public set cart(cart: Cart) {
		this._cart = cart;
		//let cartItemList: CartItem[] = [];
		//recreating and adding items since subscribe is defined in the CartItem class.
		for (const item of this._cart.items) {
			let _cItem: CartItem = new CartItem(item.product, item.quantity);
			_cItem._id = item._id;
			this.subscribeToQuantityChanges(_cItem);
			this._cartItems.push(_cItem);
		}
		this._cart.items = this._cartItems;
		this.notifier.next(this.cart.items);
	}

	public set userId(userId: string) {
		if (this._cart === undefined) throw Error('Cart is not initialized');
		this._cart.userId = userId;
	}

	public get deliveryCharge() {
		return this._deliveryCharge;
	}

	public set deliveryCharge(charge: number) {
		this._deliveryCharge = charge;
	}

	/**Update item quantity by product id */
	public updateQuantiryByProductId(productId: string, newQuantity: number) {
		this._cartItems.filter(item => {
			if (item.product._id === productId) {
				item.quantity = newQuantity;
			}
		});
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
				this.cookieService.set(Key.CART_ID, id, undefined, '/');
				this.subscribeToQuantityChanges(cartItem);
			});
		} else {
			this.cartService.updateCart(this.convertToSaveModel(this._cart)).subscribe(data => {
				this.toasts.success('Added Item', 'Success');
				this.subscribeToQuantityChanges(cartItem);
			}, error => {
				this.toasts.error(error, 'Error');
			});
		}
		this.notifier.next(this._cartItems);
	}

	/**
	 * Adding list of items in to the cart. If the item is already existing then it will be updated.
	 * @param cartItems An array of CartItems
	 */
	public addItems(cartItems: CartItem[]) {
		if (this._cart === undefined) throw Error('Cart is not initialized');

		for (let cartItem of cartItems) {
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
		}

		// add item to database
		if (this._cart._id === undefined) {
			this.cartService.addCart(this.convertToSaveModel(this._cart)).subscribe((id: string) => {
				this._cart._id = id;
				this.cookieService.set(Key.CART_ID, id, undefined, '/');
				for (let cartItem of cartItems) {
					this.subscribeToQuantityChanges(cartItem);
				}
			});
		} else {
			this.cartService.updateCart(this.convertToSaveModel(this._cart)).subscribe(data => {
				this.toasts.success('Added Item', 'Success');
				for (let cartItem of cartItems) {
					this.subscribeToQuantityChanges(cartItem);
				}
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
	public removeItem(productId: String) {
		if (this._cart === undefined) throw Error('Cart is not initialized');

		this._cartItems = this._cartItems.filter(item => item.product._id !== productId);
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
	 * Marke the cart as completed.
	 */
	public completeCheckout() {
		// user id will be added only for logged users. Guest users will not have a user ID.
		/*if (this.userService.loggedUser !== undefined) {
			this._cart.userId = this.userService.loggedUser._id;
		}
		this._cart.checkedOut = true;
		this.cartService.updateCart(this.convertToSaveModel(this._cart));
		// reset all data
		this._cart = undefined;
		this._cartItems = [];*/
		this.initCart();

		this.notifier.next(this._cartItems);
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

	/**The method which is being called when the quantity is changed */
	private subscribeToQuantityChanges(cartItem: CartItem) {
		cartItem.subscribe().subscribe(data => {
			this.cartService.updateCartItemQuantity(this.cart._id, cartItem.product._id, data).subscribe(data => { });
		});
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
	product: String;
	quantity: Number;

	constructor(productId: String, quantity: Number) {
		this.product = productId;
		this.quantity = quantity;
	}
}
