import { GraphQLRequestClient, GraphQLRequestClientConfig } from "@sitecore-jss/sitecore-jss";
import { DocumentNode } from "graphql";
import { GraphQLClient as Client } from 'graphql-request';

export type GraphQLRequestWithAccessTokenClientConfig = GraphQLRequestClientConfig & {
    accessToken?: string;
};

export class GraphQLRequestWithAccessTokenClient extends GraphQLRequestClient {
    private requestClient: Client;
    private requestHeaders: any;

    constructor(endpoint: string, clientConfig?: GraphQLRequestWithAccessTokenClientConfig)
    {
        super(endpoint, clientConfig);
        this.requestHeaders = {};
        if (clientConfig?.apiKey) {
            this.requestHeaders.sc_apikey = clientConfig.apiKey;
        }
        if (clientConfig?.accessToken) {
            this.requestHeaders.Authorization = `Bearer ${clientConfig.accessToken}`;
        }

        this.requestClient = new Client(endpoint, { headers: this.requestHeaders });
     }

    request<T>(query: string | DocumentNode, variables?: { [key: string]: unknown; } | undefined): Promise<T> {
        return new Promise( (resolve, reject) => {
            //console.log(this.requestClient);
            this.requestClient.request<T>(query, variables)
                .then((data) => {
                    //console.debug('response: %o', data);
                    resolve(data);
                })
                .catch((error) => { 
                    console.error(error);
                    return reject(error) 
                });
        });
    }     
}