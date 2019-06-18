import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})

export class AppConfig {
    
    private static readonly apiPath='https://localhost:44372/';
    public static readonly authentication = AppConfig.apiPath +'account/authenticate';
    public static readonly registrationFormData = AppConfig.apiPath + 'account/registration-data';
    public static readonly registration =AppConfig.apiPath + 'account/register';
    public static readonly movieByid = AppConfig.apiPath + "movies/";
    public static readonly searchMovies = AppConfig.apiPath + 'movies/search/';
    public static readonly moviesTop = AppConfig.apiPath + 'movies/top';
    public static readonly personById = AppConfig.apiPath + 'persons/'; 
    public static readonly rateMovie = AppConfig.apiPath + 'movies/rate'; 
    public static readonly addToWatchlist = AppConfig.apiPath + 'movies/add-to-watchlist';
    public static readonly removeFromWatcchlist = AppConfig.apiPath + 'movies/remove-from-watchlist';
    public static readonly userPage = AppConfig.apiPath + 'account/user-page'; 
    public static readonly restorePasswordRequest = AppConfig.apiPath + 'account/restore-password-request';
    public static readonly restorePassword = AppConfig.apiPath + 'account/restore-password';
    public static readonly user = 'currentUser'; 
    public static readonly unauthorizedUrl = 'login';
    private _config: { [key: string]: string };

    constructor() {
        this._config = { 
            PathAPI: 'https://localhost:44372/'
        };
    }

    get setting():{ [key: string]: string } {
        return this._config;
    }

    get(key: any) {
        return this._config[key];
    }
};
