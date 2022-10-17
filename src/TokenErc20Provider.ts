import config from "./config.json";
import {uuidv4} from "./Utils";
import {TokenInfo} from "./TokenList";

let DEBUG = true;
if (config.DEBUG === false) {
    DEBUG = false;
}


class TokenERC20Provider {
    private listeners: Set<any>;
    private lastError: string | null;
    private lastAction: string | null;
    private instances: any;
    private callbackCount: number;
    private readonly id: string;
    private holder: string;
    private token: TokenInfo | null;

    private history: any;
    private updateNeeded: boolean;

    constructor() {
        this.id = uuidv4();
        this.listeners = new Set();
        this.instances = null;
        this.lastError = null;
        this.updateNeeded = false;
        this.lastAction = null;
    }

    public getHistory() : any {
        return this.history;
    }

    public getToken() : TokenInfo | null {
        return this.token;
    }

    public setHolderAndToken(address: string, token: TokenInfo) {
        this.holder = address;
        this.token = token;
        this.updateNeeded = true;
        this.updateDataLoop();
    }

    registerListener(eventHandler:any) {
        if (DEBUG) {
            console.log(`Registering component ${this.id}`);
        }
        this.listeners.add(eventHandler);
    }

    unregisterListener(eventHandler:any) {
        if (DEBUG) {
            console.log(`Unregistering component ${this.id}`)
        }
        this.listeners.delete(eventHandler);
    }

    getLastError() {
        return this.lastError;
    }

    getLastAction() {
        return this.lastAction;
    }
    /*
    getPlotData() {
        try {
            if (this.events === null) {
                return {};
            }
            let plotData = plotFromErigonLogEvents(this.events, this.sizes);
            return plotData;
        } catch (ex) {
            console.log(ex);
        }
        return {};
    }*/

    getProviderProperties() {
        return {
            numberOfListeners: this.listeners.size,
            callbackCount: this.callbackCount
        };
    }

    async fetchData() {

        try {
            const response = await fetch(`${config.BACKEND_URL}history/30000000/34330698/50000/${this.holder}/${this.token.address}`);
            const history = await response.json();
            this.history = history;
        }
        catch (ex) {
            console.log("Failed to fetch data. Set lastError");
            this.lastError = ex.message;
            console.log(ex);
        }

    }

    async updateDataLoop() {
        console.log("Waiting for listeners");
        while (true) {
            this.lastAction = "Waiting for listeners";
            this.lastError = null;
            this.history = null;
            while (this.listeners.size === 0) {
                this.instances = null;
                await new Promise(r => setTimeout(r, 500));
            }

            try {
                if (DEBUG) {
                    console.log("Fetch gateway information...");
                }
                this.lastAction = "Fetching data ...";
                this.lastError = null;
                for (let callback of Array.from(this.listeners.values())) {
                    callback();
                }
                this.updateNeeded = false;
                await this.fetchData();
                this.lastAction = "Data fetched";
            } catch (ex) {
                this.instances = null;
                console.log(ex);
                this.lastError = ex.message;
            } finally {
                await new Promise(r => setTimeout(r, 500));
                await new Promise(r => setTimeout(r, 500));
                await new Promise(r => setTimeout(r, 500));

                for (let callback of Array.from(this.listeners.values())) {
                    this.callbackCount += 1;
                    callback();
                }
                //wait for fetch flag

                while (this.updateNeeded === false) {
                    await new Promise(r => setTimeout(r, 500));
                }

                //await new Promise(r => setTimeout(r, 300000));
            }
        }
    }
}

let tokenERC20Provider = new TokenERC20Provider();
tokenERC20Provider.updateDataLoop().then(() => {})

export default tokenERC20Provider;
