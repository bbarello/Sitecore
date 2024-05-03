import { Session } from 'next-auth';

export interface IApiService {
    callApi(): Promise<any>;
  }
  
export default class ApiService implements IApiService {
    private _session: Session;

    constructor(session: Session) {
        this._session = session;
    }
    
    public callApi(): Promise<any> {
        try {
            if (this._session) {
                const token = this._session.accessToken as string;
                return this._callApi(token).then((res) => res).catch(() => { return 'error'});
            }
        } catch (error) {
            //console.error(error);
            return new Promise<string>(function (resolve) {
                resolve('error');
            }); 
        }

        return new Promise<string>(function (resolve) {
            resolve('');
        });
    }

    private async _callApi(token: string) {
        //console.log(token);
        return await fetch('https://10.103.20.112:8443/api/users/access/roles', { headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          } 
        });
    }
}
