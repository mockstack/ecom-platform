import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PackService {
	private pack: string = environment.apiUrl + "pack/"
	private myPack: string = this.pack + "mypack/";
	private defaultPack: string = this.pack + "default/";

	constructor(private httpClient: HttpClient) { }

	/**Get all default packs */
	public getDefaultPacks(): Observable<object> {
		return this.httpClient.get(this.defaultPack);
	}

	/**Get private packs by user id */
	public getPrivatePacks(userID: string): Observable<object> {
		return this.httpClient.get(this.myPack + userID);
	}

	/**Get private pack by pack id */
	public getPrivatePack(userId: String, packId: String): Observable<object> {
		return this.httpClient.get(this.myPack + userId +'/'+ packId);
	}

	/**Add a default pack */
	public addPrivatePack(body: any, userId: String): Observable<object> {
		return this.httpClient.post(this.myPack + userId, body);
	}

	/**Update a private pack */
	public updatePrivatePack(body: any, userId: String, packId: String): Observable<object> {
		return this.httpClient.put(this.myPack + userId + '/' + packId, body);
	}

	/**Get 4 default pack items for preview purposes */
	public getDefaultPackForPreview(): Observable<object> {
		return this.httpClient.get(this.defaultPack + 'preview');
	}

	/**Delete a private pack */
	public deletePrivatePack(userId:String, packId: String): Observable<any> {
		return this.httpClient.delete(this.myPack + userId + '/' + packId);
	}
}
