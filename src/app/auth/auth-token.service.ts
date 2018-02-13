import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelper } from 'angular2-jwt';

export interface ITokenPaylod {
  'exp'?: number;
  'iat'?: number;
  'iss'?: string;
  'roles'?: string[];
  'user_id'?: string;
  'locale'?: string;
  'currency': string;
}

@Injectable()
export class AuthTokenService implements OnDestroy {
  /**
   * RxJS Subject that stores the token so that observers can subscribe to the subject to receive
   * the last (or initial) value and all subsequent notifications.
   * WARNING: You have to unsubscribe manually from this stream!!!
   *
   * In most cases it should be sufficient to just call `tokenStream.getValue()` in case you are not
   * interested in changes over time
   */
  tokenStream: BehaviorSubject<string | null>;

  protected tokenName = 'token';

  protected _tokenPayload: null | ITokenPaylod = null;

  protected _jwtHelper = new JwtHelper();

  constructor() {
    this.tokenStream = new BehaviorSubject(
      this.getToken()
    );
    this.tokenStream.subscribe((token) => this.setToken(token));
  }

  protected setToken(token: string | null) {
    // TODO: Move this to a more efficient storage!
    if (token) {
      localStorage.setItem(this.tokenName, token);
      this._tokenPayload = this._jwtHelper.decodeToken(token);
    } else {
      localStorage.removeItem(this.tokenName);
      this._tokenPayload = null;
    }
  }

  protected getToken() {
    // TODO: Move this to a more efficient storage!
    return localStorage.getItem(this.tokenName);
  }

  get payload(): null | ITokenPaylod {
    return this._tokenPayload;
  }

  get expirationDate(): null | Date {
    if (!(this._tokenPayload && this._tokenPayload.exp)) {
      return null;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(this._tokenPayload.exp);
    return expirationDate;
  }

  /**
   * Shows if a token have expired,
   * if it has an expiration date at all!!!
   *
   * @returns {boolean}
   */
  get isExpired(): boolean {
    if (!this.payload) {
      return true;
    }

    const expirationDate = this.expirationDate;
    if (!expirationDate) {
      return false;
    }

    return !(expirationDate.valueOf() > (new Date().valueOf()));
  }

  /**
   * Shows if we have a valid token and it is not expired
   *
   * @returns {boolean}
   */
  get isValid(): boolean {
    return !!(this.payload && !this.isExpired);
  }

  ngOnDestroy() {
    if (this.tokenStream) {
      this.tokenStream.unsubscribe();
      this.tokenStream = undefined;
    }
  }
}
