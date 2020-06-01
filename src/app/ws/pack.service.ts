import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PackService {
	private pack: string = environment.apiUrl + "pack/"
	private myPack: string = "mypacks/";
	private defaultPack: string = "default/";

	constructor(private httpClient: HttpClient) { }

	/**(Admin Function) Get all packs including private and public */
	public getAllPacks(): Observable<object> {
		return this.httpClient.get(this.pack);
	}

	/**Get all default packs */
	public getAllDefaultPacks(): Observable<object> {
		return this.httpClient.get(this.pack + this.defaultPack);
	}

	/**(Admin Function) Get all private packs without considering the owner */
	public getAllPrivatePacks(): Observable<object> {
		return this.httpClient.get(this.pack + this.myPack);
	}

	/**Get private packs by user id */
	public getPrivatePacksByUserId(userID: string): Observable<object> {
		return this.httpClient.get(this.pack + this.myPack + '/' + userID);
	}

	/**Get default pack by pack id */
	public getDefaultPackByPackId(packId: string): Observable<object> {
		return this.httpClient.get(this.pack + this.defaultPack + '/' + packId);
	}

	/**Add a private pack */
	public addDefaultPack(body: any): Observable<object> {
		return this.httpClient.post(this.pack + this.defaultPack, body);
	}

	/**Add a default pack */
	public addPrivatePack(body: any): Observable<object> {
		return this.httpClient.post(this.pack + this.myPack, body);
	}

	/**Update a private pack */
	public updatePrivatePack(body: any): Observable<object> {
		return this.httpClient.put(this.pack + this.myPack, body);
	}

	/**Update a default pack */
	public updateDefaultPack(body: any): Observable<object> {
		return this.httpClient.put(this.pack + this.defaultPack, body);
	}
}
