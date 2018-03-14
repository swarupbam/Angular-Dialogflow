import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiAiClient } from 'api-ai-javascript';
import 'rxjs/add/operator/map';
@Injectable()
export class DiaglogflowService {
  private baseUrl = 'https://api.dialogflow.com/v1/query?v=20150910';
  private token = environment.token;
  readonly _client = new ApiAiClient({accessToken: this.token});
  constructor(private http: Http) { }

  getResponseFromAgent(payload) {
    return this._client.textRequest(payload);
  }
}
