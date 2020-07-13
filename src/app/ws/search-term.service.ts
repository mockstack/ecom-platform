import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SearchTermService {

	private search: string = environment.apiUrl + "search"

	constructor(private httpClient: HttpClient) { }

	public addSearchTerm(searchTerm: String): Observable<object> {
		const body = {
			search_term: searchTerm
		}
		return this.httpClient.post(this.search, body);
	}
}
