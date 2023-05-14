import { IROBaseJsonElementCfg } from '../interfaces';

export default class JsonObjectManager
{
    private readonly jsonArrayCfg: Array<IROBaseJsonElementCfg>;

    constructor(jsonArrayCfg: Array<IROBaseJsonElementCfg>) {
        this.jsonArrayCfg = jsonArrayCfg;
    }

    getJsonObjectById(id: number) {
        return this.jsonArrayCfg.find((element) => element.id === id);
    }
}